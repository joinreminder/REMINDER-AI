import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import RoadmapResult from '../components/RoadmapResult'
import AilyxFooter from '../components/AilyxFooter'

/* ─── Options ─────────────────────────────────────────────────────── */

const PROBLEMA = [
  { id: 'leads-nao-convertem', label: 'Temos leads, mas poucos chegam a reuniões qualificadas' },
  { id: 'sem-leads',           label: 'Temos dificuldade em gerar leads suficientes' },
  { id: 'falta-followup',      label: 'Temos leads, mas falta follow-up consistente' },
  { id: 'equipa-prospecta',    label: 'A equipa comercial passa demasiado tempo a prospectar' },
  { id: 'varios',              label: 'Temos vários destes problemas' },
]

const PROCESSO = [
  { id: 'manual',                    label: 'É maioritariamente manual',                                   score: 4 },
  { id: 'algumas-automacoes',        label: 'Temos algumas automações, mas muita coisa continua manual',   score: 3 },
  { id: 'estruturado-inconsistente', label: 'Temos um processo estruturado, mas não é consistente',       score: 2 },
  { id: 'bem-definido',              label: 'Temos automações e processos bem definidos',                  score: 0 },
  { id: 'sem-processo',              label: 'Não temos um processo claro',                                score: 4 },
]

const TEMPO_RESPOSTA = [
  { id: '<5min',    label: 'Menos de 5 minutos', score: 0 },
  { id: '5-30min',  label: '5–30 minutos',        score: 1 },
  { id: '30m-2h',   label: '30 min–2 horas',      score: 2 },
  { id: '2-24h',    label: '2–24 horas',           score: 3 },
  { id: '>24h',     label: 'Mais de 24 horas',     score: 4 },
  { id: 'nao-sabe', label: 'Não sabemos',          score: 4 },
]

const FOLLOWUP = [
  { id: 'nao-ha-contacto',  label: 'Normalmente não há novo contacto',          score: 4 },
  { id: '1-2-manual',       label: 'Fazemos 1–2 follow-ups manualmente',         score: 3 },
  { id: 'sequencia-manual', label: 'Temos uma sequência manual de 3+ contactos', score: 1 },
  { id: 'automatizado',     label: 'Temos follow-ups automatizados',             score: 0 },
  { id: 'depende-vendedor', label: 'Depende do vendedor',                        score: 3 },
  { id: 'nao-sabe',         label: 'Não sabemos',                               score: 4 },
]

const QUALIFICACAO = [
  { id: 'sem-criterios',             label: 'Não temos critérios definidos',                      score: 4 },
  { id: 'cada-vendedor',             label: 'Cada vendedor decide individualmente',               score: 3 },
  { id: 'criterios-inconsistentes',  label: 'Temos critérios, mas nem sempre são seguidos',      score: 2 },
  { id: 'criterios-claros',          label: 'Temos critérios claros e um processo consistente',  score: 0 },
  { id: 'parcialmente-auto',         label: 'A qualificação já é parcialmente automatizada',     score: 0 },
]

const REUNIOES_MES = [
  { id: '0-2',      label: '0–2',         score: 4 },
  { id: '3-5',      label: '3–5',         score: 3 },
  { id: '6-10',     label: '6–10',        score: 2 },
  { id: '11-20',    label: '11–20',       score: 1 },
  { id: '20+',      label: '20+',         score: 0 },
  { id: 'nao-mede', label: 'Não medimos', score: 4 },
]

const OBJETIVO_REUNIOES = [
  { id: '3-5',      label: '3–5' },
  { id: '6-10',     label: '6–10' },
  { id: '11-20',    label: '11–20' },
  { id: '20-50',    label: '20–50' },
  { id: '50+',      label: '50+' },
  { id: 'nao-sabe', label: 'Ainda não sabemos' },
]

const VALOR_CLIENTE = [
  { id: '<1000',       label: '< €1.000' },
  { id: '1000-3000',   label: '€1.000–€3.000' },
  { id: '3000-10000',  label: '€3.000–€10.000' },
  { id: '10000-25000', label: '€10.000–€25.000' },
  { id: '25000+',      label: '€25.000+' },
  { id: 'varia',       label: 'Varia muito / não sabemos' },
]

