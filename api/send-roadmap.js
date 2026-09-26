import { Resend } from 'resend'
import PDFDocument from 'pdfkit'

/* ── Roadmap content per type ── */
const TEMPLATES = {
  response: {
    title: 'Velocidade de Resposta',
    subtitle: 'O tempo entre a entrada do lead e o primeiro contacto é o seu principal ponto de oportunidade.',
    insight: { stat: '21x', text: 'Empresas que contactam um lead nos primeiros 5 minutos têm 21x mais probabilidade de o qualificar do que se esperarem 30 minutos.', source: 'Lead Response Management Study' },
    problem: 'Quando um potencial cliente mostra interesse, cada minuto que passa sem resposta reduz drasticamente a probabilidade de conversão. Se a sua equipa demora mais de 30 minutos a responder, está a perder oportunidades para concorrentes mais rápidos.',
    actions: [
      { title: 'Notificações em tempo real', desc: 'Configure alertas instantâneos (email, SMS, Slack) para cada novo lead. O responsável deve ser notificado nos primeiros 60 segundos.' },
      { title: 'Templates de resposta rápida', desc: 'Prepare 3-5 templates para os cenários mais comuns que permitam responder em menos de 2 minutos, sem comprometer a personalização.' },
      { title: 'SLA de resposta definido', desc: 'Estabeleça como regra: todo o lead recebe uma resposta em menos de 5 minutos em horário útil. Meça e monitorize.' },
      { title: 'Responsabilidade clara', desc: 'Defina quem é o responsável pelo primeiro contacto em cada momento do dia. Sem dono, não há urgência.' },
      { title: 'Primeiro touchpoint automatizado', desc: 'Configure uma resposta automática personalizada que confirma a receção enquanto a equipa prepara o contacto humano.' },
    ],
    metrics: [
      { label: 'Tempo médio de resposta', current: '> 30 min', target: '< 5 min' },
      { label: 'Taxa de contacto no mesmo dia', current: '~60%', target: '> 95%' },
      { label: 'Conversão lead > conversa', current: 'Baseline', target: '+30-50%' },
    ],
    flow: ['Lead entra', 'Notificação imediata', 'Contacto < 5 min', 'Qualificação rápida'],
  },
  followup: {
    title: 'Sequência de Follow-up',
    subtitle: 'A forma como acompanha os leads depois do primeiro contacto é o seu principal ponto de oportunidade.',
    insight: { stat: '80%', text: '80% das vendas requerem pelo menos 5 follow-ups, mas 44% dos vendedores desistem depois do primeiro contacto.', source: 'Marketing Donut' },
    problem: 'A maioria dos leads não responde ao primeiro contacto. Isto não significa que não têm interesse — significa que estão ocupados ou ainda não estão prontos. Sem uma sequência estruturada de follow-up, está a desistir de leads que poderiam converter.',
    actions: [
      { title: 'Sequência de 4-5 touchpoints', desc: 'Defina uma cadência estruturada com intervalos definidos: Dia 0, Dia 2, Dia 5, Dia 9, Dia 14.' },
      { title: 'Variar canal e mensagem', desc: 'Alterne entre email, telefone e LinkedIn. Cada touchpoint deve trazer um ângulo ou valor diferente.' },
      { title: 'Valor em cada contacto', desc: 'Partilhe um insight, caso de estudo, ou perspetiva relevante. Nunca envie "só para fazer follow-up".' },
      { title: 'Lembretes automáticos', desc: 'Use o CRM para criar tarefas automáticas de follow-up. Nenhum lead deve ser esquecido por falta de lembrete.' },
      { title: 'Critérios de "lead frio"', desc: 'Após a sequência completa sem resposta, mova o lead para nurturing em vez de o eliminar. Pode reativar mais tarde.' },
    ],
    metrics: [
      { label: 'Taxa de resposta após sequência', current: '~10%', target: '25-40%' },
      { label: 'Touchpoints antes da resposta', current: '1', target: '3-4' },
      { label: 'Leads perdidos por falta de follow-up', current: 'Desconhecido', target: '0' },
    ],
    flow: ['Primeiro contacto', 'Follow-up 1 (Dia 2)', 'Follow-up 2 (Dia 5)', 'Follow-up 3 (Dia 9)', 'Breakup (Dia 14)'],
  },
  qualification: {
    title: 'Qualificação de Leads',
    subtitle: 'A consistência com que qualifica leads antes da reunião é o seu principal ponto de oportunidade.',
    insight: { stat: '3x', text: 'Vendedores que qualificam antes da reunião têm uma taxa de fecho 3x superior e reduzem reuniões sem resultado em 60%.', source: 'Gartner' },
    problem: 'Quando leads não qualificados chegam a reuniões, desperdiçam o tempo da equipa comercial. Sem critérios claros, a equipa marca reuniões com qualquer lead que mostre interesse, resultando em reuniões improdutivas e ciclos de venda longos.',
    actions: [
      { title: 'Definir 5-7 critérios de qualificação', desc: 'Budget, autoridade de decisão, necessidade real, timeline, e fit com o seu perfil ideal de cliente.' },
      { title: 'Scorecard simples', desc: 'Crie um formulário de 5 perguntas que qualquer membro da equipa pode usar para avaliar um lead em menos de 10 minutos.' },
      { title: 'Gate antes da reunião', desc: 'Nenhuma reunião é marcada sem o lead passar pelo processo de qualificação. Isto protege o tempo da equipa.' },
      { title: 'Perguntas de discovery', desc: 'Prepare um guião com as perguntas certas para identificar fit rapidamente, sem parecer um interrogatório.' },
      { title: 'Classificação A/B/C', desc: 'Use um sistema de prioridade para alocar o tempo da equipa aos leads com maior potencial de fecho.' },
    ],
    metrics: [
      { label: 'Taxa de fecho (leads qualificados)', current: 'Baseline', target: '> 30%' },
      { label: 'Reuniões sem resultado', current: '~50-60%', target: '< 20%' },
      { label: 'Tempo de qualificação', current: 'Variável', target: '< 10 min' },
    ],
    flow: ['Contacto', 'Discovery', 'Scorecard', 'Qualified / Not Qualified', 'Reunião'],
  },
  leadToMeeting: {
    title: 'Conversão Lead > Reunião',
    subtitle: 'A passagem de leads qualificados para reuniões agendadas é o seu principal ponto de oportunidade.',
    insight: { stat: '150%', text: 'Reduzir o número de passos entre "interesse" e "reunião marcada" pode aumentar a taxa de agendamento em até 150%.', source: 'Chili Piper' },
    problem: 'Mesmo com leads qualificados e interessados, o processo de marcar uma reunião tem demasiada fricção. Vai-e-vem de emails, falta de disponibilidade visível, e propostas no momento errado fazem com que leads quentes arrefeçam.',
    actions: [
      { title: 'Calendário online', desc: 'Use Calendly ou HubSpot Meetings para eliminar o vai-e-vem de agendamento. O lead escolhe o horário diretamente.' },
      { title: 'Timing da proposta', desc: 'Após 2-3 sinais de interesse, faça a proposta de reunião. Não espere demasiado (arrefece) nem force cedo demais (pressiona).' },
      { title: 'Proposta de valor clara', desc: '"15 minutos para analisar o seu processo de conversão" é melhor do que "vamos falar sobre os nossos serviços".' },
      { title: 'Confirmação + reminders automáticos', desc: 'Email de confirmação imediato + reminder 24h antes + reminder 1h antes. Reduz no-shows drasticamente.' },
      { title: 'Reagendamento fácil', desc: 'Inclua opção de reagendar com um clique. Melhor reagendar do que não aparecer.' },
    ],
    metrics: [
      { label: 'Taxa de agendamento', current: 'Baseline', target: '> 40%' },
      { label: 'No-show rate', current: '~25-30%', target: '< 15%' },
      { label: 'Tempo até reunião', current: 'Variável', target: '< 72 horas' },
    ],
    flow: ['Lead qualificado', 'Proposta de reunião', 'Agendamento online', 'Confirmação + Reminder', 'Reunião'],
  },
}

