import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHECKLIST = [
  'Onde pode estar a perder oportunidades',
  'Qual é o seu principal bottleneck',
  'O que deve corrigir primeiro',
  'Como deveria estar estruturado o processo',
  'Qual é o próximo passo recomendado',
]

export default function AilyxSolution() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 76%', once: true },
      })
      if (listRef.current) {
        gsap.from(listRef.current.children, {
          y: 16, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06,
          scrollTrigger: { trigger: listRef.current, start: 'top 82%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid #e8edf5' }} id="mechanism">
      <div className="ayl-container">

        {/* ── Header ── */}
        <div ref={headRef} style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#EEF4FF', border: '1px solid rgba(33,127,241,0.2)',
            borderRadius: '100px', padding: '5px 14px', marginBottom: '20px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#217FF1', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Roadmap Gratuito
            </span>
          </div>
          <h2 className="ayl-h2" style={{ color: '#0a1c42', marginBottom: '24px' }}>
            Descubra exatamente onde está o seu maior gargalo de conversão.
          </h2>
          <p style={{
            fontSize: '16px', color: '#555',
            lineHeight: 1.7, margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
          }}>
            O Roadmap Personalizado de Conversão analisa o seu processo atual e identifica as áreas onde existe maior oportunidade de melhorar a passagem de:
          </p>
          <div style={{
            padding: '22px 32px',
            background: '#F8FAFF',
            border: '1.5px solid #e8edf5',
            borderRadius: '14px',
            marginTop: '24px',
          }}>
            <p style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: 'clamp(17px, 2vw, 22px)',
              color: '#217FF1', lineHeight: 1.4, margin: 0,
            }}>
              Lead &rarr; Reunião
            </p>
          </div>
        </div>

        {/* ── Checklist ── */}
        <div ref={listRef} style={{
          display: 'flex', flexDirection: 'column', gap: '0',
          maxWidth: '600px', margin: '0 auto 40px',
        }}>
          {CHECKLIST.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '100%',
                padding: '20px 28px',
                background: '#F8FAFF',
                border: '1.5px solid #e8edf5',
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', gap: '16px',
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: '#217FF1', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7.5L5.5 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 600,
                  fontSize: '15px',
                  color: '#0a1c42',
                }}>
                  {item}
                </span>
              </div>
              {i < CHECKLIST.length - 1 && (
                <svg width="12" height="24" viewBox="0 0 12 24" fill="none" style={{ margin: '4px 0', flexShrink: 0 }}>
                  <path d="M6 0v20M2 16l4 4 4-4" stroke="#217FF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
                </svg>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
