-- Tabela de KPIs semanais para o CRM Remindr
-- Corre este script no SQL Editor do Supabase: https://supabase.com/dashboard/project/fctcpknkshjdwyutnvvg/sql

CREATE TABLE IF NOT EXISTS weekly_kpis (
  id                uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  week_start        date        NOT NULL UNIQUE,   -- Segunda-feira da semana (ex: 2026-09-01)

  -- OUTBOUND
  prospects         int,                           -- Prospects contactados
  replies           int,                           -- Total de replies
  positive_replies  int,                           -- Positive replies (interesse)

  -- SALES
  audits_booked     int,                           -- Audits/calls marcadas
  shows             int,                           -- Shows (compareceram)
  proposals         int,                           -- Propostas enviadas
  closes            int,                           -- Fechados (clientes novos)

  -- ECONOMICS
  avg_deal          numeric(10,2),                 -- Valor médio por deal (€)
  mrr               numeric(10,2),                 -- MRR atual (€)
  cac               numeric(10,2),                 -- Custo de aquisição por cliente (€)
  sales_cycle       int,                           -- Ciclo de vendas (dias)

  -- DELIVERY
  time_to_launch    int,                           -- Tempo até lançamento (dias)
  gross_margin      numeric(5,2),                  -- Margem bruta (%)
  expansion         numeric(10,2),                 -- Receita de expansão/upsell (€)

  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now()
);

-- RLS: acesso aberto (protegido pela password do CRM no frontend)
ALTER TABLE weekly_kpis ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "crm_full_access" ON weekly_kpis;
CREATE POLICY "crm_full_access" ON weekly_kpis
  FOR ALL USING (true) WITH CHECK (true);

-- Auto-update de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON weekly_kpis;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON weekly_kpis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Verificar que foi criada
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'weekly_kpis' ORDER BY ordinal_position;
