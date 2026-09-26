import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Revenue & Capacity Map',
    day: '60 minutos',
    desc: 'Mapeamos onde a empresa perde receita, tempo e capacidade. Identificamos as 1–3 oportunidades com maior impacto económico.',
    badge: 'Diagnóstico Gratuito',
    active: true,
  },
  {
    num: '02',
    title: 'Priorização',
    day: 'Antes de avançar',
    desc: 'Ordenamos as oportunidades por impacto económico. Nada é construído sem acordo prévio sobre o resultado esperado.',
    active: false,
  },
  {
    num: '03',
    title: 'Construção',
    day: 'Standard: 14 dias',
    desc: 'Construímos o sistema — integrações, workflows, automações. A equipa não toca em nada técnico.',
    badge: 'Feito por nós',
    active: true,
  },
  {
    num: '04',
    title: 'Medição',
    day: 'Após lançamento',
    desc: 'Comparamos o antes e o depois: tempo poupado, oportunidades recuperadas, processos eliminados.',
    active: false,
  },
  {
    num: '05',
    title: 'Optimização',
    day: 'Contínua',
    desc: 'O sistema fica gerido. À medida que a empresa cresce, identificamos novos gargalos e melhoramos o que existe.',
    active: true,
  },
]

export default function RProcess() {
  const navigate  = useNavigate()
  const headRef   = useRef(null)
  const stepsRef  = useRef(null)
  const ctaRef    = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      })
      Array.from(stepsRef.current.children).forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -24 : 24, opacity: 0,
          duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 83%', once: true },
        })
      })
      gsap.from(ctaRef.current.children, {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#F4F7FB', padding: 'clamp(80px, 10vw, 120px) 0' }} id="como-funciona">
      <div className="ayl-container">

        {/* Header */}
        <div ref={headRef} style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: '32px', marginBottom: 'clamp(48px, 6vw, 64px)', flexWrap: 'wrap',
        }}>
          <div>
            <div className="ayl-section-label" style={{ marginBottom: '16px' }}>Como Funciona</div>
            <h2 className="ayl-h2">
              Não entregamos relatórios.<br />Entregamos sistemas que funcionam.
            </h2>
          </div>
          <div style={{ maxWidth: '280px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#217FF1', marginBottom: '4px', letterSpacing: '0.04em' }}>
              Diagnóstico → Priorização → Construção → Medição → Optimização
            </div>
            <div style={{ fontSize: '13px', color: '#999' }}>Um processo estruturado. Uma entrega concreta.</div>
          </div>
        </div>

        {/* Steps timeline */}
        <div ref={stepsRef} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{
              display: 'grid',
              gridTemplateColumns: '160px 1px 1fr',
              gap: '0 32px',
              alignItems: 'stretch',
              minHeight: '90px',
            }}>
              {/* Left */}
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-end', justifyContent: 'flex-start',
                paddingTop: '2px', paddingRight: '32px',
              }}>
                <div style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(26px, 2.8vw, 38px)',
                  color: step.active ? '#217FF1' : '#e2e8f0',
                  lineHeight: 1, letterSpacing: '-0.04em',
                }}>
                  {step.num}
                </div>
                <div style={{
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#999',
                  marginTop: '4px', textAlign: 'right',
                }}>
                  {step.day}
                </div>
              </div>

              {/* Timeline line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
                  background: step.active ? '#217FF1' : '#e2e8f0',
                  border: `2px solid ${step.active ? '#217FF1' : '#d0d7e4'}`,
                  marginTop: '6px',
                }} />
                {i < steps.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: '#e2e8f0', marginTop: '4px' }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: i < steps.length - 1 ? '40px' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 600,
                    fontSize: 'clamp(15px, 1.6vw, 18px)',
                    color: '#111', letterSpacing: '-0.02em', lineHeight: 1.3, margin: 0,
                  }}>
                    {step.title}
                  </h3>
                  {step.badge && (
                    <span style={{
                      fontSize: '11px', fontWeight: 700, color: '#217FF1',
                      background: '#EEF4FF', borderRadius: '100px', padding: '3px 10px',
                    }}>
                      {step.badge}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.65, margin: 0, maxWidth: '540px' }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ marginTop: 'clamp(40px, 5vw, 56px)', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
          <button
            className="ayl-btn"
            style={{
              background: '#217FF1', color: '#fff', border: 'none',
              borderRadius: '12px', padding: '15px 28px',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Sora, sans-serif', letterSpacing: '-0.01em',
              boxShadow: '0 6px 24px rgba(33,127,241,0.28)',
            }}
            onClick={() => navigate('/diagnostico')}
          >
            Começar com o diagnóstico gratuito →
          </button>
          <span style={{ fontSize: '13px', color: '#999' }}>
            60 min · Análise completa · Sem compromisso
          </span>
        </div>

      </div>
    </section>
  )
}