const PRIORITY_LABELS = {
  response: 'Melhorar a velocidade de resposta',
  followup: 'Criar uma sequência estruturada de follow-up',
  qualification: 'Definir critérios de qualificação claros',
  leadToMeeting: 'Medir e melhorar a conversão Lead > Reunião',
  consistency: 'Definir um processo e responsável claro',
}

const PROFILE_SUMMARY = {
  low:  'O seu processo de conversão tem uma base sólida. Existem ajustes pontuais que podem aumentar a eficiência.',
  mid:  'Existem oportunidades claras de melhoria no seu processo de conversão. Pequenas mudanças podem ter um impacto significativo nos resultados.',
  high: 'O seu processo de conversão tem lacunas importantes. A boa notícia: o potencial de melhoria é elevado.',
}

const BLUE = [33, 127, 241]
const DARK = [10, 28, 66]
const GRAY = [102, 102, 102]
const LIGHT_GRAY = [153, 153, 153]
const WHITE = [255, 255, 255]

/* ── PDF Generation ── */
function generatePDF({ nome, empresa, roadmapKey, priorities, total, maxTotal, profile }) {
  return new Promise((resolve, reject) => {
    const t = TEMPLATES[roadmapKey]
    if (!t) return reject(new Error('Invalid roadmapKey'))

    const level = total <= 6 ? 'low' : total <= 13 ? 'mid' : 'high'
    const date = new Date().toLocaleDateString('pt-PT')
    const doc = new PDFDocument({ size: 'A4', margins: { top: 50, bottom: 50, left: 50, right: 50 } })
    const chunks = []

    doc.on('data', c => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const W = 495 // usable width (595 - 50 - 50)
    const pageBottom = 791 // 841 - 50

    function checkPageBreak(needed) {
      if (doc.y + needed > pageBottom) {
        doc.addPage()
        return true
      }
      return false
    }

    function sectionLabel(text) {
      doc.fontSize(9).font('Helvetica-Bold').fillColor(LIGHT_GRAY)
      doc.text(text.toUpperCase(), { characterSpacing: 1.2 })
      doc.moveDown(0.6)
    }

    function drawHRule() {
      const y = doc.y
      doc.moveTo(50, y).lineTo(545, y).strokeColor([220, 220, 220]).lineWidth(0.5).stroke()
      doc.moveDown(0.8)
    }

    // ═══════════════════════════════════════
    // COVER HEADER
    // ═══════════════════════════════════════
    doc.rect(0, 0, 595, 130).fill([6, 16, 42])
    doc.fontSize(11).font('Helvetica-Bold').fillColor(BLUE).text('Reminder AI', 50, 35)
    doc.fontSize(9).font('Helvetica').fillColor([144, 200, 255]).text('Lead Conversion', 50, 50)
    doc.fontSize(22).font('Helvetica-Bold').fillColor(WHITE).text('Roadmap Personalizado de Conversão', 50, 75, { width: W })
    doc.fontSize(11).font('Helvetica').fillColor([144, 200, 255]).text(`${empresa}  ·  ${date}`, 50, 105)

    doc.y = 155

    // ═══════════════════════════════════════
    // 01 — PERFIL DE CONVERSÃO
    // ═══════════════════════════════════════
    sectionLabel('01 — Perfil de Conversão')
    doc.fontSize(10).font('Helvetica').fillColor(GRAY).text(PROFILE_SUMMARY[level], { width: W, lineGap: 3 })
    doc.moveDown(0.8)

    if (profile && profile.length) {
      profile.forEach(([label, value]) => {
        const y = doc.y
        doc.fontSize(9).font('Helvetica').fillColor(LIGHT_GRAY).text(label, 50, y, { width: 200 })
        doc.fontSize(9).font('Helvetica-Bold').fillColor(DARK).text(value || '—', 300, y, { width: 245, align: 'right' })
        doc.y = y + 18
        doc.moveTo(50, doc.y - 4).lineTo(545, doc.y - 4).strokeColor([240, 240, 240]).lineWidth(0.3).stroke()
      })
      doc.moveDown(0.6)
    }

    doc.fontSize(9).font('Helvetica').fillColor(LIGHT_GRAY)
      .text(`Score de oportunidade: `, { continued: true })
    doc.font('Helvetica-Bold').fillColor(BLUE).text(`${total}/${maxTotal}`)
    doc.moveDown(1.2)
    drawHRule()

    // ═══════════════════════════════════════
    // 02 — PRINCIPAL GARGALO
    // ═══════════════════════════════════════
    checkPageBreak(200)
    sectionLabel('02 — Principal Gargalo')
    doc.fontSize(16).font('Helvetica-Bold').fillColor(BLUE).text(t.title, { width: W })
    doc.moveDown(0.4)
    doc.fontSize(10).font('Helvetica').fillColor(GRAY).text(t.problem, { width: W, lineGap: 3 })
    doc.moveDown(0.8)

    // Insight box
    const insightY = doc.y
    doc.rect(50, insightY, W, 70).fillAndStroke([240, 246, 255], [212, 229, 255])
    doc.fontSize(24).font('Helvetica-Bold').fillColor(BLUE).text(t.insight.stat, 65, insightY + 12, { width: 80 })
    doc.fontSize(9).font('Helvetica').fillColor(DARK).text(t.insight.text, 155, insightY + 10, { width: W - 120, lineGap: 2 })
    doc.fontSize(7).font('Helvetica-Oblique').fillColor(LIGHT_GRAY).text(`Fonte: ${t.insight.source}`, 155, insightY + 52)
    doc.y = insightY + 85
    doc.moveDown(0.8)
    drawHRule()

    // ═══════════════════════════════════════
    // 03 — PRIORIDADES
    // ═══════════════════════════════════════
    checkPageBreak(120)
    sectionLabel('03 — As suas Prioridades')
    doc.fontSize(9).font('Helvetica').fillColor(GRAY).text('Com base nas suas respostas, estas são as áreas a melhorar por ordem de impacto.', { width: W, lineGap: 2 })
    doc.moveDown(0.6)

    ;(priorities || []).forEach((key, i) => {
      const y = doc.y
      const isFirst = i === 0
      // Number circle
      doc.rect(50, y - 1, 20, 20).fillAndStroke(
        isFirst ? BLUE : [240, 240, 240],
        isFirst ? BLUE : [220, 220, 220]
      )
      doc.fontSize(9).font('Helvetica-Bold')
        .fillColor(isFirst ? WHITE : GRAY)
        .text(String(i + 1), 50, y + 3, { width: 20, align: 'center' })
      doc.fontSize(10).font(isFirst ? 'Helvetica-Bold' : 'Helvetica')
        .fillColor(isFirst ? DARK : GRAY)
        .text(PRIORITY_LABELS[key] || key, 80, y + 2, { width: W - 30 })
      doc.y = y + 26
    })
    doc.moveDown(0.8)
    drawHRule()

    // ═══════════════════════════════════════
    // 04 — ROADMAP DE CONVERSÃO
    // ═══════════════════════════════════════
    checkPageBreak(280)
    sectionLabel('04 — Roadmap de Conversão')
    doc.fontSize(10).font('Helvetica').fillColor(GRAY).text(t.subtitle, { width: W, lineGap: 3 })
    doc.moveDown(0.8)

    // Process flow - horizontal boxes
    doc.fontSize(8).font('Helvetica-Bold').fillColor(LIGHT_GRAY).text('PROCESSO RECOMENDADO', { characterSpacing: 1 })
    doc.moveDown(0.5)

    const flowY = doc.y
    const boxH = 28
    const stepW = Math.min(W / t.flow.length - 4, 110)
    t.flow.forEach((step, i) => {
      const x = 50 + i * (stepW + 4)
      const isEnd = i === 0 || i === t.flow.length - 1
      doc.rect(x, flowY, stepW, boxH).fillAndStroke(
        isEnd ? BLUE : [245, 245, 245],
        isEnd ? BLUE : [220, 220, 220]
      )
      doc.fontSize(7).font('Helvetica-Bold')
        .fillColor(isEnd ? WHITE : DARK)
        .text(step, x + 3, flowY + 9, { width: stepW - 6, align: 'center' })
      // Arrow
      if (i < t.flow.length - 1) {
        const ax = x + stepW + 1
        doc.moveTo(ax, flowY + boxH / 2).lineTo(ax + 3, flowY + boxH / 2)
          .strokeColor(LIGHT_GRAY).lineWidth(0.8).stroke()
      }
    })
    doc.y = flowY + boxH + 20

    // Actions
    doc.fontSize(8).font('Helvetica-Bold').fillColor(LIGHT_GRAY).text('AÇÕES RECOMENDADAS', { characterSpacing: 1 })
    doc.moveDown(0.5)

    t.actions.forEach((action, i) => {
      checkPageBreak(50)
      const y = doc.y
      const isFirst = i === 0
      // Left border accent
      doc.rect(50, y, 3, 36).fill(isFirst ? BLUE : [220, 220, 220])
      doc.fontSize(10).font('Helvetica-Bold').fillColor(DARK).text(`${i + 1}. ${action.title}`, 62, y, { width: W - 15 })
      doc.fontSize(9).font('Helvetica').fillColor(GRAY).text(action.desc, 62, doc.y + 1, { width: W - 15, lineGap: 2 })
      doc.y = Math.max(doc.y, y + 38) + 6
    })
    doc.moveDown(0.6)

    // Metrics table
    checkPageBreak(100)
    doc.fontSize(8).font('Helvetica-Bold').fillColor(LIGHT_GRAY).text('MÉTRICAS-ALVO', { characterSpacing: 1 })
    doc.moveDown(0.4)

    // Table header
    let ty = doc.y
    doc.fontSize(8).font('Helvetica-Bold').fillColor(LIGHT_GRAY)
    doc.text('Métrica', 50, ty, { width: 250 })
    doc.text('Est. Atual', 310, ty, { width: 100, align: 'center' })
    doc.text('Objetivo', 420, ty, { width: 125, align: 'center' })
    doc.y = ty + 16
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor([200, 200, 200]).lineWidth(0.5).stroke()
    doc.moveDown(0.3)

    t.metrics.forEach((m) => {
      ty = doc.y
      doc.fontSize(9).font('Helvetica').fillColor(GRAY).text(m.label, 50, ty, { width: 250 })
      doc.fillColor(LIGHT_GRAY).text(m.current, 310, ty, { width: 100, align: 'center' })
      doc.font('Helvetica-Bold').fillColor(BLUE).text(m.target, 420, ty, { width: 125, align: 'center' })
      doc.y = ty + 18
      doc.moveTo(50, doc.y - 3).lineTo(545, doc.y - 3).strokeColor([245, 245, 245]).lineWidth(0.3).stroke()
    })
    doc.moveDown(1)
    drawHRule()

    // ═══════════════════════════════════════
    // 05 — PRÓXIMO PASSO
    // ═══════════════════════════════════════
    checkPageBreak(120)
    sectionLabel('05 — Próximo Passo')

    const nextY = doc.y
    doc.rect(50, nextY, W, 80).fillAndStroke([240, 246, 255], [212, 229, 255])
    doc.fontSize(12).font('Helvetica-Bold').fillColor(DARK)
      .text('Testar este processo com leads reais durante 30 dias.', 65, nextY + 15, { width: W - 30 })
    doc.fontSize(9).font('Helvetica').fillColor(GRAY)
      .text('O Roadmap mostra o que melhorar. O 30-Day Pilot implementa e testa com a sua equipa e os seus leads reais, sem risco.', 65, nextY + 35, { width: W - 30, lineGap: 2 })
    doc.fontSize(9).font('Helvetica-Bold').fillColor(BLUE)
      .text('Agendar conversa de 15 min → calendly.com/remindr/diagnostico', 65, nextY + 60, { width: W - 30 })
    doc.y = nextY + 95

    // ═══════════════════════════════════════
    // FOOTER
    // ═══════════════════════════════════════
    doc.moveDown(2)
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor([220, 220, 220]).lineWidth(0.5).stroke()
    doc.moveDown(0.5)
    doc.fontSize(8).font('Helvetica').fillColor(LIGHT_GRAY)
      .text('Reminder AI  ·  Lead Conversion  ·  equipa@joinreminder.com  ·  joinreminder.com', { align: 'center', width: W })
    doc.fontSize(7).fillColor([200, 200, 200])
      .text(`Gerado automaticamente em ${date} para ${empresa}. Este documento é confidencial.`, { align: 'center', width: W })

    doc.end()
  })
}

/* ── Email HTML ── */
function buildEmailHtml(nome, empresa) {
  const firstName = (nome || 'Participante').split(' ')[0]
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

<!-- Body -->
<tr><td style="padding:32px 40px;">
  <p style="margin:0 0 20px;font-size:15px;color:#333;line-height:1.6;">
    Olá ${firstName},
  </p>
  <p style="margin:0 0 20px;font-size:15px;color:#333;line-height:1.6;">
    Obrigado por completar o diagnóstico de conversão. Analisámos as suas respostas e preparámos o seu <strong>Roadmap Personalizado de Conversão</strong>.
  </p>
  <p style="margin:0 0 24px;font-size:15px;color:#333;line-height:1.6;">
    Encontra em anexo o seu Roadmap completo em PDF, que inclui:
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
    <tr><td style="padding:8px 0;font-size:14px;color:#333;border-bottom:1px solid #f0f0f0;">
      <strong style="color:#217FF1;">01</strong> &nbsp; Perfil de Conversão — visão geral do seu processo atual
    </td></tr>
    <tr><td style="padding:8px 0;font-size:14px;color:#333;border-bottom:1px solid #f0f0f0;">
      <strong style="color:#217FF1;">02</strong> &nbsp; Principal Gargalo — a área com maior oportunidade de melhoria
    </td></tr>
    <tr><td style="padding:8px 0;font-size:14px;color:#333;border-bottom:1px solid #f0f0f0;">
      <strong style="color:#217FF1;">03</strong> &nbsp; Prioridades — o que corrigir primeiro
    </td></tr>
    <tr><td style="padding:8px 0;font-size:14px;color:#333;border-bottom:1px solid #f0f0f0;">
      <strong style="color:#217FF1;">04</strong> &nbsp; Roadmap de Conversão — processo recomendado + ações concretas + métricas-alvo
    </td></tr>
    <tr><td style="padding:8px 0;font-size:14px;color:#333;">
      <strong style="color:#217FF1;">05</strong> &nbsp; Próximo Passo — recomendação clara sobre o que testar a seguir
    </td></tr>
  </table>

  <div style="background:#f0f6ff;border-radius:12px;padding:20px 24px;border:1px solid #d4e5ff;margin-bottom:24px;">
    <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#999;letter-spacing:0.05em;">ANEXO</p>
    <p style="margin:0;font-size:14px;color:#0a1c42;font-weight:700;">
      📎 Roadmap-Conversao-${empresa.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-')}.pdf
    </p>
    <p style="margin:6px 0 0;font-size:13px;color:#666;">
      Abra o ficheiro em anexo para ver o roadmap completo com todas as recomendações.
    </p>
  </div>
</td></tr>

<!-- CTA -->
<tr><td style="padding:0 40px 32px;">
  <div style="background:#f9f9f9;border-radius:12px;padding:24px;text-align:center;">
    <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#0a1c42;">Quer implementar este Roadmap?</p>
    <p style="margin:0 0 20px;font-size:14px;color:#666;line-height:1.6;">Testamos o processo com os seus leads reais durante 30 dias, sem risco.</p>
    <a href="https://calendly.com/remindr/diagnostico" style="display:inline-block;background:#217FF1;color:#fff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;">
      AGENDAR CONVERSA DE 15 MIN →
    </a>
    <p style="margin:12px 0 0;font-size:12px;color:#999;">Sem compromisso</p>
  </div>
</td></tr>

<!-- Footer -->
<tr><td style="padding:24px 40px;border-top:1px solid #eee;">
  <p style="margin:0;font-size:12px;color:#999;text-align:center;">
    Reminder AI · Lead Conversion<br>
    equipa@joinreminder.com · joinreminder.com
  </p>
</td></tr>

</table>
</td></tr></table>
</body></html>`
}

/* ── Handler ── */
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

  const { nome, email, empresa, roadmapKey, priorities, total, maxTotal, profile } = req.body
  if (!email || !roadmapKey) return res.status(400).json({ error: 'email and roadmapKey required' })

  try {
    // Generate PDF
    const pdfBuffer = await generatePDF({
      nome: nome || 'Participante',
      empresa: empresa || 'A sua empresa',
      roadmapKey,
      priorities: priorities || [],
      total: total || 0,
      maxTotal: maxTotal || 20,
      profile: profile || [],
    })

    const filename = `Roadmap-Conversao-${(empresa || 'Empresa').replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-')}.pdf`

    // Send email with PDF attached
    const resend = new Resend(apiKey)
    const html = buildEmailHtml(nome || 'Participante', empresa || 'A sua empresa')

    const { data, error } = await resend.emails.send({
      from: 'Reminder AI <roadmap@joinreminder.com>',
      to: email,
      subject: `O seu Roadmap de Conversão — ${empresa || 'Resultados'}`,
      html,
      attachments: [{
        filename,
        content: pdfBuffer,
      }],
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.json({ ok: true, emailId: data?.id })
  } catch (err) {
    console.error('Email/PDF error:', err)
    return res.status(500).json({ error: 'Failed to generate roadmap or send email' })
  }
}
