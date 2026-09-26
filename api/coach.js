import Anthropic from '@anthropic-ai/sdk'

const COACH_SYSTEM_PROMPT = `És o Coach interno do Client Acquisition System da Remindr AI.

MODELO DE NEGÓCIO:
- AI Growth Audit (€0-500, entrada): 7 dias a mapear oportunidades de IA — esta é a Frontend Offer. Não se vende o sistema logo. Vende-se o Audit.
- AI Growth System (€2.500-10.000, implementação): construção do sistema após o Audit validar oportunidade.
- AI Systems Management (€500-2.500/mês, recorrente): gestão, optimização e expansão contínua.
- Expansão: upsell de novos módulos e sistemas ao mesmo cliente.

CLIENT ACQUISITION SYSTEM — 7 etapas:
1. TARGET: identificar empresas ICP (10-50 colaboradores, receita existente, em crescimento, operação complexa com trabalho manual, decisor identificável)
2. TRIGGER: sinais de pressão operacional (a contratar, a expandir, novo produto/serviço, crescimento comercial, múltiplas ferramentas, volume crescente)
3. OUTREACH: mensagem curta baseada no trigger. Nunca apresentar o serviço — só perguntar "faz sentido conversar 15 minutos?"
4. AI GROWTH AUDIT: vender a próxima etapa (o Audit), não o serviço. "Em 7 dias identificamos as oportunidades com maior impacto."
5. DISCOVERY: perguntas situação → problema → implicação → dream outcome. Descobrir o que realmente querem.
6. PROPOSTA: formato problema → impacto → solução → resultado esperado → investimento. Nunca lista de features.
7. CLOSE: micro-confirmações de fit. "Se a solução fizer sentido e o investimento estiver dentro do razoável, existe alguma razão para não avançarem?"

FUNIL DE CONVERSÃO (matemática a descobrir e optimizar):
100 prospects → 20 respostas → 8 reuniões → 5 Audits → 3 propostas → 1-2 clientes

5 MOTORES:
1. ICP Engine — encontrar as empresas certas com o trigger certo
2. Outreach Engine — iniciar conversas relevantes (LinkedIn + email, trigger-based)
3. Audit Engine — converter interesse em oportunidade qualificada
4. Sales Engine — converter oportunidade em cliente
5. Referral Engine — transformar clientes em novas oportunidades (prioritário após os primeiros clientes)

ICP: 10-50 colaboradores, receita existente, em crescimento, operação complexa, trabalho manual identificável, decisor acessível.
CANAL PRINCIPAL: LinkedIn + Email. Um canal até dominar, depois expandir.
OBJECTIVOS: imediato = primeiros 3 clientes. Médio prazo = 30 × €1.000 MRR = €30.000 MRR.

PRINCÍPIOS (Hormozi): vender sempre a próxima etapa, não o serviço completo. Micro-confirmações eliminam objecções. Proposta = problema → impacto → solução → resultado → investimento.

REGRAS:
- Fala em português de Portugal (não brasileiro)
- Sê directo e prático — acções concretas, não teorias
- Sem frases de motivação vazias
- Quando sugeres mensagens, escreve o texto completo pronto a usar

FORMATO POR TIPO:
- "briefing": Lista priorizada (máx 5 itens) das acções mais urgentes hoje. Cada item: número + acção concreta + nome + porquê urgente. Termina com 1 frase sobre o estado geral do pipeline.
- "chat": Coach interactivo. Scripts completos, mensagens prontas, técnicas de discovery e fecho. Directo e prático.
- "weekly": Análise semanal. Secções fixas: ✅ O que correu bem / ⚠️ O que melhorar / 📊 Números-chave vs funil esperado / 🎯 Foco para a próxima semana. Não suavizes.`

