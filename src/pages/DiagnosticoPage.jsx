import { useState } from 'react'
import { supabase } from '../lib/supabase'
import RoadmapResult from '../components/RoadmapResult'

/* ── Form Data ── */
const SETORES = [
  'Agência / Marketing',
  'Consultoria',
  'SaaS / Tecnologia',
  'Serviços B2B',
  'Educação / Formação',
  'Imobiliário',
  'Saúde / Clínicas',
  'Financeiro',
  'E-commerce',
  'Outro',
]

const LEADS_MES = [
  { id: '1-20',    label: '1\u201320' },
  { id: '21-50',   label: '21\u201350' },
  { id: '51-100',  label: '51\u2013100' },
  { id: '101-250', label: '101\u2013250' },
  { id: '251-500', label: '251\u2013500' },
  { id: '500+',    label: '500+' },
]

const FONTES_LEADS = [
  { id: 'meta-ads',    label: 'Meta Ads' },
  { id: 'google-ads',  label: 'Google Ads' },
  { id: 'website',     label: 'Website' },
  { id: 'linkedin',    label: 'LinkedIn' },
  { id: 'whatsapp',    label: 'WhatsApp' },
  { id: 'email',       label: 'Email' },
  { id: 'referencias', label: 'Referências' },
  { id: 'eventos',     label: 'Eventos' },
  { id: 'outro',       label: 'Outro' },
]

const VALOR_CLIENTE = [
  { id: '<500',       label: '< \u20AC500' },
  { id: '500-1500',   label: '\u20AC500\u2013\u20AC1.500' },
  { id: '1500-5000',  label: '\u20AC1.500\u2013\u20AC5.000' },
  { id: '5000-15000', label: '\u20AC5.000\u2013\u20AC15.000' },
  { id: '15000+',     label: '\u20AC15.000+' },
]

const TEMPO_RESPOSTA = [
  { id: '<5min',    label: 'Menos de 5 minutos', score: 0 },
  { id: '5-30min',  label: '5\u201330 minutos',  score: 1 },
  { id: '30m-2h',   label: '30 minutos\u20132 horas', score: 2 },
  { id: '2-24h',    label: '2\u201324 horas',    score: 3 },
  { id: '>24h',     label: 'Mais de 24 horas',   score: 4 },
  { id: 'nao-sabe', label: 'Não sabemos',        score: 4 },
]

const QUEM_CONTACTA = [
  { id: 'founder',    label: 'Founder / CEO',                    score: 2 },
  { id: 'comercial',  label: 'Equipa comercial',                 score: 0 },
  { id: 'sdr',        label: 'SDR / BDR',                        score: 0 },
  { id: 'marketing',  label: 'Marketing',                        score: 2 },
  { id: 'cs',         label: 'Customer Success',                 score: 2 },
  { id: 'ninguem',    label: 'Não existe uma pessoa específica', score: 4 },
  { id: 'outro',      label: 'Outro',                            score: 3 },
]

const FOLLOWUP = [
  { id: 'nenhum',       label: 'Não fazemos follow-up',              score: 4 },
  { id: '1-vez',        label: '1 vez',                              score: 3 },
  { id: '2-3',          label: '2\u20133 vezes',                     score: 2 },
  { id: '4+',           label: '4+ vezes',                           score: 1 },
  { id: 'sequencia',    label: 'Temos uma sequência estruturada',    score: 0 },
  { id: 'nao-sabe',     label: 'Não sabemos',                       score: 4 },
]

const QUALIFICACAO = [
  { id: 'estruturado',  label: 'Temos um processo estruturado',                        score: 0 },
  { id: 'parcial',      label: 'Temos algumas perguntas, mas não é consistente',       score: 2 },
  { id: 'cada-vendedor',label: 'Cada vendedor faz de forma diferente',                 score: 3 },
  { id: 'nenhum',       label: 'Não fazemos qualificação',                             score: 4 },
  { id: 'nao-sabe',     label: 'Não sabemos',                                          score: 4 },
]