const CAPACIDADE = [
  { id: 'sim-capacidade',   label: 'Sim, temos capacidade' },
  { id: 'sim-algumas-mais', label: 'Sim, mas apenas mais algumas' },
  { id: 'reforcar-equipa',  label: 'Teríamos de reforçar a equipa' },
  { id: 'sem-capacidade',   label: 'Não temos capacidade neste momento' },
  { id: 'nao-sabe',         label: 'Não sabemos' },
]

const EQUIPA_COMERCIAL = [
  { id: '1-2',  label: '1–2 pessoas' },
  { id: '3-5',  label: '3–5 pessoas' },
  { id: '6-10', label: '6–10 pessoas' },
  { id: '11-20',label: '11–20 pessoas' },
  { id: '20+',  label: '20+ pessoas' },
]

const URGENCIA = [
  { id: 'urgente',   label: 'O mais rapidamente possível',  score:  2 },
  { id: '1-3-meses', label: 'Nos próximos 1–3 meses',       score:  1 },
  { id: '3-6-meses', label: 'Nos próximos 3–6 meses',       score:  0 },
  { id: 'avaliar',   label: 'Estamos a avaliar opções',      score:  0 },
  { id: 'explorar',  label: 'Estamos apenas a explorar',     score: -2 },
]

/* ─── Questions (9 slides + 1 contact = 10 total) ──────────────────── */

const QUESTIONS = [
  {
    key: 'problema',
    n: '01',
    text: 'Onde sente que está a perder mais oportunidades comerciais?',
    hint: 'A sua resposta determina que tipo de Roadmap recebe.',
    options: PROBLEMA,
    type: 'stack',
  },
  {
    key: 'processo',
    n: '02',
    text: 'Como é feito actualmente o trabalho entre o primeiro contacto e a reunião?',
    hint: null,
    options: PROCESSO,
    type: 'stack',
  },
  {
    key: 'tempo_resposta',
    n: '03',
    text: 'Quando entra um novo lead, quanto tempo demora normalmente até alguém o contactar?',
    hint: '78% dos negócios B2B são fechados pelo primeiro fornecedor a responder.',
    options: TEMPO_RESPOSTA,
    type: 'stack',
  },
  {
    key: 'followup',
    n: '04',
    text: 'Quando um potencial cliente não responde ao primeiro contacto, o que acontece?',
    hint: '80% das vendas requerem 5+ follow-ups. 44% dos vendedores desistem após o primeiro.',
    options: FOLLOWUP,
    type: 'stack',
  },
  {
    key: 'qualificacao',
    n: '05',
    text: 'Como decidem se um potencial cliente está pronto para falar com um vendedor?',
    hint: null,
    options: QUALIFICACAO,
    type: 'stack',
  },
  {
    key: 'reunioes_mes',
    n: '06',
    text: 'Quantas reuniões comerciais qualificadas conseguem gerar actualmente por mês?',
    hint: null,
    options: REUNIOES_MES,
    type: 'grid',
  },
  {
    key: 'objetivo_reunioes',
    n: '07',
    text: 'Quantas reuniões qualificadas gostariam de gerar por mês?',
    hint: 'A diferença entre o estado actual e este objectivo é o gap que o Roadmap vai quantificar.',
    options: OBJETIVO_REUNIOES,
    type: 'grid',
  },
  {
    key: 'valor_cliente',
    n: '08',
    text: 'Qual é o valor médio de um novo cliente?',
    hint: null,
    options: VALOR_CLIENTE,
    type: 'grid',
  },
  {
    key: 'capacidade',
    n: '09',
    text: 'Se começassem a receber mais reuniões qualificadas amanhã, conseguiriam absorvê-las?',
    hint: null,
    options: CAPACIDADE,
    type: 'stack',
  },
  {
    key: 'equipa_comercial',
    n: '10',
    text: 'Quantas pessoas tem actualmente a equipa comercial?',
    hint: null,
    options: EQUIPA_COMERCIAL,
    type: 'grid',
  },
  {
    key: 'urgencia',
    n: '11',
    text: 'Quando gostariam de melhorar este processo?',
    hint: null,
    options: URGENCIA,
    type: 'stack',
  },
]

const TOTAL_SLIDES = QUESTIONS.length + 1 // 10 questions + 1 contact = 11 slides

/* ─── Scoring ─────────────────────────────────────────────────────── */

