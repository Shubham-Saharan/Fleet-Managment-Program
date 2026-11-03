-- dbeat: companies, members, and each company's saved fleet data.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Every table is locked so a person only sees their own company's rows.

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  trial_ends_at timestamptz not null default now() + interval '30 days',
  created_at timestamptz not null default now()
);

create table if not exists members (
  company_id uuid not null references companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner','dispatcher','viewer')),
  primary key (company_id, user_id)
);

-- One saved copy of the app's data per company (vehicles, drivers, trips).
-- Split into proper tables later; this keeps the app working as it is today.
create table if not exists fleet_state (
  company_id uuid primary key references companies(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table companies   enable row level security;
alter table members     enable row level security;
alter table fleet_state enable row level security;

create or replace function my_company_ids() returns setof uuid
language sql stable security definer set search_path = public as
$$ select company_id from members where user_id = auth.uid() $$;

create policy "see own company" on companies
  for select using (id in (select my_company_ids()));
create policy "see own membership" on members
  for select using (user_id = auth.uid());
create policy "read own fleet data" on fleet_state
  for select using (company_id in (select my_company_ids()));
create policy "write own fleet data" on fleet_state
  for insert with check (company_id in (select my_company_ids()));
create policy "update own fleet data" on fleet_state
  for update using (company_id in (select my_company_ids()))
  with check (company_id in (select my_company_ids()));

-- Sign-up: creates the company, makes the caller its owner, and an empty data row.
create or replace function create_company(company_name text) returns uuid
language plpgsql security definer set search_path = public as $$
declare cid uuid;
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  insert into companies(name) values (company_name) returning id into cid;
  insert into members(company_id, user_id, role) values (cid, auth.uid(), 'owner');
  insert into fleet_state(company_id) values (cid);
  return cid;
end $$;
revoke all on function create_company(text) from public;
grant execute on function create_company(text) to authenticated;
