import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env.local') })

const app  = express()
const PORT = 3333

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'] }))
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `
Chamas-te Hermes — assistente de IA da Remindr AI. Hermes é o deus grego das mensagens, do comércio e da velocidade. Esse é o teu espírito: rápido, directo, útil.

A Remindr AI é uma consultora portuguesa de automação com inteligência artificial para empresas. Não vendemos software — construímos sistemas à medida que eliminam trabalho repetitivo.

SOBRE A REMINDR AI:
- Identificamos onde a empresa perde tempo e capacidade (leads perdidos, follow-ups esquecidos, processos manuais)
- Construímos sistemas de IA que fazem esse trabalho desaparecer
- Tudo feito por nós — a equipa do cliente não toca em nada técnico
- Em menos de 30 dias o sistema está em produção

PROCESSO:
1. Diagnóstico gratuito (7 dias) — analisamos processos, ferramentas e fluxos
2. Plano de prioridades — o que atacar primeiro e porquê
3. Construção e lançamento — em menos de 30 dias, sistema activo

O QUE AUTOMATIZAMOS:
- Follow-up automático de leads e orçamentos
- CRM automático (sem entrada manual de dados)
- Atendimento ao cliente com IA
- Relatórios automáticos
- Faturação e processos administrativos
- Integrações entre ferramentas

PARA QUEM:
- PMEs portuguesas com 6 a 100 pessoas
- Sectores: Serviços B2B, Construção, Saúde, Imobiliário, E-commerce, Indústria, Jurídico/Contabilidade, Tecnologia
- Empresas que crescem e não querem resolver tudo contratando mais pessoas

PREÇOS E PRÓXIMO PASSO:
- O diagnóstico é gratuito e sem compromisso
- Preços de implementação definidos após diagnóstico, consoante o projecto
- Nunca dar preços específicos — encaminhar sempre para o diagnóstico: /diagnostico

REGRAS DE COMUNICAÇÃO:
- Responde sempre em português de Portugal (não brasileiro)
- Sê directo e conciso — máximo 3–4 frases por resposta
- Não uses palavras como "gargalo", "sinergias", "ecossistema", "paradigma"
- Se a pergunta for sobre preços, diz que os preços são definidos após o diagnóstico gratuito
- Se a pergunta não for sobre a Remindr AI, redireciona gentilmente para o contexto da empresa
- No final de respostas sobre serviços, sugere o diagnóstico gratuito como próximo passo
- Nunca inventes dados, clientes, casos de estudo ou garantias que não foram mencionadas
`

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

CANAL PRINCIPAL: LinkedIn + Email. Foco num canal até dominar, depois expandir.
ROTINA DIÁRIA: 50 empresas adicionadas à lista → 20-30 contactos personalizados → follow-up → respostas → Audit → Discovery → Proposta → Cliente.

ICP:
- 10-50 colaboradores
- Receita existente, em crescimento
- Operação relativamente complexa
- Trabalho manual/repetitivo identificável
- Decisor acessível (fundador, director de operações, COO)
- Sectores: Serviços B2B, Construção/AVAC/Engenharia, Saúde/Clínicas, Imobiliário, Serviços Profissionais, Tecnologia/SaaS, Indústria

OBJECTIVOS ACTUAIS:
- Imediato: fechar os primeiros 3 clientes pagantes via outbound directo
- Médio prazo: 30 clientes × €1.000 MRR médio = €30.000 MRR
- Longo prazo: reduzir dependência de cold outbound → cases → referrals → inbound

PRINCÍPIOS (Hormozi):
- Nunca tentar vender o serviço completo no primeiro contacto. Vender sempre a próxima etapa.
- O outreach serve para marcar o Audit, não para explicar o serviço.
- A proposta resolve um problema específico com resultado esperado, não lista features.
- Micro-confirmações antes de propor eliminam objecções a posteriori.

REGRAS:
- Fala em português de Portugal (não brasileiro)
- Sê directo e prático — acções concretas, não teorias
- Sem frases de motivação vazias
- Quando sugeres mensagens, escreve o texto completo pronto a usar
- Se perguntarem sobre outreach, sempre incluir a variável [trigger] personalizado

