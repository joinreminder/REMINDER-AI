import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const deliverables = [
  { icon: '🔍', label: 'Mapa de fugas', desc: 'Onde está a perder receita, tempo e capacidade — por ordem de impacto económico.' },
  { icon: '💰', label: 'Estimativa económica', desc: 'O valor potencial de cada oportunidade, calculado no contexto da sua empresa.' },
  { icon: '🎯', label: 'Top 1–3 prioridades', desc: 'As oportunidades com maior impacto e maior viabilidade de implementação.' },
  { icon: '🛠', label: 'Plano de implementação', desc: 'O que construiríamos primeiro, como funciona e o resultado esperado.' },
]

const dimensions = ['Receita', 'Pessoas', 'Processos', 'Operações', 'Sistemas']

export default function RDiagnostico() {
  const navigate  = useNavigate()
  const headRef   = useRef(null)
  const offerRef  = useRef(null)
  const footRef   = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      })
      gsap.from(offerRef.current, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: offerRef.current, start: 'top 82%', once: true },
      })
      gsap.from(footRef.current.children, {
        y: 24, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: footRef.current, start: 'top 84%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#F4F7FB', padding: 'clamp(80px, 10vw, 120px) 0' }} id="diagnostico">
      <div className="ayl-container">

        {/* Header */}
        <div ref={headRef} style={{ maxWidth: '680px', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
          <div className="ayl-section-label" style={{ marginBottom: '20px' }}>Revenue & Capacity Map</div>
          <h2 className="ayl-h2" style={{ marginBottom: '20px' }}>
            Antes de construir qualquer coisa,<br />descobrimos onde está o dinheiro.
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: '#666', lineHeight: 1.75, maxWidth: '540px' }}>
            Em 60 minutos analisamos o funcionamento real da sua empresa — receita, pessoas, processos, operações e sistemas — e identificamos as 1–3 oportunidades com maior impacto económico.
          </p>
        </div>

        {/* Offer card */}
        <div ref={offerRef} style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: 'clamp(32px, 4vw, 48px)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
        }}>
          <div style={{
            padding: '18px 28px',
            background: '#EEF4FF',
            borderBottom: '1px solid rgba(33,127,241,0.12)',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#217FF1', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              O que recebe — incluído no diagnóstico gratuito
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'rgba(0,0,0,0.05)',
          }}>
            {deliverables.map((d, i) => (
              <div key={i} style={{
                background: '#fff',
                padding: 'clamp(20px, 2.5vw, 30px)',
                display: 'flex', alignItems: 'flex-start', gap: '16px',
              }}>
                <span style={{ fontSize: '22px', flexShrink: 0, marginTop: '2px' }}>{d.icon}</span>
                <div>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '15px', color: '#111', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                    {d.label}
                  </p>
                  <p style={{ fontSize: '13.5px', color: '#666', lineHeight: 1.65, margin: 0 }}>
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dimensions + CTA */}
        <div ref={footRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#999', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
              O que analisamos:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {dimensions.map((d, i) => (
                <span key={i} style={{
                  fontSize: '13px', fontWeight: 600, color: '#217FF1',
                  background: '#EEF4FF', border: '1px solid rgba(33,127,241,0.2)',
                  borderRadius: '100px', padding: '5px 14px',
                }}>
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: '#555' }}>4 diagnósticos disponíveis por mês</span>
            </div>
            <button
              className="ayl-btn"
              style={{
                background: '#217FF1', color: '#fff', border: 'none',
                borderRadius: '12px', padding: '15px 28px',
                fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Sora, sans-serif', letterSpacing: '-0.01em',
                boxShadow: '0 6px 24px rgba(33,127,241,0.28)',
              }}
              onClick={() => navigate('/diagnostico')}
            >
              Fazer o Revenue & Capacity Map →
            </button>
            <span style={{ fontSize: '12px', color: '#999' }}>Gratuito · 60 min · Sem compromisso</span>
          </div>
        </div>

      </div>
    </section>
  )
}
