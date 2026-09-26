import { useState } from 'react'
import { supabase } from '../lib/supabase'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/meebdjwa'
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/remindr/diagnostico'

const STEPS = [
  {
    key: 'tipo',
    question: 'Que tipo de clínica tem?',
    hint: 'Selecione uma opção para continuar automaticamente',
    options: ['Estética', 'Medicina Estética', 'Dentária', 'Fisioterapia', 'Outra'],
    disqualify: null,
  },
  {
    key: 'consultas',
    question: 'Quantos pacientes ou contactos tem na base de dados?',
    hint: 'A nossa metodologia funciona a partir de 500 contactos existentes',
    options: ['Menos de 500', '500 a 1.500', '1.500 a 5.000', 'Mais de 5.000'],
    disqualify: 'Menos de 500',
  },
  {
    key: 'faturacao',
    question: 'Faturação anual aproximada da clínica?',
    hint: 'Selecione uma opção para continuar automaticamente',
    options: ['Menos de €100k', '€100k a €300k', '€300k a €600k', 'Mais de €600k'],
    disqualify: 'Menos de €100k',
  },
  {
    key: 'dor',
    question: 'Qual é o principal desafio neste momento?',
    hint: 'Selecione uma opção para continuar automaticamente',
    options: [
      'Pacientes que não voltam',
      'Leads que não convertem',
      'Follow-up que não acontece',
      'Agenda com espaço por preencher',
    ],
    disqualify: null,
  },
]

async function saveLead(data) {
  await supabase.from('leads').insert({
    nome: data.nome,
    whatsapp: data.whatsapp,
    tipo: data.tipo,
    consultas: data.consultas,
    faturacao: data.faturacao,
    dor: data.dor,
    stage: 'nova',
  })
}