const TAXA_CONVERSAO = [
  { id: '<5',       label: '< 5%',             score: 4 },
  { id: '5-10',     label: '5\u201310%',       score: 3 },
  { id: '10-20',    label: '10\u201320%',      score: 2 },
  { id: '20-30',    label: '20\u201330%',      score: 1 },
  { id: '30+',      label: '30%+',             score: 0 },
  { id: 'nao-sabe', label: 'Não sabemos',      score: 4 },
]

const SITUACAO = [
  { id: 'poucos-meetings',    label: 'Temos muitos leads, mas poucas reuniões.' },
  { id: 'resposta-lenta',     label: 'Geramos leads, mas demoramos demasiado a responder.' },
  { id: 'sem-followup',       label: 'Perdemos leads por falta de follow-up.' },
  { id: 'tempo-perdido',      label: 'A equipa comercial perde demasiado tempo a contactar e qualificar leads.' },
  { id: 'melhorar-conversao', label: 'Temos um processo, mas queremos aumentar a conversão.' },
  { id: 'nao-sabe',           label: 'Não sabemos exatamente onde estamos a perder oportunidades.' },
]

const INTERESSE_PILOTO = [
  { id: 'sim',    label: 'Sim, quero saber mais' },
  { id: 'talvez', label: 'Talvez' },
  { id: 'nao',    label: 'Neste momento não' },
]

const STEPS = [
  { id: 'empresa',   title: 'Empresa',              desc: 'Contexto básico para personalizar o seu roadmap.' },
  { id: 'leads',     title: 'Leads',                 desc: 'Volume, origem e valor dos seus leads.' },
  { id: 'conversao', title: 'Conversão',             desc: 'O que acontece entre a lead chegar e a reunião ser marcada.' },
  { id: 'intencao',  title: 'Problema & Contacto',   desc: 'Para personalizar e enviar o seu roadmap.' },
]

/* ── Scoring (higher = more opportunity) ── */
const DIM_LABELS = {
  response:      'Velocidade de resposta',
  followup:      'Follow-up',
  qualification: 'Qualificação',
  leadToMeeting: 'Conversão Lead \u2192 Reunião',
  consistency:   'Consistência do processo',
}

const PRIORITY_LABELS = {
  response:      'Melhorar a velocidade de resposta',
  followup:      'Criar uma sequência estruturada de follow-up',
  qualification: 'Definir critérios de qualificação claros',
  leadToMeeting: 'Medir e melhorar a conversão Lead \u2192 Reunião',
  consistency:   'Definir um processo e responsável claro',
}

const ROADMAP_TYPES = {
  response:      { letter: 'A', name: 'RESPONSE',      desc: 'Com base nas suas respostas, existe uma oportunidade clara de melhorar a velocidade com que os novos leads são contactados.' },
  followup:      { letter: 'B', name: 'FOLLOW-UP',      desc: 'Com base nas suas respostas, existe uma oportunidade clara de melhorar a forma como os leads são acompanhados depois do primeiro contacto.' },
  qualification: { letter: 'C', name: 'QUALIFICATION',  desc: 'Com base nas suas respostas, existe uma oportunidade clara de melhorar a consistência com que os leads são qualificados antes da reunião.' },
  leadToMeeting: { letter: 'D', name: 'APPOINTMENT',    desc: 'Com base nas suas respostas, existe uma oportunidade clara de melhorar a passagem de leads qualificados para reuniões agendadas.' },
}

const ROADMAP_FLOWS = {
  response:      ['Lead', 'Contacto imediato', 'Conversa', 'Qualificação'],
  followup:      ['Primeiro contacto', 'Follow-up 1', 'Follow-up 2', 'Follow-up 3', 'Reengagement'],
  qualification: ['Contacto', 'Discovery', 'Critérios', 'Qualified / Not Qualified', 'Meeting'],
  leadToMeeting: ['Qualified Lead', 'Meeting Offer', 'Scheduling', 'Confirmation', 'Meeting'],
}

