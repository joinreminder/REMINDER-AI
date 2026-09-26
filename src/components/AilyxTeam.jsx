import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', label: 'Responda', desc: 'Responda a 14 perguntas sobre a sua empresa e o seu processo atual. Leva menos de 60 segundos.' },
  { num: '02', label: 'Receba', desc: 'As suas respostas são analisadas para identificar os principais pontos de oportunidade.' },
  { num: '03', label: 'Descubra', desc: 'Receba o seu Roadmap Personalizado e veja onde deve concentrar os seus esforços primeiro.' },
]

export default function AilyxTeam() {
  const sectionRef = useRef(null)
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
    <section ref={sectionRef} style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid #e8edf5' }}>
      <div className="ayl-container">
        <div ref={contentRef} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* Badge */}
          <div style={{ marginBottom: '16px' }}>
            <div className="ayl-section-label" style={{ display: 'inline-block' }}>3 passos</div>
          </div>

          {/* Title */}
          <h2 className="ayl-h2" style={{ color: '#0a1c42', marginBottom: '40px' }}>
            Como funciona
          </h2>

          {/* Steps */}
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '100%',
                padding: '28px 28px',
                background: '#F8FAFF',
                border: '1.5px solid #e8edf5',
                borderRadius: '16px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 800,
                  fontSize: '12px', letterSpacing: '0.1em',
                  color: '#217FF1', marginBottom: '8px',
                }}>
                  {step.num}
                </div>
                <div style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: 'clamp(17px, 2vw, 20px)',
                  color: '#0a1c42', marginBottom: '8px',
                }}>
                  {step.label}
                </div>
                <p style={{
                  fontSize: '14px', color: '#666',
                  lineHeight: 1.55, margin: 0,
                  maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto',
                }}>
                  {step.desc}
                </p>
              </div>

              {/* Arrow between steps */}
              {i < STEPS.length - 1 && (
                <svg width="16" height="28" viewBox="0 0 16 28" fill="none" style={{ margin: '8px 0' }}>
                  <path d="M8 0v22M3 18l5 5 5-5" stroke="#217FF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                </svg>
              )}
            </div>
          ))}

          {/* Footer */}
          <p style={{ color: '#999', fontSize: '15px', lineHeight: 1.55, margin: '32px 0 0' }}>
            Sem chamada obrigatória. Sem cartão de crédito. Sem compromisso.
          </p>

        </div>
      </div>
    </section>
  )
}
