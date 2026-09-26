import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { value: '30', suffix: 'dias', desc: 'até ao primeiro Revenue Engine operacional' },
  { value: '5x', suffix: '', desc: 'mais capacidade de outreach sem aumentar a equipa' },
  { value: '100%', suffix: '', desc: 'do funil medido — do prospect à reunião' },
  { value: '<7', suffix: 'seg', desc: 'tempo de resposta a uma lead qualificada' },
]

export default function AilyxMetrics() {
  const cardsRef = useRef([])

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          y: 24, opacity: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      background: '#06142e',
      padding: 'clamp(48px, 6vw, 72px) 0',
      borderTop: '1px solid rgba(33,127,241,0.15)',
    }}>
      <div className="ayl-container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 600,
            fontSize: '14px', color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.06em', margin: 0,
          }}>
            O Revenue Engine, em numeros.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
        }}
          className="ayl-metrics-grid"
        >
          {METRICS.map((m, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(33,127,241,0.15)',
                borderRadius: '16px',
                padding: '28px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 800,
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                color: '#5aabff',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}>
                {m.value}
                {m.suffix && (
                  <span style={{ fontSize: '0.45em', color: 'rgba(255,255,255,0.4)', marginLeft: '4px', fontWeight: 600 }}>
                    {m.suffix}
                  </span>
                )}
              </div>
              <p style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.45, marginTop: '10px', margin: '10px 0 0',
              }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