const ROADMAP_TYPES = {
  response:      { letter: 'A', name: 'RESPONSE' },
  followup:      { letter: 'B', name: 'FOLLOW-UP' },
  qualification: { letter: 'C', name: 'QUALIFICATION' },
  leadToMeeting: { letter: 'D', name: 'APPOINTMENT' },
  outbound:      { letter: 'E', name: 'OUTBOUND' },
}

function calcScore(v) {
  const response      = TEMPO_RESPOSTA.find(t => t.id === v.tempo_resposta)?.score ?? 0
  const followup      = FOLLOWUP.find(f => f.id === v.followup)?.score ?? 0
  const qualification = QUALIFICACAO.find(q => q.id === v.qualificacao)?.score ?? 0
  const leadToMeeting = REUNIOES_MES.find(r => r.id === v.reunioes_mes)?.score ?? 0

  const urgencyScore = URGENCIA.find(u => u.id === v.urgencia)?.score ?? 0

  const scores = { response, followup, qualification, leadToMeeting }
  const total  = response + followup + qualification + leadToMeeting + urgencyScore

  // Outbound routing: sem leads ou equipa presa em prospeção
  if (v.problema === 'sem-leads' || v.problema === 'equipa-prospecta') {
    return {
      scores, total, maxTotal: 18,
      roadmapKey: 'outbound',
      priorities: ['response', 'followup', 'qualification', 'leadToMeeting'],
      urgencyScore, problema: v.problema,
    }
  }

  // Follow-up routing: problema explicitamente de follow-up
  if (v.problema === 'falta-followup') {
    const priorities = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([k]) => k)
    return {
      scores, total, maxTotal: 18,
      roadmapKey: 'followup',
      priorities,
      urgencyScore, problema: v.problema,
    }
  }

  // Inbound / vários → maior gargalo
  let roadmapKey = 'response'
  let maxScore = -1
  for (const [key, val] of Object.entries(scores)) {
    if (val > maxScore) { maxScore = val; roadmapKey = key }
  }

  const priorities = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  return { scores, total, maxTotal: 18, roadmapKey, priorities, urgencyScore, problema: v.problema }
}

/* ─── Component ───────────────────────────────────────────────────── */

