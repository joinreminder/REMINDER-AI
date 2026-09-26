import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { n: '01', label: 'AI Onboarding Worker',   desc: 'Um processo. O mais impactante, o mais bem definido. Aqui começa tudo.',     current: true  },
  { n: '02', label: 'Customer Operations',    desc: 'Expandimos para outros processos operacionais críticos do cliente.',          current: false },
  { n: '03', label: 'Multiple AI Workers',    desc: 'Uma equipa de Workers que trabalha em paralelo, cada um no seu processo.',   current: false },
  { n: '04', label: 'AI Customer Department', desc: 'O departamento de customer operations funciona maioritariamente em IA.',     current: false },
  { n: '05', label: 'AI Workforce',           desc: 'Uma estrutura de Workers que executa e escala com o negócio.',               current: false },
]

export default function CoRoadmap() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        y: 24, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="co-section co-section--surface">
      <div className="co-container">

        <div className="co-grid-2i co-grid-stk" style={{ gap: 'clamp(48px, 6vw, 96px)' }}>

          <div>
            <span className="co-eyebrow" data-reveal>O Caminho</span>
            <h2 className="co-h2" data-reveal style={{ marginBottom: '20px' }}>
              Começamos com<br />um Worker.
            </h2>
            <p className="co-body" data-reveal style={{ marginBottom: '24px' }}>
              Primeiro automatizamos um processo. Depois conectamos processos. Depois construímos uma equipa de Workers.
            </p>
            <div data-reveal style={{
              padding: '16px 20px', background: 'var(--co-white)',
              border: '1px solid var(--co-line)', borderRadius: '10px',
            }}>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', fontWeight: 600, color: 'var(--co-blue)', margin: '0 0 4px 0' }}>
                O objetivo não é ter uma automação.
              </p>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'var(--co-ink)', margin: 0, fontWeight: 500 }}>
                É construir capacidade.
              </p>
            </div>
          </div>

          <div data-reveal>
            <div className="co-roadmap-list">
              {STEPS.map((step, i) => (
                <div key={i} className={`co-roadmap-item${step.current ? ' co-roadmap-item--active' : ''}`}>
                  <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      fontFamily: 'var(--co-font-d)', fontWeight: 800, fontSize: '11px',
                      color: step.current ? 'var(--co-blue)' : 'var(--co-subtle)',
                      letterSpacing: '0.06em',
                    }}>{step.n}</span>
                    <span style={{
                      fontFamily: 'var(--co-font-b)', fontWeight: 600, fontSize: '15px',
                      color: step.current ? 'var(--co-ink)' : 'var(--co-subtle)',
                    }}>{step.label}</span>
                    {step.current && (
                      <span style={{
                        fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600,
                        color: 'white', background: 'var(--co-blue)', borderRadius: '100px',
                        padding: '2px 10px', letterSpacing: '0.04em',
                      }}>Começamos aqui</span>
                    )}
                  </div>
                  <p style={{
                    fontFamily: 'var(--co-font-b)', fontSize: '13px',
                    color: step.current ? 'var(--co-muted)' : '#CBD5E1',
                    lineHeight: 1.6, margin: 0,
                  }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
