import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import RoadmapResult from '../components/RoadmapResult'
import AilyxFooter from '../components/AilyxFooter'

/* ─── Options ─────────────────────────────────────────────────────── */

const PROBLEMA = [
  { id: 'pipeline-insuficiente',     label: 'Não temos pipeline suficiente ou previsível' },
  { id: 'equipa-prospecta',          label: 'A equipa comercial passa demasiado tempo a prospectar' },
  { id: 'dependencia-referencias',   label: 'Dependemos demasiado de referências ou inbound' },
  { id: 'reunioes-nao-qualificadas', label: 'Temos reuniões, mas poucas são realmente qualificadas' },
  { id: 'volume-inconsistente',      label: 'O número de reuniões varia demasiado de mês para mês' },
  { id: 'varios',                    label: 'Vários destes problemas' },
]

const ORIGEM_OPORTUNIDADES = [
  { id: 'referencias',      label: 'Referências / network' },
  { id: 'inbound',          label: 'Inbound — website, LinkedIn, conteúdo, eventos, etc.' },
  { id: 'outbound',         label: 'Outbound — prospecção activa' },
  { id: 'misto',            label: 'Uma combinação de inbound e outbound' },
  { id: 'sem-visibilidade', label: 'Não temos visibilidade clara sobre a origem' },
]

const ESTADO_OUTBOUND = [
  { id: 'nao-fazemos',            label: 'Não fazemos outbound',                                          score: 4 },
  { id: 'ocasional',              label: 'Fazemos outbound ocasionalmente, sem processo consistente',      score: 3 },
  { id: 'processo-inconsistente', label: 'Temos um processo, mas é difícil manter a consistência',        score: 2 },
  { id: 'estruturado',            label: 'Temos uma operação estruturada e consistente',                   score: 0 },
  { id: 'estruturado-mais',       label: 'Temos uma operação estruturada, mas queremos aumentar o volume', score: 1 },
]

const QUEM_PROSPECTA = [
  { id: 'fundador',      label: 'Fundador / CEO',                                              score: 3 },
  { id: 'equipa-divide', label: 'A equipa comercial divide o tempo entre prospecção e vendas', score: 4 },
  { id: 'dedicado',      label: 'Temos uma pessoa/equipa dedicada à prospecção',               score: 1 },
  { id: 'agencia',       label: 'Agência / parceiro externo',                                  score: 2 },
  { id: 'nao-fazemos',   label: 'Não fazemos prospecção activa',                               score: 4 },
]

const ICP_DEFINIDO = [
  { id: 'nao-definido',           label: 'Não temos um ICP definido',                                        score: 4 },
  { id: 'ideia-nao-documentada',  label: 'Temos uma ideia do nosso cliente ideal, mas não está documentada',  score: 3 },
  { id: 'definido-inconsistente', label: 'Temos um ICP definido, mas não é seguido consistentemente',         score: 2 },
  { id: 'claro-seguido',          label: 'Temos um ICP claro e a prospecção é baseada nele',                  score: 0 },
]

const VALOR_CLIENTE = [
  { id: '<2500',       label: '< €2.500' },
  { id: '2500-5000',   label: '€2.500–€5.000' },
  { id: '5000-10000',  label: '€5.000–€10.000' },
  { id: '10000-25000', label: '€10.000–€25.000' },
  { id: '25000+',      label: '€25.000+' },
]

const CAPACIDADE = [
  { id: 'sim-bastante', label: 'Sim, temos bastante capacidade' },
  { id: 'sim-limite',   label: 'Sim, mas estamos perto do limite' },
  { id: 'reorganizar',  label: 'Teríamos de reorganizar a equipa' },
  { id: 'nao-agora',    label: 'Não neste momento' },
]

const EQUIPA_COMERCIAL = [
  { id: '1',    label: '1 pessoa' },
  { id: '2-3',  label: '2–3 pessoas' },
  { id: '4-5',  label: '4–5 pessoas' },
  { id: '6-10', label: '6–10 pessoas' },
  { id: '10+',  label: '10+ pessoas' },
]

