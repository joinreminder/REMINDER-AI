import { Resend } from 'resend'

const TEMPLATES = {
  response: {
    title: 'Velocidade de Resposta',
    insight: 'Empresas que contactam um lead nos primeiros 5 minutos têm 21x mais probabilidade de o qualificar.',
    actions: [
      'Configurar notificações em tempo real para cada novo lead',
      'Preparar templates de resposta rápida (< 2 min)',
      'Definir SLA de resposta: < 5 minutos em horário útil',
      'Atribuir responsabilidade clara pelo primeiro contacto',
      'Automatizar o primeiro touchpoint enquanto a equipa prepara a resposta',
    ],
  },
  followup: {
    title: 'Sequência de Follow-up',
    insight: '80% das vendas requerem pelo menos 5 follow-ups, mas 44% dos vendedores desistem depois do primeiro.',
    actions: [
      'Criar uma sequência de 4-5 touchpoints (Dia 0, 2, 5, 9, 14)',
      'Variar canal e mensagem em cada contacto',
      'Adicionar valor real em cada follow-up',
      'Automatizar lembretes no CRM',
      'Definir critérios de "lead frio" para nurturing',
    ],
  },
  qualification: {
    title: 'Qualificação de Leads',
    insight: 'Vendedores que qualificam antes da reunião têm uma taxa de fecho 3x superior.',
    actions: [
      'Definir 5-7 critérios de qualificação claros',
      'Criar um scorecard simples de 5 perguntas',
      'Implementar um gate antes de marcar qualquer reunião',
      'Treinar a equipa nas perguntas de discovery',
      'Classificar leads por prioridade (A/B/C)',
    ],
  },
  leadToMeeting: {
    title: 'Conversão Lead → Reunião',
    insight: 'Reduzir os passos entre "interesse" e "reunião marcada" pode aumentar o agendamento em até 150%.',
    actions: [
      'Implementar calendário online (Calendly/HubSpot Meetings)',
      'Propor reunião após 2-3 sinais de interesse',
      'Simplificar a proposta de valor da reunião',
      'Enviar confirmação + reminders automáticos',
      'Incluir opção de reagendamento fácil',
    ],
  },
}

function buildEmailHtml(nome, empresa, roadmapKey, priorities, total, maxTotal) {
  const t = TEMPLATES[roadmapKey]
  const priorityLabels = {
    response: 'Velocidade de resposta',
    followup: 'Follow-up',
    qualification: 'Qualificação',
    leadToMeeting: 'Conversão Lead → Reunião',
    consistency: 'Consistência do processo',
  }

  const actionsHtml = t.actions
    .map((a, i) => `<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#333;font-size:14px;"><strong style="color:#217FF1;">${i + 1}.</strong> ${a}</td></tr>`)
    .join('')

  const prioritiesHtml = priorities
    .map((key, i) => `<tr><td style="padding:6px 0;color:${i === 0 ? '#0a1c42;font-weight:700' : '#666'};font-size:14px;">${i + 1}. ${priorityLabels[key]}</td></tr>`)
    .join('')

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

<!-- Header -->
<tr><td style="background:#06102a;padding:32px 40px;">
  <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#217FF1;">Reminder AI</p>
  <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#fff;line-height:1.3;">O seu Roadmap de Conversão</h1>
  <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);">${empresa} · ${new Date().toLocaleDateString('pt-PT')}</p>
</td></tr>

<!-- Greeting -->
<tr><td style="padding:32px 40px 0;">
  <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.6;">
    Olá ${nome.split(' ')[0]},
  </p>
  <p style="margin:0 0 24px;font-size:15px;color:#333;line-height:1.6;">
    Obrigado por completar o diagnóstico. Aqui está o resumo do seu Roadmap Personalizado de Conversão.
  </p>
</td></tr>

<!-- Main Bottleneck -->
<tr><td style="padding:0 40px;">
  <div style="background:#f0f6ff;border-radius:12px;padding:24px;border:1px solid #d4e5ff;">
    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;">PRINCIPAL GARGALO</p>
    <h2 style="margin:0 0 10px;font-size:20px;font-weight:700;color:#0a1c42;">${t.title}</h2>
    <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">${t.insight}</p>
  </div>
</td></tr>

<!-- Priorities -->
<tr><td style="padding:24px 40px 0;">
  <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;">AS SUAS PRIORIDADES</p>
  <table width="100%" cellpadding="0" cellspacing="0">${prioritiesHtml}</table>
</td></tr>

<!-- Actions -->
<tr><td style="padding:24px 40px 0;">
  <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;">AÇÕES RECOMENDADAS</p>
  <table width="100%" cellpadding="0" cellspacing="0">${actionsHtml}</table>
</td></tr>

<!-- Score -->
<tr><td style="padding:24px 40px 0;">
  <p style="margin:0;font-size:13px;color:#999;">
    Score de oportunidade: <strong style="color:#217FF1;">${total}/${maxTotal}</strong>
  </p>
</td></tr>

<!-- Next Step -->
<tr><td style="padding:32px 40px;">
  <div style="background:#f9f9f9;border-radius:12px;padding:24px;text-align:center;">
    <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#0a1c42;">Próximo Passo</p>
    <p style="margin:0 0 20px;font-size:14px;color:#666;line-height:1.6;">Quer implementar este Roadmap com leads reais durante 30 dias?</p>
    <a href="https://calendly.com/remindr/diagnostico" style="display:inline-block;background:#217FF1;color:#fff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;">
      CANDIDATAR-ME AO 30-DAY PILOT →
    </a>
    <p style="margin:12px 0 0;font-size:12px;color:#999;">Conversa de 15 min · Sem compromisso</p>
  </div>
</td></tr>

<!-- Footer -->
<tr><td style="padding:24px 40px;border-top:1px solid #eee;">
  <p style="margin:0;font-size:12px;color:#999;text-align:center;">
    Reminder AI · Lead Conversion<br>
    equipa@joinreminder.com
  </p>
</td></tr>

</table>
</td></tr></table>
</body></html>`
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  res.setHeader('Access-Control-Allow-Origin', '*')

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'RESEND_API_KEY not configured' })

  const { nome, email, empresa, roadmapKey, priorities, total, maxTotal } = req.body

  if (!email || !roadmapKey) return res.status(400).json({ error: 'email and roadmapKey required' })

  const resend = new Resend(apiKey)
  const html = buildEmailHtml(
    nome || 'Participante',
    empresa || 'A sua empresa',
    roadmapKey,
    priorities || [],
    total || 0,
    maxTotal || 20,
  )

  try {
    const { data, error } = await resend.emails.send({
      from: 'Reminder AI <roadmap@joinreminder.com>',
      to: email,
      subject: `O seu Roadmap de Conversão — ${empresa || 'Resultados'}`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.json({ ok: true, emailId: data?.id })
  } catch (err) {
    console.error('Email send error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
