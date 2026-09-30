import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', title: 'Diagnosticar', desc: 'Mapeamos o processo e identificamos os principais gargalos.' },
  { num: '02', title: 'Construir', desc: 'Definimos logica, mensagens, qualificacao, automacoes e integracoes.' },
  { num: '03', title: 'Implementar', desc: 'Ligamos o sistema as ferramentas que ja utiliza.' },
  { num: '04', title: 'Operar', desc: 'Executamos o processo e acompanhamos as conversas.' },
  { num: '05', title: 'Otimizar', desc: 'Medimos os resultados e melhoramos continuamente.' },
]

const TIMELINE = ['Diagnostico', 'Build', 'Launch', 'Operacao', 'Optimizacao']

export default function AilyxIncludes() {
  const contentRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: contentRef.current, start: 'top 78%', once: true },
      })
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#06142e', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid rgba(33,127,241,0.15)' }}>
      <div className="ayl-container">
        <div ref={contentRef} style={{ maxWidth: '680px', margin: '0 auto 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div style={{
            alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(33,127,241,0.18)', border: '1px solid rgba(33,127,241,0.3)',
            borderRadius: '100px', padding: '5px 14px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#90c8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Done-for-you
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(22px, 2.8vw, 38px)',
            color: '#fff', lineHeight: 1.12, letterSpacing: '-0.04em', margin: 0,
          }}>
            Nao precisa de aprender IA. Nos fazemos o trabalho.
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
            A Reminder nao e mais uma ferramenta para a sua equipa configurar e gerir. Nos construimos, operamos e otimizamos o sistema.
          </p>
        </div>

        <div ref={gridRef} style={{
          display: 'flex', flexDirection: 'column',
          gap: '12px', maxWidth: '640px', margin: '0 auto 40px',
        }}>
          {STEPS.map((item, i) => (
            <div key={i} style={{
              padding: '22px 24px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              display: 'flex', alignItems: 'flex-start', gap: '16px',
            }}>
              <span style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 800,
                fontSize: '14px', color: '#5aabff',
                minWidth: '28px', flexShrink: 0,
              }}>
                {item.num}
              </span>
              <div>
                <h3 style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: '16px', color: '#fff', margin: '0 0 4px',
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline visual */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {TIMELINE.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                padding: '6px 14px',
                background: 'rgba(90,171,255,0.1)',
                border: '1px solid rgba(90,171,255,0.2)',
                borderRadius: '100px',
                fontFamily: 'Sora, sans-serif', fontWeight: 600,
                fontSize: '11px', color: '#5aabff',
              }}>
                {label}
              </span>
              {i < TIMELINE.length - 1 && (
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M1 5h12M10 1l4 4-4 4" stroke="#5aabff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center', fontFamily: 'Sora, sans-serif', fontWeight: 700,
          fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: 0,
        }}>
          Nao precisa de construir a infraestrutura. Nos tratamos disso.
        </p>
      </div>
    </section>
  )
}
