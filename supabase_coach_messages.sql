-- Tabela para persistir mensagens do Coach IA
-- Colar no SQL Editor do Supabase e clicar em Run

create table coach_messages (
  id         uuid        primary key default gen_random_uuid(),
  role       text        not null check (role in ('user', 'assistant')),
  content    text        not null,
  section    text        not null default 'chat' check (section in ('chat', 'briefing', 'weekly')),
  created_at timestamptz not null default now()
);

-- Índice para queries frequentes (listar por section + created_at)
create index coach_messages_section_idx on coach_messages (section, created_at desc);

-- Row Level Security
alter table coach_messages enable row level security;

create policy "Coach messages — leitura total"
  on coach_messages for select using (true);

create policy "Coach messages — inserção total"
  on coach_messages for insert with check (true);

create policy "Coach messages — eliminação total"
  on coach_messages for delete using (true);