export default function LeadForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ tipo: '', consultas: '', faturacao: '', dor: '', nome: '', whatsapp: '' })
  // 'questions' | 'disqualified' | 'contact' | 'sending' | 'done'
  const [phase, setPhase] = useState('questions')

  const currentStep = STEPS[step]
  const progress = Math.round((step / STEPS.length) * 100)

  const select = (key, val) => {
    setData(d => ({ ...d, [key]: val }))
    const s = STEPS[step]
    if (s.disqualify && val === s.disqualify) {
      setTimeout(() => setPhase('disqualified'), 260)
      return
    }
    setTimeout(() => {
      if (step + 1 < STEPS.length) setStep(n => n + 1)
      else setPhase('contact')
    }, 260)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!data.nome.trim() || !data.whatsapp.trim()) return
    setPhase('sending')
    await saveLead(data)
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nome: data.nome,
          whatsapp: data.whatsapp,
          tipo_clinica: data.tipo,
          base_de_pacientes: data.consultas,
          faturacao_anual: data.faturacao,
          maior_problema: data.dor,
          _subject: `[Reminder] ✅ Lead qualificada — ${data.nome} · ${data.tipo} · ${data.faturacao}`,
        }),
      })
    } catch (_) { /* lead já guardada no Supabase */ }
    setPhase('done')
  }

  /* ── Disqualified ── */
  if (phase === 'disqualified') {
    return (
      <div style={{ padding: '40px 28px', textAlign: 'center' }}>
        <div style={{ fontSize: '52px', marginBottom: '20px' }}>🤝</div>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '12px', lineHeight: 1.3 }}>
          Honestidade antes de tudo
        </h3>
        <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 16px' }}>
          Com base nas suas respostas, o perfil da sua clínica ainda não está no ponto ideal para tirar o máximo da Reminder.
        </p>
        <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.6, maxWidth: '340px', margin: '0 auto 28px' }}>
          O nosso sistema foi desenhado para clínicas com uma base de pacientes já consolidada.
          Quando chegar lá, adoraríamos trabalhar consigo.
        </p>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block', padding: '14px 28px',
            background: '#217FF1', color: 'white',
            borderRadius: '14px', fontWeight: 700, fontSize: '15px',
            textDecoration: 'none',
          }}
        >
          Seguir-nos no Instagram →
        </a>
        <p style={{ marginTop: '16px', fontSize: '13px', color: '#bbb' }}>
          Dicas de crescimento gratuitas para clínicas
        </p>
      </div>
    )
  }

  /* ── Success ── */
  if (phase === 'done') {
    return (
      <div style={{ padding: '40px 28px', textAlign: 'center' }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', margin: '0 auto 20px',
        }}>✓</div>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>
          Perfil aprovado, {data.nome.split(' ')[0]}!
        </h3>
        <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6, maxWidth: '360px', margin: '0 auto 28px' }}>
          Recebemos os seus dados. O próximo passo é agendar a sua análise gratuita de 20 minutos.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block', padding: '16px 32px',
            background: '#217FF1', color: 'white',
            borderRadius: '14px', fontWeight: 700, fontSize: '16px',
            textDecoration: 'none', marginBottom: '12px',
          }}
        >
          📅 Agendar a análise gratuita →
        </a>
        <p style={{ fontSize: '13px', color: '#bbb' }}>
          Abre o Calendly — escolha o dia que mais lhe convém
        </p>
      </div>
    )
  }

  /* ── Contact form (qualified) ── */
  if (phase === 'contact' || phase === 'sending') {
    return (
      <form onSubmit={submit} style={{ padding: '32px 28px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 14px', background: '#d1fae5', borderRadius: '100px',
          fontSize: '13px', fontWeight: 700, color: '#065f46', marginBottom: '20px',
        }}>
          <span>✓</span> Perfil qualificado
        </div>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '21px', fontWeight: 700, color: '#111', marginBottom: '8px', lineHeight: 1.3 }}>
          Últimos detalhes para a sua análise
        </h3>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
          Gratuito · 20 minutos · sem compromisso
        </p>

        <div style={{
          display: 'flex', gap: '8px', flexWrap: 'wrap',
          background: '#F3F6FB', borderRadius: '12px', padding: '12px 14px',
          marginBottom: '20px',
        }}>
          {[data.tipo, data.consultas, data.faturacao].filter(Boolean).map((v, i) => (
            <span key={i} style={{
              background: 'white', border: '1px solid #e0e7f0',
              borderRadius: '8px', padding: '5px 12px',
              fontSize: '12px', color: '#217FF1', fontWeight: 600,
            }}>{v}</span>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          <input
            className="lf__input"
            type="text"
            placeholder="O seu nome *"
            value={data.nome}
            onChange={e => setData(d => ({ ...d, nome: e.target.value }))}
            required
            disabled={phase === 'sending'}
            style={{ fontSize: '15px' }}
          />
          <input
            className="lf__input"
            type="tel"
            placeholder="WhatsApp (ex: +351 9XX XXX XXX) *"
            value={data.whatsapp}
            onChange={e => setData(d => ({ ...d, whatsapp: e.target.value }))}
            required
            disabled={phase === 'sending'}
            style={{ fontSize: '15px' }}
          />
        </div>

        <button
          type="submit"
          disabled={phase === 'sending'}
          style={{
            width: '100%', padding: '16px', boxSizing: 'border-box',
            background: '#217FF1', color: 'white', border: 'none',
            borderRadius: '14px', fontSize: '16px', fontWeight: 700,
            cursor: phase === 'sending' ? 'not-allowed' : 'pointer',
            opacity: phase === 'sending' ? 0.7 : 1,
          }}
        >
          {phase === 'sending' ? 'A processar…' : 'Quero agendar a análise gratuita →'}
        </button>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#bbb', marginTop: '10px' }}>
          Sem compromisso · respondemos em menos de 24h úteis
        </p>
      </form>
    )
  }

  /* ── Question steps ── */
  return (
    <div>
      <div style={{ height: 4, background: '#F3F6FB', overflow: 'hidden', borderRadius: '4px 4px 0 0' }}>
        <div style={{
          width: `${progress}%`, height: '100%',
          background: '#217FF1', transition: 'width 0.4s ease',
        }} />
      </div>

      <div style={{ padding: '28px 28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          {step > 0 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '14px', padding: 0 }}
            >
              ← Anterior
            </button>
          ) : <span />}
          <span style={{ fontSize: '12px', color: '#bbb', fontWeight: 600 }}>
            {step + 1} / {STEPS.length}
          </span>
        </div>

        <p style={{ fontSize: '12px', color: '#bbb', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          {String(step + 1).padStart(2, '0')} —
        </p>
        <h2 style={{
          fontFamily: 'Sora, sans-serif', fontSize: 'clamp(17px, 3.5vw, 21px)',
          fontWeight: 700, color: '#111', lineHeight: 1.35, marginBottom: '6px',
        }}>
          {currentStep.question}
        </h2>
        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '22px' }}>
          {currentStep.hint}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentStep.options.map(opt => {
            const selected = data[currentStep.key] === opt
            return (
              <button
                key={opt}
                onClick={() => select(currentStep.key, opt)}
                style={{
                  padding: '14px 18px', textAlign: 'left', cursor: 'pointer',
                  border: `1.5px solid ${selected ? '#217FF1' : '#e8edf5'}`,
                  borderRadius: '12px', fontSize: '15px',
                  fontWeight: selected ? 700 : 400,
                  background: selected ? '#217FF1' : 'white',
                  color: selected ? 'white' : '#111',
                  transition: 'all 0.12s ease',
                }}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