const PROSPECTS_MES = [
  { id: '<100',      label: 'Menos de 100' },
  { id: '100-500',   label: '100–500' },
  { id: '500-1000',  label: '500–1.000' },
  { id: '1000-5000', label: '1.000–5.000' },
  { id: '5000+',     label: 'Mais de 5.000' },
  { id: 'nao-sabe',  label: 'Não sabemos' },
]

const URGENCIA = [
  { id: 'urgente',   label: 'O mais rapidamente possível', score:  2 },
  { id: '30-dias',   label: 'Nos próximos 30 dias',        score:  1 },
  { id: '2-3-meses', label: 'Nos próximos 2–3 meses',      score:  0 },
  { id: 'explorar',  label: 'Estamos apenas a explorar',   score: -2 },
]

/* ─── Questions ─────────────────────────────────────────────────────── */

const QUESTIONS = [
  {
    key: 'problema',
    n: '01',
    text: 'Qual é o principal desafio comercial neste momento?',
    hint: 'A sua resposta determina o tipo de Roadmap que recebe.',
    options: PROBLEMA,
    type: 'stack',
  },
  {
    key: 'origem_oportunidades',
    n: '02',
    text: 'De onde vêm actualmente a maioria das vossas oportunidades comerciais?',
    hint: null,
    options: ORIGEM_OPORTUNIDADES,
    type: 'stack',
  },
  {
    key: 'estado_outbound',
    n: '03',
    text: 'Como está actualmente estruturado o vosso outbound?',
    hint: null,
    options: ESTADO_OUTBOUND,
    type: 'stack',
  },
  {
    key: 'quem_prospecta',
    n: '04',
    text: 'Quem trata actualmente da prospecção?',
    hint: null,
    options: QUEM_PROSPECTA,
    type: 'stack',
  },
  {
    key: 'icp_definido',
    n: '05',
    text: 'Quão definido está o vosso ICP (perfil de cliente ideal)?',
    hint: 'O ICP é a base de qualquer operação de outbound eficiente.',
    options: ICP_DEFINIDO,
    type: 'stack',
  },
  {
    key: 'reunioes_atual',
    n: '06',
    text: 'Quantas reuniões qualificadas geram actualmente por mês?',
    hint: null,
    type: 'number',
    placeholder: 'ex: 5',
    unit: 'reuniões / mês',
  },
  {
    key: 'reunioes_objetivo',
    n: '07',
    text: 'Quantas reuniões qualificadas gostariam de gerar por mês?',
    hint: 'A diferença entre este número e o actual é o gap que o Roadmap vai quantificar.',
    type: 'number',
    placeholder: 'ex: 20',
    unit: 'reuniões / mês',
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
    text: 'Se começassem a gerar mais reuniões qualificadas, a equipa conseguiria absorvê-las?',
    hint: null,
    options: CAPACIDADE,
    type: 'stack',
  },
  {
    key: 'equipa_comercial',
    n: '10',
    text: 'Quantas pessoas fazem actualmente parte da equipa comercial?',
    hint: null,
    options: EQUIPA_COMERCIAL,
    type: 'grid',
  },
  {
    key: 'prospects_mes',
    n: '11',
    text: 'Quantos prospects conseguem contactar actualmente por mês?',
    hint: null,
    options: PROSPECTS_MES,
    type: 'grid',
  },
  {
    key: 'urgencia',
    n: '12',
    text: 'Quando gostariam de resolver isto?',
    hint: null,
    options: URGENCIA,
    type: 'stack',
  },
]

const TOTAL_SLIDES = QUESTIONS.length + 1 // 12 questions + 1 contact = 13 slides

/* ─── Scoring ─────────────────────────────────────────────────────── */

const ROADMAP_TYPES = {
  response:      { letter: 'A', name: 'RESPONSE' },
  followup:      { letter: 'B', name: 'FOLLOW-UP' },
  qualification: { letter: 'C', name: 'QUALIFICATION' },
  leadToMeeting: { letter: 'D', name: 'APPOINTMENT' },
  outbound:      { letter: 'E', name: 'OUTBOUND' },
}