FORMATO POR TIPO:
- "briefing": Lista priorizada (máx 5 itens) das acções mais urgentes hoje. Cada item: número + acção concreta + nome + porquê urgente. Termina com 1 frase sobre o estado geral do pipeline.
- "chat": Coach interactivo. Scripts completos, mensagens prontas, técnicas de discovery e fecho. Directo e prático.
- "weekly": Análise semanal. Secções fixas: ✅ O que correu bem / ⚠️ O que melhorar / 📊 Números-chave vs funil esperado / 🎯 Foco para a próxima semana. Não suavizes.`

function buildCoachUserPrompt(type, context) {
  if (!context) return `Tipo: ${type}. Contexto não disponível.`
  if (type === 'briefing') {
    const pipe = context.pipeline || {}
    const stagnant = context.stagnantLeads || []
    const delivery = context.deliveryAlerts || []
    return `Data: ${context.date} (${context.dayOfWeek})

PIPELINE:
- Nova: ${pipe.nova || 0} | Contactar: ${pipe.contactar || 0} | Reunião: ${pipe.reuniao || 0} | Proposta: ${pipe.proposta || 0} | Cliente: ${pipe.cliente || 0} | Perdida: ${pipe.perdida || 0}

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

Pipeline: Nova ${pipe.nova || 0} | Contactar ${pipe.contactar || 0} | Reunião ${pipe.reuniao || 0} | Proposta ${pipe.proposta || 0}
Leads paradas: ${(context.stagnantLeads || []).length}
Alertas delivery: ${(context.deliveryAlerts || []).length}
Chamadas esta semana: ${context.outboundWeek?.calls || 0}

Gera a análise semanal completa.`
  }
  return `Tipo: ${type}`
}

function buildCoachSystem(type, context) {
  if (type !== 'chat' || !context) return COACH_SYSTEM_PROMPT
  const pipe = context.pipeline || {}
  return COACH_SYSTEM_PROMPT + `

CONTEXTO ACTUAL DO CRM (${context.date}):
Pipeline: Nova ${pipe.nova || 0} | Contactar ${pipe.contactar || 0} | Reunião ${pipe.reuniao || 0} | Proposta ${pipe.proposta || 0} | Clientes ${pipe.cliente || 0}
Leads paradas: ${(context.stagnantLeads || []).map(l => l.nome).join(', ') || 'nenhuma'}
MRR: €${context.kpis?.mrr || 0}`
}

app.post('/api/coach', async (req, res) => {
  const { type, messages, context } = req.body
  if (!type || !['briefing', 'chat', 'weekly'].includes(type)) {
    return res.status(400).json({ error: 'type must be briefing, chat or weekly' })
  }
  const maxTokens = type === 'chat' ? 500 : 800
  let msgs
  if (type === 'chat') {
    msgs = (messages || []).slice(-10)
    if (!msgs.length) msgs = [{ role: 'user', content: 'Olá, preciso de ajuda.' }]
  } else {
    msgs = [{ role: 'user', content: buildCoachUserPrompt(type, context) }]
  }
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system: buildCoachSystem(type, context),
      messages: msgs,
    })
    res.json({ content: response.content[0].text })
  } catch (err) {
    console.error('Coach error:', err.message)
    res.status(500).json({ error: 'Erro ao contactar o coach.' })
  }
})

app.post('/api/hubspot-lead', async (req, res) => {
  const { default: hubspotHandler } = await import('./hubspot-lead.js')
  return hubspotHandler(req, res)
})

app.post('/api/send-roadmap', async (req, res) => {
  const { default: sendRoadmapHandler } = await import('./send-roadmap.js')
  return sendRoadmapHandler(req, res)
})

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' })
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10), // últimas 10 mensagens de contexto
    })
    res.json({ content: response.content[0].text })
  } catch (err) {
    console.error('Anthropic error:', err.message)
    res.status(500).json({ error: 'Erro ao contactar o assistente.' })
  }
})

app.listen(PORT, () => console.log(`Hermes API a correr em http://localhost:${PORT}`))
