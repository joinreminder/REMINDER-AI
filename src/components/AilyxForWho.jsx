import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FOR_WHO = [
  'Já recebem leads regularmente',
  'Vendem através de reuniões comerciais',
  'Têm uma equipa ou responsável pelas vendas',
  'Têm capacidade para realizar novas reuniões',
  'Querem converter mais dos leads que já geram',
  'Querem perceber onde estão a perder oportunidades antes de investir ainda mais em aquisição',
]

const NOT_FOR = [
  'Ainda não gera leads',
  'Ainda está a validar a sua oferta',
  'Não tem capacidade para realizar reuniões',
  'Procura apenas uma ferramenta para enviar emails em massa',
]

export default function AilyxForWho() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 78%', once: true },
      })
      gsap.from(Array.from(leftRef.current.children), {
        y: 24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: leftRef.current, start: 'top 80%', once: true },
      })
      gsap.from(Array.from(rightRef.current.children), {
        y: 24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: rightRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#F3F6FB', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid #e8edf5' }} id="about">
      <div className="ayl-container">

        <div ref={headRef} style={{ maxWidth: '620px', marginBottom: '48px' }}>
          <div className="ayl-section-label" style={{ marginBottom: '16px' }}>Para quem é</div>
          <h2 className="ayl-h2" style={{ marginBottom: '16px', color: '#0a1c42' }}>
            Este Roadmap é para empresas que:
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }} className="ayl-forwho-grid">

          {/* Left -- for who */}
          <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FOR_WHO.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px 20px',
                background: '#fff',
                border: '1.5px solid #e8edf5',
                borderLeft: '3px solid #217FF1',
                borderRadius: '12px',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize: '14px', color: '#333', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Right -- not for */}
          <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#06142e', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Não é para si se:
                </span>
              </div>
              <div>
                {NOT_FOR.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 24px',
                    borderBottom: i < NOT_FOR.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a href="/diagnostico" className="ayl-btn ayl-btn--primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
              Receber o Meu Roadmap Grátis →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
