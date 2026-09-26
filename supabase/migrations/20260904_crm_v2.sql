-- CRM v2 migration: Delivery + Outbound + KPI improvements
-- Run this in Supabase SQL editor

-- ── deliveries ──────────────────────────────────────────────────────────────
create table if not exists deliveries (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid references leads(id) on delete cascade,
  phase         text not null default 'onboarding'
                  check (phase in ('onboarding','qw_build','qw_live','sistema_build','sistema_live','manutencao')),
  tasks         jsonb not null default '[]',
  milestone_qw      date,
  milestone_sistema date,
  milestone_review  date,
  notes         text not null default '',
  updated_at    timestamptz not null default now()
);

create unique index if not exists deliveries_lead_id_idx on deliveries(lead_id);

-- auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists deliveries_updated_at on deliveries;
create trigger deliveries_updated_at
  before update on deliveries
  for each row execute procedure set_updated_at();

-- ── outbound_prospects ──────────────────────────────────────────────────────
create table if not exists outbound_prospects (
  id                uuid primary key default gen_random_uuid(),
  nome              text not null default '',
  empresa           text not null default '',
  sector            text not null default '',
  whatsapp          text not null default '',
  email             text not null default '',
  fonte             text not null default 'outro'
                      check (fonte in ('linkedin','referencia','evento','outro')),
  status            text not null default 'por_contactar'
                      check (status in ('por_contactar','contactado','interessado','nao_adequado')),
  notes             text not null default '',
  last_contacted_at timestamptz,
  created_at        timestamptz not null default now()
);

-- ── call_logs ────────────────────────────────────────────────────────────────
create table if not exists call_logs (
  id           uuid primary key default gen_random_uuid(),
  prospect_id  uuid references outbound_prospects(id) on delete cascade,
  called_at    timestamptz not null default now(),
  result       text not null default 'sem_resposta'
                 check (result in ('sem_resposta','interessado','nao_interessado','voltar_mais_tarde','marcou_reuniao')),
  next_step    text not null default '',
  notes        text not null default ''
);

-- ── weekly_kpis — add new columns ───────────────────────────────────────────
alter table weekly_kpis
  add column if not exists nps              int,
  add column if not exists active_clients   int,
  add column if not exists churn_count      int,
  add column if not exists pipeline_value   numeric,
  add column if not exists forecast_month   numeric,
  add column if not exists mrr_accumulated  numeric;

-- RLS (enable but allow all for now — add policies per your auth setup)
alter table deliveries          enable row level security;
alter table outbound_prospects  enable row level security;
alter table call_logs           enable row level security;

-- Permissive policies for service-role key usage (adjust for prod)
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'service_all_deliveries' and tablename = 'deliveries') then
    execute 'create policy "service_all_deliveries" on deliveries for all using (true)';
  end if;
  if not exists (select 1 from pg_policies where policyname = 'service_all_prospects' and tablename = 'outbound_prospects') then
    execute 'create policy "service_all_prospects" on outbound_prospects for all using (true)';
  end if;
  if not exists (select 1 from pg_policies where policyname = 'service_all_calls' and tablename = 'call_logs') then
    execute 'create policy "service_all_calls" on call_logs for all using (true)';
  end if;
end $$;
