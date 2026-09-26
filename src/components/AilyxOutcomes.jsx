import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const OUTCOMES = [
  'Mais conversas com potenciais clientes.',
  'Mais reuniões qualificadas.',
  'Mais oportunidades no pipeline.',
  'Mais capacidade comercial sem contratar proporcionalmente mais pessoas.',
]

export default function AilyxOutcomes() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: contentRef.current, start: 'top 78%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#06142e', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid rgba(33,127,241,0.15)' }}>
      <div className="ayl-container">
        <div ref={contentRef} style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '28px' }}>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(33,127,241,0.18)', border: '1px solid rgba(33,127,241,0.3)',
            borderRadius: '100px', padding: '5px 14px', alignSelf: 'center',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#90c8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              O resultado que procura
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(26px, 3.2vw, 44px)',
            color: '#fff', lineHeight: 1.1, letterSpacing: '-0.04em', margin: 0,
          }}>
            Não queremos que tenha mais emails enviados.
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
            Queremos que tenha:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {OUTCOMES.map((item, i) => (
              <div key={i} style={{
                padding: '16px 24px',
                background: 'rgba(33,127,241,0.08)',
                border: '1px solid rgba(33,127,241,0.2)',
                borderRadius: '12px',
              }}>
                <p style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: '16px', color: '#fff', margin: 0, lineHeight: 1.4,
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '8px',
            padding: '24px 28px',
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
          }}>
            <p style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#5aabff', lineHeight: 1.4, margin: 0,
            }}>
              A sua equipa passa mais tempo a vender e menos tempo a procurar quem vender.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
