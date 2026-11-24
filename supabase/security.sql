-- dbeat security hardening. Run once in each Supabase project (main and staging) AFTER schema.sql and billing.sql.
-- SQL Editor -> New query -> paste -> Run.

-- 1. Only owners and dispatchers may change fleet data. Viewers can read only. Active subscription still required.
create or replace function my_writer_company_ids() returns setof uuid
language sql stable security definer set search_path = public as
$$ select company_id from members where user_id = auth.uid() and role in ('owner', 'dispatcher') $$;

drop policy if exists "write own fleet data" on fleet_state;
drop policy if exists "update own fleet data" on fleet_state;
create policy "write own fleet data" on fleet_state
  for insert with check (company_id in (select my_writer_company_ids()) and company_is_active(company_id));
create policy "update own fleet data" on fleet_state
  for update using (company_id in (select my_writer_company_ids()) and company_is_active(company_id))
  with check (company_id in (select my_writer_company_ids()) and company_is_active(company_id));

-- 2. A saved fleet cannot be absurdly large (stops storage abuse). 2 MB is far more than a real fleet.
alter table fleet_state drop constraint if exists fleet_state_size;
alter table fleet_state add constraint fleet_state_size check (pg_column_size(data) < 2000000);

-- 3. One company per account, and a sane name. Stops someone creating thousands of companies.
create or replace function create_company(company_name text) returns uuid
language plpgsql security definer set search_path = public as $$
declare cid uuid; nm text := btrim(company_name);
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  if nm is null or length(nm) < 2 or length(nm) > 80 then raise exception 'company name must be 2 to 80 characters'; end if;
  if exists (select 1 from members where user_id = auth.uid()) then raise exception 'this account already has a company'; end if;
  insert into companies(name) values (nm) returning id into cid;
  insert into members(company_id, user_id, role) values (cid, auth.uid(), 'owner');
  insert into fleet_state(company_id) values (cid);
  return cid;
end $$;
revoke all on function create_company(text) from public;
revoke all on function create_company(text) from anon;
grant execute on function create_company(text) to authenticated;

-- 4. Helper functions are not callable by signed-out visitors.
revoke all on function my_company_ids() from anon;
revoke all on function my_writer_company_ids() from anon;
revoke all on function company_is_active(uuid) from anon;

-- 5. Delete an account's data on request (used for erasure requests). Run by you, as the admin, with the company id.
-- delete from companies where id = 'COMPANY-UUID-HERE';   -- members and fleet_state delete with it (on delete cascade)