export default function DiagnosticoPage() {
  const [slide, setSlide]           = useState(0)
  const [dir, setDir]               = useState(1)
  const [animKey, setAnimKey]       = useState(0)
  const [values, setValues]         = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult]         = useState(null)
  const bodyRef = useRef(null)

  const set = (k, v) => setValues(prev => ({ ...prev, [k]: v }))

  const goTo = (next, direction = 1) => {
    setDir(direction)
    setSlide(next)
    setAnimKey(k => k + 1)
    if (bodyRef.current) bodyRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pick = (key, id) => {
    set(key, id)
    setTimeout(() => goTo(slide + 1, 1), 220)
  }

  const isContactSlide = slide === QUESTIONS.length
  const progress = Math.round(((slide) / TOTAL_SLIDES) * 100)

  const canSubmit = () =>
    values.nome?.trim() && values.email?.trim() && values.empresa?.trim()

  const handleSubmit = async () => {
    if (!canSubmit() || submitting) return
    setSubmitting(true)
    const scoring = calcScore(values)
    const isDisqualified = values.valor_cliente === '<1000'
    const grade = isDisqualified ? 'C' : scoring.total >= 11 ? 'A' : scoring.total >= 6 ? 'B' : 'C'

    const profileLabels = [
      ['Problema principal',     PROBLEMA.find(p => p.id === values.problema)?.label || ''],
      ['Processo actual',        PROCESSO.find(p => p.id === values.processo)?.label || ''],
      ['Tempo de resposta',      TEMPO_RESPOSTA.find(t => t.id === values.tempo_resposta)?.label || ''],
      ['Follow-up',              FOLLOWUP.find(f => f.id === values.followup)?.label || ''],
      ['Qualificação',           QUALIFICACAO.find(q => q.id === values.qualificacao)?.label || ''],
      ['Reuniões/mês (actual)',  REUNIOES_MES.find(r => r.id === values.reunioes_mes)?.label || ''],
      ['Objectivo reuniões/mês', OBJETIVO_REUNIOES.find(o => o.id === values.objetivo_reunioes)?.label || ''],
      ['Valor médio/cliente',    VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label || ''],
      ['Capacidade de absorção', CAPACIDADE.find(c => c.id === values.capacidade)?.label || ''],
      ['Equipa comercial',       EQUIPA_COMERCIAL.find(e => e.id === values.equipa_comercial)?.label || ''],
      ['Urgência',               URGENCIA.find(u => u.id === values.urgencia)?.label || ''],
    ]

    try {
      fetch('/api/notion-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: {
            nome: values.nome, email: values.email, empresa: values.empresa,
            website:        values.website || '',
            tempo_resposta: TEMPO_RESPOSTA.find(t => t.id === values.tempo_resposta)?.label || '',
            followup:       FOLLOWUP.find(f => f.id === values.followup)?.label || '',
            qualificacao:   QUALIFICACAO.find(q => q.id === values.qualificacao)?.label || '',
            valor_cliente:  VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label || '',
            equipa_comercial: EQUIPA_COMERCIAL.find(e => e.id === values.equipa_comercial)?.label || '',
          },
          scoring: {
            roadmapKey: scoring.roadmapKey,
            roadmapName: ROADMAP_TYPES[scoring.roadmapKey].name,
            total: scoring.total, maxTotal: scoring.maxTotal,
            scores: scoring.scores, grade,
          },
        }),
      })
    } catch (_) {}

    try {
      const notesLines = [
        ...profileLabels.map(([k, v]) => `${k}: ${v}`),
        `---`,
        `Roadmap: ${ROADMAP_TYPES[scoring.roadmapKey].name} (${scoring.total}/${scoring.maxTotal})`,
        `Grade: ${grade}`,
      ].join('\n')

      supabase.from('leads').insert({
        nome: values.nome, empresa: values.empresa, email: values.email,
        website: values.website || '',
        problema: ROADMAP_TYPES[scoring.roadmapKey].name,
        fonte: 'Inbound', stage: 'nova', score: grade, notes: notesLines,
      })
    } catch (_) {}

    try {
      fetch('/api/hubspot-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: {
            nome: values.nome, email: values.email, empresa: values.empresa,
            website:           values.website || '',
            problema:          PROBLEMA.find(p => p.id === values.problema)?.label || '',
            processo:          PROCESSO.find(p => p.id === values.processo)?.label || '',
            tempo_resposta:    TEMPO_RESPOSTA.find(t => t.id === values.tempo_resposta)?.label || '',
            followup:          FOLLOWUP.find(f => f.id === values.followup)?.label || '',
            qualificacao:      QUALIFICACAO.find(q => q.id === values.qualificacao)?.label || '',
            reunioes_mes:      REUNIOES_MES.find(r => r.id === values.reunioes_mes)?.label || '',
            objetivo_reunioes: OBJETIVO_REUNIOES.find(o => o.id === values.objetivo_reunioes)?.label || '',
            valor_cliente:     VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label || '',
            capacidade:        CAPACIDADE.find(c => c.id === values.capacidade)?.label || '',
            equipa_comercial:  EQUIPA_COMERCIAL.find(e => e.id === values.equipa_comercial)?.label || '',
            urgencia:          URGENCIA.find(u => u.id === values.urgencia)?.label || '',
          },
          scoring: {
            roadmapKey: scoring.roadmapKey,
            roadmapName: ROADMAP_TYPES[scoring.roadmapKey].name,
            total: scoring.total, maxTotal: scoring.maxTotal,
            scores: scoring.scores, grade,
          },
        }),
      })
    } catch (_) {}

    try {
      fetch('/api/send-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: values.nome, email: values.email, empresa: values.empresa,
          website: values.website || '',
          roadmapKey: scoring.roadmapKey,
          priorities: scoring.priorities,
          total: scoring.total, maxTotal: scoring.maxTotal,
          profile: profileLabels,
        }),
      })
    } catch (_) {}

    setResult(scoring)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ─── Result ──────────────────────────────────────────────────── */
  if (result) {
    return (
      <RoadmapResult
        scoring={result}
        profile={[
          ['Empresa', values.empresa],
          ...([
            ['Problema principal',     PROBLEMA.find(p => p.id === values.problema)?.label],
            ['Processo actual',        PROCESSO.find(p => p.id === values.processo)?.label],
            ['Tempo de resposta',      TEMPO_RESPOSTA.find(t => t.id === values.tempo_resposta)?.label],
            ['Follow-up',              FOLLOWUP.find(f => f.id === values.followup)?.label],
            ['Qualificação',           QUALIFICACAO.find(q => q.id === values.qualificacao)?.label],
            ['Reuniões/mês (actual)',  REUNIOES_MES.find(r => r.id === values.reunioes_mes)?.label],
            ['Objectivo reuniões/mês', OBJETIVO_REUNIOES.find(o => o.id === values.objetivo_reunioes)?.label],
            ['Valor médio/cliente',    VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label],
            ['Capacidade de absorção', CAPACIDADE.find(c => c.id === values.capacidade)?.label],
            ['Equipa comercial',       EQUIPA_COMERCIAL.find(e => e.id === values.equipa_comercial)?.label],
          ]),
        ]}
        empresa={values.empresa}
        values={values}
      />
    )
  }

  /* ─── Form ────────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight: '100vh', background: '#06102a', display: 'flex', flexDirection: 'column' }}>

      <style>{`
        @keyframes dq-in-right  { from { opacity: 0; transform: translateX(48px);  } to { opacity: 1; transform: translateX(0); } }
        @keyframes dq-in-left   { from { opacity: 0; transform: translateX(-48px); } to { opacity: 1; transform: translateX(0); } }
        .dq-slide-fwd  { animation: dq-in-right 0.36s cubic-bezier(0.22,1,0.36,1) both; }
        .dq-slide-back { animation: dq-in-left  0.36s cubic-bezier(0.22,1,0.36,1) both; }

        .dq-opt {
          width: 100%; text-align: left; padding: 14px 20px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px; cursor: pointer;
          font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.8);
          transition: border-color 0.15s, background 0.15s, color 0.15s;
          display: flex; align-items: center; gap: 12px;
        }
        .dq-opt:hover  { border-color: rgba(33,127,241,0.5); background: rgba(33,127,241,0.06); color: #fff; }
        .dq-opt.sel    { border-color: #217FF1; background: rgba(33,127,241,0.12); color: #fff; }
        .dq-opt.sel .dq-dot { background: #217FF1; border-color: #217FF1; }
        .dq-opt.sel .dq-dot::after { opacity: 1; }

        .dq-dot {
          width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.2);
          background: transparent; position: relative; transition: all 0.15s;
        }
        .dq-dot::after {
          content: ''; position: absolute; inset: 3px;
          background: #fff; border-radius: 50%; opacity: 0; transition: opacity 0.15s;
        }

        .dq-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        @media (max-width: 560px) { .dq-grid { grid-template-columns: repeat(2, 1fr); } }

        .dq-input {
          width: 100%; padding: 14px 18px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px; color: #fff;
          font-family: 'Inter', sans-serif; font-size: 15px;
          outline: none; transition: border-color 0.15s;
          box-sizing: border-box;
        }
        .dq-input::placeholder { color: rgba(255,255,255,0.25); }
        .dq-input:focus { border-color: rgba(33,127,241,0.6); }
      `}</style>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #06102a 0%, #0e2a5e 55%, #143a7a 100%)',
        borderBottom: '1px solid rgba(33,127,241,0.2)',
        position: 'relative', overflow: 'hidden',
        padding: '36px 24px 28px',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1060, margin: '0 auto' }}>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
            <img src="/logotipo-editado.png" alt="" style={{ width: 28, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
            <div>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px', color: '#fff', letterSpacing: '-0.02em', display: 'block' }}>Reminder</span>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 500, fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.01em' }}>Reuniões Qualificadas com IA para empresas B2B</span>
            </div>
          </a>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '22px', color: '#fff', margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            Roadmap de Conversão <span style={{ color: '#5aabff' }}>— Grátis</span>
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>
            11 perguntas · Menos de 60 segundos · Resultados instantâneos
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{
          height: '100%', background: '#217FF1',
          width: `${progress}%`,
          transition: 'width 0.4s ease',
          borderRadius: '0 2px 2px 0',
        }} />
      </div>

      {/* Main layout */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: '1fr 360px',
        maxWidth: 1060, width: '100%',
        margin: '0 auto', padding: '0 24px',
        gap: 48, alignItems: 'start',
      }} className="dq-layout">

        <style>{`
          @media (max-width: 900px) {
            .dq-layout { grid-template-columns: 1fr !important; }
            .dq-side { display: none !important; }
          }
        `}</style>

        {/* Left — Question area */}
        <div style={{ paddingTop: 64, paddingBottom: 64 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            {slide > 0 && (
              <button
                onClick={() => goTo(slide - 1, -1)}
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8, padding: '6px 14px',
                  color: 'rgba(255,255,255,0.5)', fontSize: 13,
                  cursor: 'pointer', fontFamily: 'Sora, sans-serif',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
              >
                ← Voltar
              </button>
            )}
            <span style={{
              fontSize: 12, color: 'rgba(255,255,255,0.3)',
              fontFamily: 'Sora, sans-serif', fontWeight: 600, letterSpacing: '0.08em',
            }}>
              {isContactSlide ? 'QUASE LÁ' : `${slide + 1} / ${QUESTIONS.length}`}
            </span>
          </div>

          {/* Animated slide */}
          <div key={animKey} className={dir >= 0 ? 'dq-slide-fwd' : 'dq-slide-back'}>

            {/* Question slides */}
            {!isContactSlide && (() => {
              const q = QUESTIONS[slide]
              return (
                <div>
                  <p style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 800,
                    fontSize: 'clamp(20px, 3vw, 28px)', color: '#fff',
                    letterSpacing: '-0.03em', lineHeight: 1.25,
                    margin: '0 0 12px',
                  }}>
                    {q.text}
                  </p>
                  {q.hint && (
                    <p style={{
                      fontSize: 13, color: 'rgba(255,255,255,0.35)',
                      lineHeight: 1.6, margin: '0 0 28px',
                      borderLeft: '2px solid rgba(33,127,241,0.4)',
                      paddingLeft: 12,
                    }}>
                      {q.hint}
                    </p>
                  )}
                  {!q.hint && <div style={{ marginBottom: 28 }} />}

                  {q.type === 'grid' ? (
                    <div className="dq-grid">
                      {q.options.map(opt => (
                        <button
                          key={opt.id}
                          className={`dq-opt${values[q.key] === opt.id ? ' sel' : ''}`}
                          onClick={() => pick(q.key, opt.id)}
                          style={{ justifyContent: 'center', textAlign: 'center', padding: '16px 12px' }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {q.options.map(opt => (
                        <button
                          key={opt.id}
                          className={`dq-opt${values[q.key] === opt.id ? ' sel' : ''}`}
                          onClick={() => pick(q.key, opt.id)}
                        >
                          <span className="dq-dot" />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <p style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: 'Sora, sans-serif' }}>
                    Seleccione uma opção para continuar automaticamente
                  </p>
                </div>
              )
            })()}

            {/* Contact slide */}
            {isContactSlide && (
              <div>
                <p style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(20px, 3vw, 28px)', color: '#fff',
                  letterSpacing: '-0.03em', lineHeight: 1.25,
                  margin: '0 0 8px',
                }}>
                  Para onde enviamos o seu Roadmap de Conversão?
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 32px', lineHeight: 1.6 }}>
                  Gratuito · Sem compromisso · Resultados instantâneos
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', marginBottom: 8, fontFamily: 'Sora, sans-serif' }}>
                      NOME
                    </label>
                    <input
                      className="dq-input"
                      type="text"
                      placeholder="João Silva"
                      value={values.nome || ''}
                      onChange={e => set('nome', e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', marginBottom: 8, fontFamily: 'Sora, sans-serif' }}>
                      EMPRESA
                    </label>
                    <input
                      className="dq-input"
                      type="text"
                      placeholder="Empresa Exemplo, Lda."
                      value={values.empresa || ''}
                      onChange={e => set('empresa', e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', marginBottom: 8, fontFamily: 'Sora, sans-serif' }}>
                      EMAIL PROFISSIONAL
                    </label>
                    <input
                      className="dq-input"
                      type="email"
                      placeholder="joao@empresa.pt"
                      value={values.email || ''}
                      onChange={e => set('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', marginBottom: 8, fontFamily: 'Sora, sans-serif' }}>
                      WEBSITE DA EMPRESA <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.2)' }}>(opcional)</span>
                    </label>
                    <input
                      className="dq-input"
                      type="url"
                      placeholder="www.empresa.pt"
                      value={values.website || ''}
                      onChange={e => set('website', e.target.value)}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit() || submitting}
                  style={{
                    marginTop: 28,
                    width: '100%', padding: '18px 32px',
                    background: canSubmit() && !submitting ? '#217FF1' : 'rgba(33,127,241,0.3)',
                    border: 'none', borderRadius: 14,
                    fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 15,
                    color: '#fff', cursor: canSubmit() && !submitting ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s, box-shadow 0.2s',
                    boxShadow: canSubmit() && !submitting ? '0 8px 28px rgba(33,127,241,0.4)' : 'none',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={e => { if (canSubmit() && !submitting) e.currentTarget.style.background = '#1a6fdb' }}
                  onMouseLeave={e => { if (canSubmit() && !submitting) e.currentTarget.style.background = '#217FF1' }}
                >
                  {submitting ? 'A gerar o seu Roadmap…' : 'Receber o Meu Roadmap →'}
                </button>

                <p style={{ marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.2)', textAlign: 'center', fontFamily: 'Sora, sans-serif' }}>
                  Os seus dados são tratados de acordo com a nossa{' '}
                  <a href="/privacidade" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline' }}>
                    Política de Privacidade
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right — Sticky side panel */}
        <div className="dq-side" style={{ paddingTop: 64, position: 'sticky', top: 32 }}>
          <div style={{
            background: '#fff', borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 4px 40px rgba(0,0,0,0.25)',
          }}>
            <div style={{ background: '#06102a', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <img src="/logotipo-editado.png" alt="" style={{ width: 18, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                <div>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 12, color: '#5aabff', display: 'block' }}>Reminder</span>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Lead Conversion com IA · B2B</span>
                </div>
              </div>
              <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 15, color: '#fff', margin: 0, lineHeight: 1.3 }}>
                Roadmap Personalizado<br />de Conversão
              </p>
            </div>

            <div style={{ padding: '20px 24px' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 14px' }}>
                O que vai receber:
              </p>
              {[
                { n: '01', t: 'Perfil de Conversão',  d: 'Visão geral do seu processo actual' },
                { n: '02', t: 'Principal Gargalo',     d: 'Onde está a perder mais oportunidades' },
                { n: '03', t: 'Prioridades',           d: 'O que atacar primeiro e porquê' },
                { n: '04', t: 'Roadmap + Ações',       d: 'Passos concretos para aumentar reuniões' },
                { n: '05', t: 'Próximo Passo',         d: 'Piloto Gratuito — vagas limitadas' },
              ].map((s, i) => (
                <div key={s.n} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: '10px 0',
                  borderBottom: i < 4 ? '1px solid #f0f0f0' : 'none',
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                    background: i <= (slide - 3) ? '#217FF1' : '#f0f4fa',
                    color: i <= (slide - 3) ? '#fff' : '#999',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, fontFamily: 'Sora, sans-serif',
                    transition: 'background 0.3s, color 0.3s',
                  }}>
                    {i <= (slide - 3) ? '✓' : s.n}
                  </span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0a1c42', margin: '0 0 1px' }}>{s.t}</p>
                    <p style={{ fontSize: 11, color: '#999', margin: 0, lineHeight: 1.4 }}>{s.d}</p>
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: 16, background: '#f0f6ff', borderRadius: 10,
                padding: '14px 16px', border: '1px solid #d4e5ff',
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#217FF1', margin: '0 0 4px' }}>
                  Piloto Gratuito — Vagas Limitadas
                </p>
                <p style={{ fontSize: 11, color: '#666', margin: 0, lineHeight: 1.4 }}>
                  Implementamos o Método Reminder™ na sua empresa, sem custo. Em troca, só pedimos o seu feedback depois de ver os resultados.
                </p>
              </div>
            </div>
          </div>

          {/* Answers summary */}
          {slide > 0 && (
            <div style={{ marginTop: 16, padding: '16px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>
                Respostas até agora
              </p>
              {QUESTIONS.slice(0, slide).map(q => {
                const selected = q.options.find(o => o.id === values[q.key])
                if (!selected) return null
                return (
                  <div key={q.key} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>{q.n}</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'right', flex: 1 }}>{selected.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>

      <AilyxFooter />
    </div>
  )
}
