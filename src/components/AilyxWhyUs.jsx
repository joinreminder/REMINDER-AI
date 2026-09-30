import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NOT_JUST = [
  'Uma agencia de lead generation.',
  'Uma ferramenta de email.',
  'Um CRM.',
  'Um chatbot.',
  'Um AI SDR.',
]

const PILLARS = [
  'Strategy',
  'AI',
  'Automation',
  'Integrations',
  'Operations',
  'Optimisation',
]

export default function AilyxWhyUs() {
  const contentRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: contentRef.current, start: 'top 76%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid #e8edf5' }}>
      <div className="ayl-container">
        <div ref={contentRef} style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>

          <div className="ayl-section-label" style={{ marginBottom: '0', display: 'inline-block' }}>Porque a Reminder?</div>

          <h2 className="ayl-h2" style={{ color: '#0a1c42', marginBottom: '0' }}>
            Nao vendemos simplesmente software.
          </h2>

          <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6, margin: 0 }}>
            Nao somos apenas:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '400px' }}>
            {NOT_JUST.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: '17px', color: '#0a1c42', margin: '8px 0 0',
          }}>
            Construimos e operamos o sistema que liga tudo.
          </p>

          {/* Pillars */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '8px' }}>
            {PILLARS.map((pillar, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  padding: '8px 16px',
                  background: '#F8FAFF',
                  border: '1.5px solid #e8edf5',
                  borderRadius: '100px',
                  fontFamily: 'Sora, sans-serif', fontWeight: 600,
                  fontSize: '13px', color: '#0a1c42',
                }}>
                  {pillar}
                </span>
                {i < PILLARS.length - 1 && (
                  <span style={{ color: '#217FF1', fontSize: '16px', fontWeight: 300 }}>*</span>
                )}
              </div>
            ))}
          </div>

          <div style={{
            padding: '20px 28px',
            background: '#06142e', border: '1px solid rgba(33,127,241,0.2)',
            borderRadius: '14px', marginTop: '8px',
          }}>
            <p style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: '15px', color: '#5aabff', lineHeight: 1.5, margin: 0,
            }}>
              A tecnologia e o meio. A reuniao qualificada e o resultado.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
