import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const trustItems = ['Gratuito', '60 minutos', 'Sem compromisso', '4 vagas por mês', 'Análise honesta']

export default function RFinalCta() {
  const navigate   = useNavigate()
  const sectionRef = useRef(null)
  const innerRef   = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.fromTo(innerRef.current.children,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: innerRef.current, start: 'top 78%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, #040e22 0%, #071635 55%, #0a1c42 100%)',
        padding: 'clamp(100px, 12vw, 140px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: 'radial-gradient(circle, rgba(33,127,241,0.5) 1px, transparent 1px)',
        backgroundSize: '48px 48px', pointerEvents: 'none',
      }} />
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw', height: '80vw',
        background: 'radial-gradient(circle, rgba(33,127,241,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="ayl-container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={innerRef} style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(33,127,241,0.15)',
            border: '1px solid rgba(33,127,241,0.3)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '32px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#90c8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Revenue & Capacity Map — Gratuito
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 60px)',
            color: '#fff', lineHeight: 1.1,
            letterSpacing: '-0.05em', marginBottom: '24px',
          }}>
            O diagnóstico é gratuito.<br />O custo de não o fazer,{' '}
            <em style={{ color: '#90c8ff', fontStyle: 'normal' }}>não é.</em>
          </h2>

          <p style={{
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75, marginBottom: '40px',
            maxWidth: '520px', margin: '0 auto 40px',
          }}>
            Em 60 minutos mapeamos onde a empresa está a perder receita, tempo e capacidade. Se não encontrarmos uma oportunidade concreta, dizemos-lhe — sem rodeios.
          </p>

          <button
            className="ayl-btn"
            style={{
              background: '#217FF1', color: '#fff', border: 'none',
              borderRadius: '14px', padding: '18px 40px',
              fontSize: '16px', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Sora, sans-serif', letterSpacing: '-0.02em',
              boxShadow: '0 8px 40px rgba(33,127,241,0.4)',
              marginBottom: '28px',
            }}
            onClick={() => navigate('/diagnostico')}
          >
            Ver onde estou a perder capacidade →
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '24px', flexWrap: 'wrap',
          }}>
            {trustItems.map((item, i) => (
              <span key={i} style={{
                fontSize: '12px', color: 'rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                {i > 0 && <span style={{ opacity: 0.3 }}>·</span>}
                {item}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
