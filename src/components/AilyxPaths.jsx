import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PATHS = [
  {
    title: 'OUTBOUND',
    subtitle: 'Criar novas oportunidades.',
    color: '#5aabff',
    steps: ['ICP', 'Sourcing', 'Research', 'Personalizacao', 'Outreach', 'Follow-up', 'Qualificacao', 'Reuniao'],
  },
  {
    title: 'INBOUND',
    subtitle: 'Converter melhor a procura que ja existe.',
    color: '#4ade80',
    steps: ['Lead', 'Contacto', 'Qualificacao', 'Follow-up', 'Booking', 'Reuniao'],
  },
  {
    title: 'REACTIVACAO',
    subtitle: 'Recuperar oportunidades que ficaram para tras.',
    color: '#f59e0b',
    steps: ['Lead antigo', 'Re-engagement', 'Conversa', 'Qualificacao', 'Reuniao'],
  },
]

export default function AilyxPaths() {
  const headRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 78%', once: true },
      })
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 40, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid #e8edf5' }}>
      <div className="ayl-container">

        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="ayl-section-label" style={{ marginBottom: '16px', display: 'inline-block' }}>Outbound + Inbound + Reactivacao</div>
          <h2 className="ayl-h2" style={{ color: '#0a1c42', marginBottom: '12px' }}>
            Tres caminhos. Um objetivo.
          </h2>
        </div>

        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="ayl-paths-grid">
          {PATHS.map((path, i) => (
            <div key={i} style={{
              padding: '32px 24px',
              background: '#F8FAFF',
              border: `1.5px solid ${path.color}22`,
              borderRadius: '20px',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
              <div>
                <div style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: '14px', color: path.color,
                  letterSpacing: '0.06em', marginBottom: '6px',
                }}>
                  {path.title}
                </div>
                <p style={{ fontSize: '15px', color: '#0a1c42', fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
                  {path.subtitle}
                </p>
              </div>

              {/* Mini workflow */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {path.steps.map((step, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0', flexDirection: 'column' }}>
                    <div style={{
                      padding: '6px 14px',
                      background: j === path.steps.length - 1 ? `${path.color}18` : 'rgba(0,0,0,0.03)',
                      border: `1px solid ${j === path.steps.length - 1 ? `${path.color}44` : 'rgba(0,0,0,0.06)'}`,
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: j === path.steps.length - 1 ? 700 : 500,
                      color: j === path.steps.length - 1 ? path.color : '#555',
                      fontFamily: 'Sora, sans-serif',
                      width: '100%', textAlign: 'center',
                    }}>
                      {step}
                    </div>
                    {j < path.steps.length - 1 && (
                      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" style={{ margin: '2px 0' }}>
                        <path d="M5 0v12M2 9l3 3 3-3" stroke={path.color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: '15px', color: '#0a1c42', margin: 0, lineHeight: 1.5,
          }}>
            <span style={{ color: '#5aabff' }}>Outbound</span> gera procura.{' '}
            <span style={{ color: '#4ade80' }}>Inbound</span> converte procura.{' '}
            <span style={{ color: '#f59e0b' }}>Reactivacao</span> recupera procura perdida.
          </p>
        </div>

      </div>
    </section>
  )
}