function calcScore(v) {
  const response      = TEMPO_RESPOSTA.find(t => t.id === v.tempo_resposta)?.score ?? 0
  const followup      = FOLLOWUP.find(f => f.id === v.followup)?.score ?? 0
  const qualification = QUALIFICACAO.find(q => q.id === v.qualificacao)?.score ?? 0
  const leadToMeeting = TAXA_CONVERSAO.find(t => t.id === v.taxa_conversao)?.score ?? 0
  const consistency   = QUEM_CONTACTA.find(q => q.id === v.quem_contacta)?.score ?? 0

  const scores = { response, followup, qualification, leadToMeeting, consistency }
  const total = response + followup + qualification + leadToMeeting + consistency

  // Roadmap type: dimension with highest score (excl consistency)
  const roadmapDims = { response, followup, qualification, leadToMeeting }
  let roadmapKey = 'response'
  let maxScore = -1
  for (const [key, val] of Object.entries(roadmapDims)) {
    if (val > maxScore) { maxScore = val; roadmapKey = key }
  }

  // Priorities: all 5 dims sorted by score descending, take top 4
  const priorities = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([key]) => key)

  return { scores, total, maxTotal: 20, roadmapKey, priorities }
}

/* ── Component ── */
export default function DiagnosticoPage() {
  const [step, setStep]             = useState(0)
  const [values, setValues]         = useState({ fontes: [] })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult]         = useState(null)

  const set = (k, v) => setValues(prev => ({ ...prev, [k]: v }))

  const toggleFonte = id => {
    const current = values.fontes || []
    set('fontes', current.includes(id) ? current.filter(f => f !== id) : [...current, id])
  }

  const canProceed = () => {
    if (step === 0) return values.empresa?.trim() && values.setor
    if (step === 1) return values.leads_mes && values.fontes?.length > 0 && values.valor_cliente
    if (step === 2) return values.tempo_resposta && values.quem_contacta && values.followup && values.qualificacao && values.taxa_conversao
    if (step === 3) return values.situacao && values.interesse_piloto && values.nome?.trim() && values.email?.trim()
    return false
  }

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const scoring = calcScore(values)

    const fontesLabels = (values.fontes || [])
      .map(id => FONTES_LEADS.find(f => f.id === id)?.label)
      .join(', ')

    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_Yfcy8gQeR25U6j45ZU0dzQwHzaEXtcdXm8BzcXo2MPiqNBrezJlEeaFXpiZv0Q1PPQ/exec'

    try {
      fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          nome:            values.nome,
          cargo:           values.cargo || '',
          email:           values.email,
          empresa:         values.empresa,
          website:         values.website || '',
          setor:           values.setor,
          leads_mes:       LEADS_MES.find(l => l.id === values.leads_mes)?.label || '',
          fontes:          fontesLabels,
          valor_cliente:   VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label || '',
          tempo_resposta:  TEMPO_RESPOSTA.find(t => t.id === values.tempo_resposta)?.label || '',
          quem_contacta:   QUEM_CONTACTA.find(q => q.id === values.quem_contacta)?.label || '',
          followup:        FOLLOWUP.find(f => f.id === values.followup)?.label || '',
          qualificacao:    QUALIFICACAO.find(q => q.id === values.qualificacao)?.label || '',
          taxa_conversao:  TAXA_CONVERSAO.find(t => t.id === values.taxa_conversao)?.label || '',
          situacao:        SITUACAO.find(s => s.id === values.situacao)?.label || '',
          interesse_piloto: INTERESSE_PILOTO.find(i => i.id === values.interesse_piloto)?.label || '',
          _roadmap_type:   ROADMAP_TYPES[scoring.roadmapKey].name,
          _score_total:    scoring.total,
          _response:       scoring.scores.response,
          _followup:       scoring.scores.followup,
          _qualification:  scoring.scores.qualification,
          _lead_to_meeting: scoring.scores.leadToMeeting,
          _consistency:    scoring.scores.consistency,
          _subject: `[Roadmap ${ROADMAP_TYPES[scoring.roadmapKey].letter}] ${values.empresa} (${scoring.total}/${scoring.maxTotal})`,
        }),
      })
    } catch (_) {}

    try {
      const notesLines = [
        `Leads/mês: ${LEADS_MES.find(l => l.id === values.leads_mes)?.label}`,
        `Fontes: ${fontesLabels}`,
        `Valor cliente: ${VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label}`,
        `Tempo resposta: ${TEMPO_RESPOSTA.find(t => t.id === values.tempo_resposta)?.label}`,
        `Quem contacta: ${QUEM_CONTACTA.find(q => q.id === values.quem_contacta)?.label}`,
        `Follow-up: ${FOLLOWUP.find(f => f.id === values.followup)?.label}`,
        `Qualificação: ${QUALIFICACAO.find(q => q.id === values.qualificacao)?.label}`,
        `Taxa conversão: ${TAXA_CONVERSAO.find(t => t.id === values.taxa_conversao)?.label}`,
        `Situação: ${SITUACAO.find(s => s.id === values.situacao)?.label}`,
        `Interesse piloto: ${INTERESSE_PILOTO.find(i => i.id === values.interesse_piloto)?.label}`,
        `---`,
        `Roadmap: ${ROADMAP_TYPES[scoring.roadmapKey].name} (${scoring.total}/${scoring.maxTotal})`,
        `Response: ${scoring.scores.response}/4`,
        `Follow-up: ${scoring.scores.followup}/4`,
        `Qualification: ${scoring.scores.qualification}/4`,
        `Lead>Meeting: ${scoring.scores.leadToMeeting}/4`,
        `Consistency: ${scoring.scores.consistency}/4`,
      ].join('\n')

      supabase.from('leads').insert({
        nome:      values.nome,
        empresa:   values.empresa,
        email:     values.email,
        website:   values.website || null,
        setor:     values.setor,
        problema:  SITUACAO.find(s => s.id === values.situacao)?.label,
        fonte:     'Inbound',
        stage:     'nova',
        score:     scoring.total >= 14 ? 'A' : scoring.total >= 8 ? 'B' : 'C',
        notes:     notesLines,
      })
    } catch (_) {}

    // 3. HubSpot — create/update contact + note
    try {
      fetch('/api/hubspot-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: {
            nome:            values.nome,
            cargo:           values.cargo || '',
            email:           values.email,
            empresa:         values.empresa,
            website:         values.website || '',
            setor:           values.setor,
            leads_mes:       LEADS_MES.find(l => l.id === values.leads_mes)?.label || '',
            fontes:          fontesLabels,
            valor_cliente:   VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label || '',
            tempo_resposta:  TEMPO_RESPOSTA.find(t => t.id === values.tempo_resposta)?.label || '',
            quem_contacta:   QUEM_CONTACTA.find(q => q.id === values.quem_contacta)?.label || '',
            followup:        FOLLOWUP.find(f => f.id === values.followup)?.label || '',
            qualificacao:    QUALIFICACAO.find(q => q.id === values.qualificacao)?.label || '',
            taxa_conversao:  TAXA_CONVERSAO.find(t => t.id === values.taxa_conversao)?.label || '',
            situacao:        SITUACAO.find(s => s.id === values.situacao)?.label || '',
            interesse_piloto: INTERESSE_PILOTO.find(i => i.id === values.interesse_piloto)?.label || '',
          },
          scoring: {
            roadmapKey:   scoring.roadmapKey,
            roadmapName:  ROADMAP_TYPES[scoring.roadmapKey].name,
            total:        scoring.total,
            maxTotal:     scoring.maxTotal,
            scores:       scoring.scores,
          },
        }),
      })
    } catch (_) {}

    // 4. Send roadmap email with PDF via Resend
    try {
      fetch('/api/send-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome:       values.nome,
          email:      values.email,
          empresa:    values.empresa,
          roadmapKey: scoring.roadmapKey,
          priorities: scoring.priorities,
          total:      scoring.total,
          maxTotal:   scoring.maxTotal,
          profile: [
            ['Leads/mês', LEADS_MES.find(l => l.id === values.leads_mes)?.label],
            ['Valor médio', VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label],
            ['Resposta', TEMPO_RESPOSTA.find(t => t.id === values.tempo_resposta)?.label],
            ['Follow-up', FOLLOWUP.find(f => f.id === values.followup)?.label],
            ['Qualificação', QUALIFICACAO.find(q => q.id === values.qualificacao)?.label],
            ['Taxa conversão', TAXA_CONVERSAO.find(t => t.id === values.taxa_conversao)?.label],
          ],
        }),
      })
    } catch (_) {}

    setResult(scoring)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ═══════════════════════════════════════════
     RESULTS PAGE
     ═══════════════════════════════════════════ */
  if (result) {
    const profileData = [
      ['Leads/mês', LEADS_MES.find(l => l.id === values.leads_mes)?.label],
      ['Valor médio', VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label],
      ['Resposta', TEMPO_RESPOSTA.find(t => t.id === values.tempo_resposta)?.label],
      ['Follow-up', FOLLOWUP.find(f => f.id === values.followup)?.label],
      ['Qualificação', QUALIFICACAO.find(q => q.id === values.qualificacao)?.label],
      ['Taxa conversão', TAXA_CONVERSAO.find(t => t.id === values.taxa_conversao)?.label],
    ]

    return (
      <RoadmapResult
        scoring={result}
        profile={profileData}
        empresa={values.empresa}
        values={values}
      />
    )
  }

  /* ═══════════════════════════════════════════
     FORM (4 pages, 14 questions)
     ═══════════════════════════════════════════ */
  return (
    <div className="raudit" style={{ paddingTop: 0 }}>
      <div className="raudit__header" style={{
        background: 'linear-gradient(135deg, #06102a 0%, #0e2a5e 55%, #143a7a 100%)',
        borderBottom: '1px solid rgba(33,127,241,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Dot grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '-40%', left: '20%', width: '60%', height: '100%',
          background: 'radial-gradient(ellipse, rgba(33,127,241,0.2) 0%, transparent 65%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
        <div className="r-container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '28px' }}>
            <img src="/logotipo-editado.png" alt="" style={{ width: '32px', height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', letterSpacing: '-0.02em' }}>Reminder</span>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '14px', color: '#5aabff' }}> AI</span>
            </span>
          </a>
          <h2 className="r-h2" style={{ marginBottom: '12px', color: '#fff' }}>
            Roadmap Personalizado de Conversão <span style={{ color: '#5aabff' }}>— Grátis</span>
          </h2>
          <p className="r-body" style={{ maxWidth: '520px', margin: '0 auto', color: 'rgba(255,255,255,0.5)' }}>
            14 perguntas. Menos de 60 segundos. Resultados instantâneos.
          </p>
        </div>
      </div>

      <div className="raudit__body">
        <div className="raudit__form-wrap">

          {/* Progress */}
          <div className="raudit__progress-bar-wrap">
            <div className="raudit__progress-bar-top">
              <span className="raudit__progress-step-label">{STEPS[step].title}</span>
              <span className="raudit__progress-counter">{step + 1} / {STEPS.length}</span>
            </div>
            <div className="raudit__progress-track">
              <div className="raudit__progress-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>
            <div className="raudit__progress-steps">
              {STEPS.map((s, i) => (
                <div key={s.id} className={`raudit__progress-pip${i < step ? ' is-done' : i === step ? ' is-active' : ''}`} title={s.title} />
              ))}
            </div>
          </div>

          <div className="raudit__form">
            <div className="raudit__step is-active">
              <h3 className="raudit__step-title">{STEPS[step].title}</h3>
              <p className="raudit__step-desc">{STEPS[step].desc}</p>

              {/* ── BLOCO 1 — EMPRESA ── */}
              {step === 0 && <>
                <div className="raudit__field">
                  <label>Qual é o nome da sua empresa? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <input type="text" placeholder="Empresa Exemplo, Lda." value={values.empresa || ''} onChange={e => set('empresa', e.target.value)} autoFocus />
                </div>
                <div className="raudit__field">
                  <label>Qual é o website da sua empresa? <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opcional)</span></label>
                  <input type="url" placeholder="https://empresa.pt" value={values.website || ''} onChange={e => set('website', e.target.value)} />
                </div>
                <div className="raudit__field">
                  <label>Em que setor trabalha? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <select value={values.setor || ''} onChange={e => set('setor', e.target.value)}>
                    <option value="">Selecionar...</option>
                    {SETORES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </>}

              {/* ── BLOCO 2 — LEADS ── */}
              {step === 1 && <>
                <div className="raudit__field">
                  <label>Quantos leads recebem aproximadamente por mês? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <div className="raudit__card-grid raudit__card-grid--3">
                    {LEADS_MES.map(l => (
                      <button key={l.id} type="button" className={`raudit__card-opt${values.leads_mes === l.id ? ' is-selected' : ''}`} onClick={() => set('leads_mes', l.id)}>
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="raudit__field" style={{ marginTop: '28px' }}>
                  <label>De onde vêm principalmente esses leads? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <p className="raudit__field-hint">Selecione todas as que se aplicam.</p>
                  <div className="raudit__check-grid">
                    {FONTES_LEADS.map(f => (
                      <button key={f.id} type="button" className={`raudit__check-item${(values.fontes || []).includes(f.id) ? ' is-selected' : ''}`} onClick={() => toggleFonte(f.id)}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="raudit__field" style={{ marginTop: '28px' }}>
                  <label>Qual é aproximadamente o valor médio de um novo cliente? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <div className="raudit__card-grid raudit__card-grid--3">
                    {VALOR_CLIENTE.map(v => (
                      <button key={v.id} type="button" className={`raudit__card-opt${values.valor_cliente === v.id ? ' is-selected' : ''}`} onClick={() => set('valor_cliente', v.id)}>
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>}

              {/* ── BLOCO 3 — CONVERSÃO ── */}
              {step === 2 && <>
                <div className="raudit__field">
                  <label>Quanto tempo demora normalmente até alguém contactar um novo lead? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <div className="raudit__card-grid raudit__card-grid--3">
                    {TEMPO_RESPOSTA.map(t => (
                      <button key={t.id} type="button" className={`raudit__card-opt${values.tempo_resposta === t.id ? ' is-selected' : ''}`} onClick={() => set('tempo_resposta', t.id)}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="raudit__field" style={{ marginTop: '28px' }}>
                  <label>Quem é responsável pelo primeiro contacto? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <div className="raudit__radio-stack">
                    {QUEM_CONTACTA.map(q => (
                      <button key={q.id} type="button" className={`raudit__radio-item${values.quem_contacta === q.id ? ' is-selected' : ''}`} onClick={() => set('quem_contacta', q.id)}>
                        <span className="raudit__radio-dot" />{q.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="raudit__field" style={{ marginTop: '28px' }}>
                  <label>Quantas vezes fazem follow-up quando um lead não responde? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <div className="raudit__radio-stack">
                    {FOLLOWUP.map(f => (
                      <button key={f.id} type="button" className={`raudit__radio-item${values.followup === f.id ? ' is-selected' : ''}`} onClick={() => set('followup', f.id)}>
                        <span className="raudit__radio-dot" />{f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="raudit__field" style={{ marginTop: '28px' }}>
                  <label>Como qualificam os leads antes de marcar uma reunião? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <div className="raudit__radio-stack">
                    {QUALIFICACAO.map(q => (
                      <button key={q.id} type="button" className={`raudit__radio-item${values.qualificacao === q.id ? ' is-selected' : ''}`} onClick={() => set('qualificacao', q.id)}>
                        <span className="raudit__radio-dot" />{q.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="raudit__field" style={{ marginTop: '28px' }}>
                  <label>Aproximadamente, que percentagem dos leads acaba por marcar uma reunião? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <div className="raudit__card-grid raudit__card-grid--3">
                    {TAXA_CONVERSAO.map(t => (
                      <button key={t.id} type="button" className={`raudit__card-opt${values.taxa_conversao === t.id ? ' is-selected' : ''}`} onClick={() => set('taxa_conversao', t.id)}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>}

              {/* ── BLOCO 4+5 — PROBLEMA + INTENÇÃO + CONTACTO ── */}
              {step === 3 && <>
                <div className="raudit__field">
                  <label>Qual destas situações descreve melhor a sua empresa? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <div className="raudit__radio-stack">
                    {SITUACAO.map(s => (
                      <button key={s.id} type="button" className={`raudit__radio-item${values.situacao === s.id ? ' is-selected' : ''}`} onClick={() => set('situacao', s.id)}>
                        <span className="raudit__radio-dot" />{s.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="raudit__field" style={{ marginTop: '28px' }}>
                  <label>Se identificarmos uma oportunidade clara, estaria interessado em testar um processo durante 30 dias? <span style={{ color: 'var(--blue)' }}>*</span></label>
                  <div className="raudit__card-grid raudit__card-grid--3">
                    {INTERESSE_PILOTO.map(ip => (
                      <button key={ip.id} type="button" className={`raudit__card-opt${values.interesse_piloto === ip.id ? ' is-selected' : ''}`} onClick={() => set('interesse_piloto', ip.id)}>
                        {ip.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: '28px', padding: '20px 0', borderTop: '1px solid #eee' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#0a1c42', marginBottom: '16px' }}>
                    Para onde devemos enviar o seu Roadmap?
                  </p>
                  <div className="raudit__field">
                    <label>Nome <span style={{ color: 'var(--blue)' }}>*</span></label>
                    <input type="text" placeholder="João Silva" value={values.nome || ''} onChange={e => set('nome', e.target.value)} />
                  </div>
                  <div className="raudit__field">
                    <label>Cargo <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opcional)</span></label>
                    <input type="text" placeholder="CEO, Diretor Comercial..." value={values.cargo || ''} onChange={e => set('cargo', e.target.value)} />
                  </div>
                  <div className="raudit__field">
                    <label>Email profissional <span style={{ color: 'var(--blue)' }}>*</span></label>
                    <input type="email" placeholder="joão@empresa.pt" value={values.email || ''} onChange={e => set('email', e.target.value)} />
                  </div>
                </div>
              </>}

              {/* Navigation */}
              <div className="raudit__nav">
                {step > 0 ? <button className="raudit__back" onClick={() => setStep(s => s - 1)}>\u2190 Voltar</button> : <span />}
                <button
                  className="r-btn r-btn--primary r-btn--lg"
                  onClick={handleNext}
                  disabled={!canProceed() || submitting}
                  style={{ opacity: canProceed() && !submitting ? 1 : 0.45 }}
                >
                  {submitting ? 'A gerar roadmap...' : step < STEPS.length - 1 ? 'Continuar \u2192' : 'Receber o Meu Roadmap \u2192'}
                </button>
              </div>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', marginTop: '20px' }}>
            Grátis \u00B7 Sem compromisso \u00B7 Resultados instantâneos
          </p>
        </div>
      </div>
    </div>
  )
}
