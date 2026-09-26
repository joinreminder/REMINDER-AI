import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FLOW_STEPS = [
  'Lead recebida',
  'Contacto iniciado',
  'Follow-up executado',
  'Lead qualificada',
  'Reunião marcada',
]

export default function AilyxIncludes() {
  const headRef  = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 78%', once: true },
      })
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          y: 32, opacity: 0, duration: 0.65, ease: 'power3.out', delay: i * 0.09,
          scrollTrigger: { trigger: headRef.current, start: 'top 72%', once: true },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid #e8edf5' }} id="systems">
      <div className="ayl-container">

        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="ayl-section-label" style={{ marginBottom: '16px', display: 'inline-block' }}>O mecanismo</div>
          <h2 className="ayl-h2" style={{ marginBottom: '12px' }}>
            O caminho entre uma lead e uma reunião
          </h2>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.65, maxWidth: '520px', margin: '0 auto' }}>
            Uma conversão não acontece num único passo.
          </p>
        </div>

        {/* Conversion flow */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0', maxWidth: '480px', margin: '0 auto',
        }}>
          {FLOW_STEPS.map((step, i) => (
            <div key={i} ref={el => cardsRef.current[i] = el} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '100%',
                padding: '18px 24px',
                background: i === FLOW_STEPS.length - 1 ? '#EEF4FF' : '#F8FAFF',
                border: `1.5px solid ${i === FLOW_STEPS.length - 1 ? 'rgba(33,127,241,0.3)' : '#e8edf5'}`,
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <span style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: i === FLOW_STEPS.length - 1 ? '16px' : '14px',
                  color: i === FLOW_STEPS.length - 1 ? '#217FF1' : '#0a1c42',
                }}>
                  {step}
                </span>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <svg width="12" height="24" viewBox="0 0 12 24" fill="none" style={{ margin: '6px 0' }}>
                  <path d="M6 0v18M2 14l4 4 4-4" stroke="#217FF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Statement box: what the team should focus on */}
        <div style={{
          marginTop: '48px', textAlign: 'center',
          padding: '24px 28px',
          background: '#F8FAFF',
          border: '1.5px solid #e8edf5',
          borderRadius: '14px',
          maxWidth: '600px', margin: '48px auto 0',
        }}>
          <p style={{
            fontSize: '15px', color: '#666', lineHeight: 1.6, margin: '0 0 12px',
          }}>
            A sua equipa comercial deve concentrar-se onde cria mais valor:
          </p>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(17px, 2vw, 22px)',
            color: '#217FF1', lineHeight: 1.4, margin: 0,
          }}>
            Reuniões {'\u00B7'} Propostas {'\u00B7'} Negociação {'\u00B7'} Closing
          </p>
        </div>

        {/* Supporting text */}
        <p style={{
          textAlign: 'center', marginTop: '28px',
          fontSize: '15px', color: '#666', lineHeight: 1.6,
          maxWidth: '520px', margin: '28px auto 0',
        }}>
          O processo anterior à reunião precisa de acontecer de forma consistente.
        </p>

        {/* Tagline */}
        <div style={{
          marginTop: '32px', textAlign: 'center',
          padding: '20px 28px',
          background: '#06142e',
          border: '1px solid rgba(33,127,241,0.2)',
          borderRadius: '14px',
          maxWidth: '600px', margin: '32px auto 0',
        }}>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: '#5aabff', lineHeight: 1.5, margin: 0,
          }}>
            A sua equipa vende. Nós fazemos o trabalho antes da reunião.
          </p>
        </div>

      </div>
    </section>
  )
}