function buildUserPrompt(type, context) {
  if (!context) return `Tipo: ${type}. Contexto não disponível.`

  if (type === 'briefing') {
    const pipe = context.pipeline || {}
    const stagnant = (context.stagnantLeads || [])
    const delivery = (context.deliveryAlerts || [])
    return `Data: ${context.date} (${context.dayOfWeek})

PIPELINE:
- Nova: ${pipe.nova || 0} | A Contactar: ${pipe.contactar || 0} | Reunião: ${pipe.reuniao || 0} | Proposta: ${pipe.proposta || 0} | Cliente: ${pipe.cliente || 0} | Perdida: ${pipe.perdida || 0}

LEADS PARADAS (${stagnant.length}):
${stagnant.length ? stagnant.map(l => `- ${l.nome} (${l.stage}, ${l.daysStuck}d sem acção, WA: ${l.whatsapp || 'sem número'})`).join('\n') : 'Nenhuma'}

CLIENTES — DELIVERY SEM UPDATE (${delivery.length}):
${delivery.length ? delivery.map(d => `- ${d.nome} (fase: ${d.phase}, ${d.daysSinceUpdate}d sem update)`).join('\n') : 'Todos actualizados'}

CLIENTES ACTIVOS: ${context.activeClients}
CHAMADAS HOJE: ${context.outboundWeek?.calls ?? 0}
MRR ACTUAL: €${context.kpis?.mrr || 0} / TARGET: €${context.kpis?.mrrTarget || 10000}

Gera o briefing do dia com as acções mais urgentes.`
  }

  if (type === 'weekly') {
    const pipe = context.pipeline || {}
    const kpis = context.kpis || {}
    return `ANÁLISE DA SEMANA

KPIs:
- Prospects contactados: ${kpis.prospects || 0}
- Fechos: ${kpis.closes || 0}
- MRR actual: €${kpis.mrr || 0} (target: €${kpis.mrrTarget || 10000})
- Clientes activos: ${context.activeClients || 0}

Pipeline:
- Nova: ${pipe.nova || 0} | Contactar: ${pipe.contactar || 0} | Reunião: ${pipe.reuniao || 0} | Proposta: ${pipe.proposta || 0}

Leads paradas: ${(context.stagnantLeads || []).length}
Alertas delivery: ${(context.deliveryAlerts || []).length}
Chamadas esta semana: ${context.outboundWeek?.calls || 0}

Gera a análise semanal completa.`
  }

  return `Tipo: ${type}`
}

function buildSystemWithContext(context) {
  if (!context) return COACH_SYSTEM_PROMPT
  const pipe = context.pipeline || {}
  return COACH_SYSTEM_PROMPT + `

CONTEXTO ACTUAL DO CRM (${context.date}):
Pipeline: Nova ${pipe.nova || 0} | Contactar ${pipe.contactar || 0} | Reunião ${pipe.reuniao || 0} | Proposta ${pipe.proposta || 0} | Clientes ${pipe.cliente || 0}
Leads paradas: ${(context.stagnantLeads || []).map(l => l.nome).join(', ') || 'nenhuma'}
MRR: €${context.kpis?.mrr || 0}`
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { type, messages, context } = req.body
  if (!type || !['briefing', 'chat', 'weekly'].includes(type)) {
    return res.status(400).json({ error: 'type must be briefing, chat or weekly' })
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const maxTokens = type === 'chat' ? 500 : 800

    let systemPrompt, msgs
    if (type === 'chat') {
      systemPrompt = buildSystemWithContext(context)
      msgs = (messages || []).slice(-10)
      if (!msgs.length) msgs = [{ role: 'user', content: 'Olá, preciso de ajuda com vendas.' }]
    } else {
      systemPrompt = COACH_SYSTEM_PROMPT
      msgs = [{ role: 'user', content: buildUserPrompt(type, context) }]
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: msgs,
    })
    res.json({ content: response.content[0].text })
  } catch (err) {
    console.error('Coach error:', err.message)
    res.status(500).json({ error: 'Erro ao contactar o coach.' })
  }
}
