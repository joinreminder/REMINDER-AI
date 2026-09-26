import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import CoWorkerCard from './CoWorkerCard'

const WORKFLOW = [
  { icon: '🎯', label: 'Projeto vendido' },
  { icon: '📄', label: 'Informação solicitada' },
  { icon: '↗️', label: 'Follow-up enviado' },
  { icon: '🤝', label: 'Equipa coordenada' },
  { icon: '⚠️', label: 'Bloqueio detectado' },
  { icon: '👤', label: 'Exceção encaminhada' },
  { icon: '✅', label: 'Projeto pronto' },
]

export default function CoHero() {
  const headRef  = useRef(null)
  const subRef   = useRef(null)
  const ctaRef   = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(headRef.current,  { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
        .fromTo(subRef.current,   { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo(ctaRef.current,   { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo(rightRef.current, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 1   }, '-=0.9')
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      background: 'var(--co-black)',
      paddingTop: 'clamp(130px, 15vw, 180px)',
      paddingBottom: 'clamp(80px, 10vw, 120px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 75%)',
      }} />

      <div className="co-container" style={{ position: 'relative' }}>
        <div className="co-grid-2i co-grid-ctr">

          {/* Left */}
          <div>
            <span className="co-eyebrow co-eyebrow--dim">AI Delivery Operations</span>

            <h1 ref={headRef} className="co-h1" style={{ marginBottom: '28px' }}>
              Venda mais.<br />Entregue mais.<br />
              <span style={{ color: 'var(--co-blue)' }}>Sem acrescentar<br />trabalho operacional.</span>
            </h1>

            <p ref={subRef} style={{
              fontFamily: 'var(--co-font-b)', fontSize: 'clamp(15px, 1.6vw, 17px)',
              color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: '440px', marginBottom: '36px',
            }}>
              A Reminder AI executa o trabalho operacional que acontece entre a venda e a entrega: recolhe informação, envia follow-ups, coordena tarefas, atualiza os seus sistemas, identifica bloqueios e encaminha para a sua equipa apenas o que precisa de decisão humana.
              <br /><br />
              A sua equipa gere o trabalho. A IA mantém o processo em movimento.
            </p>

            <div ref={ctaRef} style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
              <a href="#cta-final" className="co-btn co-btn--primary co-btn--lg">
                Agendar diagnóstico gratuito
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                {['Diagnóstico gratuito', '60 min', 'Sem compromisso'].map((t, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--co-font-b)', fontSize: '11px',
                    color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em',
                  }}>· {t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — workflow diagram */}
          <div ref={rightRef}>
            <div className="co-diagram">
              <div className="co-diagram__header">
                <span className="co-diagram__label">Delivery Operations · AI Worker</span>
                <span className="co-diagram__live">
                  <span className="co-diagram__dot" />
                  LIVE
                </span>
              </div>
              <div className="co-diagram__body">
                {WORKFLOW.map((step, i) => (
                  <div key={i}>
                    <div className="co-flow-node co-flow-node--channel" style={{
                      background: i === 0 ? 'rgba(37,99,235,0.12)' : i === WORKFLOW.length - 1 ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.03)',
                      borderColor: i === 0 ? 'rgba(37,99,235,0.3)' : i === WORKFLOW.length - 1 ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.08)',
                      color: i === 0 ? '#93c5fd' : i === WORKFLOW.length - 1 ? '#6ee7b7' : 'rgba(255,255,255,0.5)',
                      display: 'flex', alignItems: 'center', gap: '10px',
                    }}>
                      <span style={{ fontSize: '14px' }}>{step.icon}</span>
                      <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        {step.label}
                      </span>
                    </div>
                    {i < WORKFLOW.length - 1 && (
                      <div className="co-flow-arrow">↓</div>
                    )}
                  </div>
                ))}
                <div style={{ marginTop: '16px', padding: '10px 14px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '6px', textAlign: 'center' }}>
                  <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                    Delivery operations. Não apenas onboarding.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
