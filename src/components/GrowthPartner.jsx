import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SCATTER = [
  { x: -160, y: 100, rotation: -10, scale: 0.82 },
  { x: 0,    y: 160, rotation:   0, scale: 0.78 },
  { x: 160,  y: 100, rotation:  10, scale: 0.82 },
]

const STEPS = [
  {
    num: '01',
    title: 'Diagnóstico de Receita',
    desc: 'Mapeamos o percurso do paciente, identificamos cada fuga de receita e calculamos o impacto em euros. Resultado concreto em 15 minutos. Grátis — sem compromisso.',
    tag: 'Gratuito',
    tagColor: '#16A34A',
    tagBg: 'rgba(22,163,74,0.08)',
  },
  {
    num: '02',
    title: 'Sistema de Recuperação',
    desc: 'Implementamos as automações críticas — confirmações, follow-up de tratamentos, reativação de inativos. A clínica não para. Primeiros resultados em 4 a 6 semanas.',
    tag: '4–6 semanas',
    tagColor: 'var(--purple)',
    tagBg: 'var(--purple-light)',
  },
  {
    num: '03',
    title: 'Gestão Mensal',
    desc: 'Acompanhamento contínuo com relatório mensal: receita recuperada, faltas evitadas, pacientes reativados. Mensalidade fixa calculada no diagnóstico com base no impacto projetado.',
    tag: 'Recorrente',
    tagColor: '#0369A1',
    tagBg: 'rgba(3,105,161,0.08)',
  },
]

const BEFORE_AFTER = [
  {
    before: 'Falta às 14h sem aviso. Cadeira vazia. Receita perdida.',
    after:  'Confirmação automática 48h antes. Taxa de faltas cai de 22% para 8%.',
  },
  {
    before: 'Tratamento proposto. "Vou pensar". Nunca mais aparece.',
    after:  'Follow-up automático em 3 contactos. Aceitação sobe de 38% para 67%.',
  },
  {
    before: 'Centenas de pacientes inativos. Ninguém os foi buscar.',
    after:  'Campanha de reativação automática. +28 pacientes recuperados por mês.',
  },
  {
    before: 'Dono indispensável — impossível desligar ao fim de semana.',
    after:  'Sistema funciona de forma autónoma. O dono gere — não opera.',
  },
]

export default function GrowthPartner() {
  const stepsRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    if (!cards.length) return

    cards.forEach((card, i) => {
      const s = SCATTER[i]
      gsap.set(card, { x: s.x, y: s.y, rotation: s.rotation, scale: s.scale, opacity: 0 })
    })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(cards, {
            x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: { amount: 0.22, from: 'center' },
          })
        },
        once: true,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="section section--dark" id="como-funciona">
      <div className="container">

        {/* Header */}
        <div className="anim" style={{ maxWidth: 680, marginBottom: 64 }}>
          <span className="label" style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 16, display: 'block' }}>
            Clinic Growth Partner · Reminder
          </span>
          <h2 className="h2" style={{ color: 'white', marginBottom: 20, lineHeight: 1.1 }}>
            Não vendemos software.<br />
            <mark style={{
              background: 'linear-gradient(135deg, #9B93F5 0%, #C4BEF9 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Vendemos crescimento.
            </mark>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: 0 }}>
            A diferença entre nós e qualquer agência ou ferramenta: definimos um resultado
            em euros antes de começar, implementamos sem parar a clínica, e continuamos
            a trabalhar até esse resultado ser atingido.
          </p>
        </div>

        {/* Before / After — o elemento mais poderoso, agora em primeiro */}
        <div className="anim" style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            O que muda na prática
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            {/* Headers */}
            <div style={{ padding: '12px 20px', background: 'rgba(220,38,38,0.12)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(220,38,38,0.8)' }}>Antes</span>
            </div>
            <div style={{ padding: '12px 20px', background: 'rgba(22,163,74,0.1)', borderBottom: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(22,163,74,0.9)' }}>Com a Reminder</span>
            </div>
            {BEFORE_AFTER.map((row, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <div style={{ padding: '16px 20px', background: 'rgba(220,38,38,0.05)', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.55 }}>{row.before}</p>
                </div>
                <div style={{ padding: '16px 20px', background: 'rgba(22,163,74,0.06)', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.55, fontWeight: 500 }}>{row.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Steps */}
        <div className="gp__steps" ref={stepsRef}>
          {STEPS.map((s, i) => (
            <div key={s.num} className="gp__step-glass" ref={el => cardRefs.current[i] = el}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple)' }}>
                  {s.num}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: s.tagColor, background: s.tagBg, borderRadius: 100, padding: '3px 10px' }}>
                  {s.tag}
                </span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'white', margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Honesty statement */}
        <div className="anim anim--d4" style={{
          marginTop: 24,
          padding: '18px 24px',
          background: 'rgba(155,147,245,0.07)',
          border: '1px solid rgba(155,147,245,0.18)',
          borderRadius: 12,
          display: 'flex', alignItems: 'flex-start', gap: 14,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B93F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>
            Se após o Diagnóstico o retorno projetado não justificar o investimento,{' '}
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}>dizemos isso antes de avançar.</strong>{' '}
            Sem compromisso. Sem custo. Sem pressão.
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <a href="#final-cta" className="btn btn--primary btn--lg">
            Marcar o Diagnóstico Gratuito →
          </a>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 10 }}>
            15 minutos · resultado em euros · sem compromisso
          </p>
        </div>

      </div>
    </section>
  )
}
