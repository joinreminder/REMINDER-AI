import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const before = [
  'Mais volume de negócio',
  '→ Mais trabalho manual',
  '→ Mais pressão sobre a equipa',
  '→ Mais contratações necessárias',
  '→ Custos estruturais aumentam',
  '→ Crescimento caro e difícil de escalar',
]

const after = [
  'Mais volume de negócio',
  '→ Processos absorvem parte do crescimento',
  '→ Equipa liberta capacidade',
  '→ Menos receita perdida',
  '→ Estrutura cresce menos que a receita',
  '→ Margem melhora com o crescimento',
]

export default function RTransform() {
  const navigate   = useNavigate()
  const headRef    = useRef(null)
  const compareRef = useRef(null)
  const ctaRef     = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      })
      Array.from(compareRef.current.children).forEach((col, i) => {
        gsap.from(col, {
          x: i === 0 ? -32 : 32, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: col, start: 'top 82%', once: true },
        })
      })
      gsap.from(ctaRef.current, {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0' }}>
      <div className="ayl-container">

        {/* Header */}
        <div ref={headRef} style={{ maxWidth: '720px', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
          <div className="ayl-section-label" style={{ marginBottom: '20px' }}>A Diferença</div>
          <h2 className="ayl-h2" style={{ marginBottom: '20px' }}>
            O objetivo não é ter mais automações.<br />É crescer sem aumentar os custos estruturais na mesma proporção.
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: '#666', lineHeight: 1.75, maxWidth: '560px' }}>
            A maioria das empresas de serviços cresce contratando pessoas para absorver mais trabalho. Existe outro caminho — mas exige saber primeiro onde está a ineficiência.
          </p>
        </div>

        {/* Before / After */}
        <div ref={compareRef} className="r-cols-2" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: 'clamp(40px, 5vw, 56px)',
        }}>
          {/* Before */}
          <div style={{
            background: '#fff9f9',
            border: '1px solid rgba(248,113,113,0.2)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(248,113,113,0.15)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f87171', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Modelo Actual
              </span>
            </div>
            <div style={{ padding: 'clamp(20px, 2.5vw, 28px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {before.map((line, i) => (
                <p key={i} style={{
                  fontSize: '14px', color: i === 0 ? '#111' : '#555',
                  lineHeight: 1.5, margin: 0,
                  fontWeight: i === 0 ? 600 : 400,
                  fontFamily: i === 0 ? 'Sora, sans-serif' : 'Inter, sans-serif',
                  letterSpacing: i === 0 ? '-0.02em' : 'normal',
                }}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* After */}
          <div style={{
            background: '#f0fdf4',
            border: '1px solid rgba(74,222,128,0.25)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(74,222,128,0.2)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Com a Remindr
              </span>
            </div>
            <div style={{ padding: 'clamp(20px, 2.5vw, 28px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {after.map((line, i) => (
                <p key={i} style={{
                  fontSize: '14px', color: i === 0 ? '#111' : '#166534',
                  lineHeight: 1.5, margin: 0,
                  fontWeight: i === 0 ? 600 : 400,
                  fontFamily: i === 0 ? 'Sora, sans-serif' : 'Inter, sans-serif',
                  letterSpacing: i === 0 ? '-0.02em' : 'normal',
                }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ textAlign: 'center' }}>
          <button
            className="ayl-btn"
            style={{
              background: '#217FF1', color: '#fff', border: 'none',
              borderRadius: '12px', padding: '15px 32px',
              fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Sora, sans-serif', letterSpacing: '-0.01em',
              boxShadow: '0 6px 24px rgba(33,127,241,0.28)',
            }}
            onClick={() => navigate('/diagnostico')}
          >
            Ver onde estou a perder capacidade →
          </button>
        </div>

      </div>
    </section>
  )
}
