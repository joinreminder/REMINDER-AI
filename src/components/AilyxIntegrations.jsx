import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = [
  { title: 'OUTBOUND', tools: 'Apollo · Clay · Smartlead · LinkedIn', color: '#5aabff' },
  { title: 'CRM', tools: 'HubSpot · Salesforce · Pipedrive', color: '#a78bfa' },
  { title: 'COMUNICACAO', tools: 'Gmail · Outlook · Email', color: '#4ade80' },
  { title: 'CALENDARIO', tools: 'Calendly · Google Calendar · Outlook Calendar', color: '#f59e0b' },
]

export default function AilyxIntegrations() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 78%', once: true },
      })
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#F3F6FB', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid #e8edf5' }}>
      <div className="ayl-container">

        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="ayl-section-label" style={{ marginBottom: '16px', display: 'inline-block' }}>Integracoes</div>
          <h2 className="ayl-h2" style={{ color: '#0a1c42', marginBottom: '12px' }}>
            Trabalhamos com as ferramentas que ja utiliza.
          </h2>
          <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
            Nao precisa de reconstruir a sua operacao comercial.
          </p>
        </div>

        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '700px', margin: '0 auto 40px' }} className="ayl-stack-grid">
          {CATEGORIES.map((cat, i) => (
            <div key={i} style={{
              padding: '24px 20px',
              background: '#fff',
              border: '1.5px solid #e8edf5',
              borderRadius: '16px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '12px', color: cat.color,
                letterSpacing: '0.08em', marginBottom: '10px',
              }}>
                {cat.title}
              </div>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6, margin: 0 }}>
                {cat.tools}
              </p>
            </div>
          ))}
        </div>

        {/* Visual flow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', maxWidth: '320px', margin: '0 auto' }}>
          <div style={{
            padding: '10px 20px', background: 'rgba(33,127,241,0.08)',
            border: '1px solid rgba(33,127,241,0.18)', borderRadius: '10px',
            fontSize: '13px', color: '#555', fontWeight: 500, textAlign: 'center',
          }}>
            Apollo / Clay / Smartlead
          </div>
          <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
            <path d="M6 0v18M2 14l4 4 4-4" stroke="#217FF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
          </svg>
          <div style={{
            padding: '14px 24px', background: '#217FF1',
            borderRadius: '12px', boxShadow: '0 4px 16px rgba(33,127,241,0.35)',
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: '15px', color: '#fff',
          }}>
            REMINDER
          </div>
          <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
            <path d="M6 0v18M2 14l4 4 4-4" stroke="#217FF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
          </svg>
          <div style={{
            padding: '10px 20px', background: 'rgba(33,127,241,0.08)',
            border: '1px solid rgba(33,127,241,0.18)', borderRadius: '10px',
            fontSize: '13px', color: '#555', fontWeight: 500, textAlign: 'center',
          }}>
            CRM / Calendar / Sales Team
          </div>
        </div>

        <p style={{
          textAlign: 'center', fontFamily: 'Sora, sans-serif', fontWeight: 700,
          fontSize: '15px', color: '#0a1c42', margin: '36px 0 0',
        }}>
          As ferramentas sao a infraestrutura. Nos construimos o sistema a volta delas.
        </p>

      </div>
    </section>
  )
}
