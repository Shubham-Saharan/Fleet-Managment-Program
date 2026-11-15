-- dbeat billing: who has paid, and writes locked until they have.
-- Run once in each Supabase project (main and staging): SQL Editor -> New query -> paste -> Run.

alter table companies
  add column if not exists subscription_status text not null default 'none',
  add column if not exists paid_until timestamptz,
  add column if not exists dodo_customer_id text,
  add column if not exists dodo_subscription_id text;

-- Processed webhook ids, so a repeated delivery is ignored. No policies = only the server key can touch it.
create table if not exists billing_events (
  webhook_id text primary key,
  type text,
  received_at timestamptz not null default now()
);
alter table billing_events enable row level security;

create or replace function company_is_active(cid uuid) returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from companies where id = cid and paid_until > now()) $$;

-- Reading stays open to members; saving fleet data needs an active subscription.
drop policy if exists "write own fleet data" on fleet_state;
drop policy if exists "update own fleet data" on fleet_state;
create policy "write own fleet data" on fleet_state
  for insert with check (company_id in (select my_company_ids()) and company_is_active(company_id));
create policy "update own fleet data" on fleet_state
  for update using (company_id in (select my_company_ids()) and company_is_active(company_id))
  with check (company_id in (select my_company_ids()) and company_is_active(company_id));

-- Free access for your own company while testing (put the real company name in):
-- update companies set subscription_status = 'active', paid_until = now() + interval '10 years' where name = 'YOUR COMPANY NAME';