function calcScore(v) {
  const outboundMaturity = ESTADO_OUTBOUND.find(e => e.id === v.estado_outbound)?.score ?? 0
  const icpClarity       = ICP_DEFINIDO.find(e => e.id === v.icp_definido)?.score ?? 0
  const prospectionGap   = QUEM_PROSPECTA.find(e => e.id === v.quem_prospecta)?.score ?? 0

  // Meetings gap score — higher gap = higher score (more opportunity)
  const atual    = parseInt(v.reunioes_atual, 10) || 0
  const objetivo = parseInt(v.reunioes_objetivo, 10) || 0
  const gap      = Math.max(0, objetivo - atual)
  const meetingsGap = gap >= 20 ? 4 : gap >= 10 ? 3 : gap >= 5 ? 2 : gap >= 1 ? 1 : 0

  const urgencyScore = URGENCIA.find(u => u.id === v.urgencia)?.score ?? 0

  const scores = { outboundMaturity, icpClarity, prospectionGap, meetingsGap }
  const total  = outboundMaturity + icpClarity + prospectionGap + meetingsGap + urgencyScore

  // Routing
  let roadmapKey = 'outbound'

  if (v.problema === 'reunioes-nao-qualificadas') {
    roadmapKey = 'qualification'
  } else if (v.estado_outbound === 'processo-inconsistente') {
    roadmapKey = 'followup'
  } else if ((v.estado_outbound === 'estruturado' || v.estado_outbound === 'estruturado-mais') && meetingsGap > 0) {
    roadmapKey = 'leadToMeeting'
  } else {
    roadmapKey = 'outbound'
  }

  const priorities = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([k]) => k)

  return { scores, total, maxTotal: 18, roadmapKey, priorities, urgencyScore, problema: v.problema, gap }
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
    const isDisqualified = values.valor_cliente === '<2500'
    const grade = isDisqualified ? 'C' : scoring.total >= 11 ? 'A' : scoring.total >= 6 ? 'B' : 'C'

    const profileLabels = [
      ['Desafio principal',       PROBLEMA.find(p => p.id === values.problema)?.label || ''],
      ['Origem das oportunidades',ORIGEM_OPORTUNIDADES.find(o => o.id === values.origem_oportunidades)?.label || ''],
      ['Estado do outbound',      ESTADO_OUTBOUND.find(e => e.id === values.estado_outbound)?.label || ''],
      ['Quem prospecta',          QUEM_PROSPECTA.find(e => e.id === values.quem_prospecta)?.label || ''],
      ['ICP definido',            ICP_DEFINIDO.find(e => e.id === values.icp_definido)?.label || ''],
      ['Reuniões/mês (actual)',   values.reunioes_atual ? `${values.reunioes_atual} reuniões` : ''],
      ['Objectivo reuniões/mês',  values.reunioes_objetivo ? `${values.reunioes_objetivo} reuniões` : ''],
      ['Gap de reuniões',         scoring.gap != null ? `+${scoring.gap} reuniões/mês` : ''],
      ['Valor médio/cliente',     VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label || ''],
      ['Capacidade de absorção',  CAPACIDADE.find(c => c.id === values.capacidade)?.label || ''],
      ['Equipa comercial',        EQUIPA_COMERCIAL.find(e => e.id === values.equipa_comercial)?.label || ''],
      ['Prospects/mês',           PROSPECTS_MES.find(p => p.id === values.prospects_mes)?.label || ''],
      ['Urgência',                URGENCIA.find(u => u.id === values.urgencia)?.label || ''],
    ]

    try {
      fetch('/api/notion-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: {
            nome: values.nome, email: values.email, empresa: values.empresa,
            website:             values.website || '',
            estado_outbound:     ESTADO_OUTBOUND.find(e => e.id === values.estado_outbound)?.label || '',
            icp_definido:        ICP_DEFINIDO.find(e => e.id === values.icp_definido)?.label || '',
            quem_prospecta:      QUEM_PROSPECTA.find(e => e.id === values.quem_prospecta)?.label || '',
            valor_cliente:       VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label || '',
            equipa_comercial:    EQUIPA_COMERCIAL.find(e => e.id === values.equipa_comercial)?.label || '',
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
            website:              values.website || '',
            problema:             PROBLEMA.find(p => p.id === values.problema)?.label || '',
            origem_oportunidades: ORIGEM_OPORTUNIDADES.find(o => o.id === values.origem_oportunidades)?.label || '',
            estado_outbound:      ESTADO_OUTBOUND.find(e => e.id === values.estado_outbound)?.label || '',
            quem_prospecta:       QUEM_PROSPECTA.find(e => e.id === values.quem_prospecta)?.label || '',
            icp_definido:         ICP_DEFINIDO.find(e => e.id === values.icp_definido)?.label || '',
            reunioes_atual:       values.reunioes_atual || '',
            reunioes_objetivo:    values.reunioes_objetivo || '',
            gap_reunioes:         scoring.gap != null ? String(scoring.gap) : '',
            valor_cliente:        VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label || '',
            capacidade:           CAPACIDADE.find(c => c.id === values.capacidade)?.label || '',
            equipa_comercial:     EQUIPA_COMERCIAL.find(e => e.id === values.equipa_comercial)?.label || '',
            prospects_mes:        PROSPECTS_MES.find(p => p.id === values.prospects_mes)?.label || '',
            urgencia:             URGENCIA.find(u => u.id === values.urgencia)?.label || '',
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
            ['Desafio principal',        PROBLEMA.find(p => p.id === values.problema)?.label],
            ['Origem das oportunidades', ORIGEM_OPORTUNIDADES.find(o => o.id === values.origem_oportunidades)?.label],
            ['Estado do outbound',       ESTADO_OUTBOUND.find(e => e.id === values.estado_outbound)?.label],
            ['Quem prospecta',           QUEM_PROSPECTA.find(e => e.id === values.quem_prospecta)?.label],
            ['ICP definido',             ICP_DEFINIDO.find(e => e.id === values.icp_definido)?.label],
            ['Reuniões/mês (actual)',    values.reunioes_atual ? `${values.reunioes_atual} reuniões` : undefined],
            ['Objectivo reuniões/mês',   values.reunioes_objetivo ? `${values.reunioes_objetivo} reuniões` : undefined],
            ['Gap de reuniões',          scoring.gap != null ? `+${scoring.gap} reuniões/mês` : undefined],
            ['Valor médio/cliente',      VALOR_CLIENTE.find(v => v.id === values.valor_cliente)?.label],
            ['Capacidade de absorção',   CAPACIDADE.find(c => c.id === values.capacidade)?.label],
            ['Equipa comercial',         EQUIPA_COMERCIAL.find(e => e.id === values.equipa_comercial)?.label],
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
            12 perguntas · Menos de 60 segundos · Resultados instantâneos
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

                  {q.type === 'number' ? (
                    <div>
                      <div style={{ position: 'relative', maxWidth: 240 }}>
                        <input
                          className="dq-input"
                          type="number"
                          min="0"
                          placeholder={q.placeholder}
                          value={values[q.key] || ''}
                          onChange={e => set(q.key, e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter' && values[q.key] !== undefined && values[q.key] !== '') goTo(slide + 1, 1) }}
                          style={{ fontSize: '22px', textAlign: 'center', padding: '18px', fontFamily: 'Sora, sans-serif', fontWeight: 700 }}
                          autoFocus
                        />
                      </div>
                      {q.unit && (
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: '8px 0 24px', fontFamily: 'Sora, sans-serif' }}>
                          {q.unit}
                        </p>
                      )}
                      <button
                        onClick={() => { if (values[q.key] !== undefined && values[q.key] !== '') goTo(slide + 1, 1) }}
                        disabled={!values[q.key] && values[q.key] !== '0'}
                        style={{
                          padding: '14px 32px',
                          background: values[q.key] ? '#217FF1' : 'rgba(33,127,241,0.25)',
                          border: 'none', borderRadius: 12,
                          fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 14,
                          color: '#fff', cursor: values[q.key] ? 'pointer' : 'not-allowed',
                          transition: 'background 0.2s',
                        }}
                      >
                        Continuar →
                      </button>
                      <p style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: 'Sora, sans-serif' }}>
                        Pode colocar 0 se não geram actualmente
                      </p>
                    </div>
                  ) : q.type === 'grid' ? (
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
                let label
                if (q.type === 'number') {
                  label = values[q.key] !== undefined && values[q.key] !== '' ? `${values[q.key]} ${q.unit || ''}` : null
                } else {
                  label = q.options?.find(o => o.id === values[q.key])?.label
                }
                if (!label) return null
                return (
                  <div key={q.key} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>{q.n}</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'right', flex: 1 }}>{label}</span>
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
