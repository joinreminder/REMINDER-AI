import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  {
    title: 'Leads sem resposta',
    text: 'A oportunidade chega. Sem processo, fica à espera de que alguém a veja — quando a equipa tiver tempo.',
  },
  {
    title: 'Propostas esquecidas',
    text: 'Enviada. Sem follow-up. A concorrência fecha antes de você se lembrar de ligar de volta.',
  },
  {
    title: 'Horas em trabalho repetitivo',
    text: 'Copiar dados. Confirmar reuniões. Emails de rotina. Todos os dias. Sem valor acrescentado.',
  },
  {
    title: 'Informação espalhada',
    text: 'CRM, Excel, WhatsApp, email. Ninguém tem a visão completa sem ir buscar tudo manualmente.',
  },
  {
    title: 'Clientes que saem em silêncio',
    text: 'Sem processo de retenção, um cliente satisfeito é um cliente que a concorrência vai reconquistar.',
  },
  {
    title: 'Crescer obriga a contratar',
    text: 'Mais negócio, mais pessoas. A margem não melhora. O risco estrutural aumenta a cada contratação.',
  },
]

export default function RProblem() {
  const navigate  = useNavigate()
  const headRef   = useRef(null)
  const gridRef   = useRef(null)
  const closeRef  = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      })
      Array.from(gridRef.current.children).forEach((el, i) => {
        gsap.from(el, {
          y: 32, opacity: 0, duration: 0.7, ease: 'power3.out',
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        })
      })
      gsap.from(closeRef.current.children, {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: closeRef.current, start: 'top 84%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0' }}>
      <div className="ayl-container">

        {/* Header */}
        <div ref={headRef} style={{ maxWidth: '720px', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <div className="ayl-section-label" style={{ marginBottom: '20px' }}>O Problema</div>
          <h2 className="ayl-h2" style={{ marginBottom: '20px' }}>
            O problema não é falta de trabalho.<br />É que o crescimento começa a depender de mais pessoas.
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: '#666', lineHeight: 1.75, maxWidth: '580px' }}>
            Quando o negócio cresce, o instinto é contratar. Mas muitas vezes a solução não é mais pessoas — é eliminar o trabalho que a equipa actual não devia estar a fazer.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(0,0,0,0.07)',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: 'clamp(48px, 6vw, 72px)',
        }}>
          {problems.map((p, i) => (
            <div key={i} className="ayl-card--hover" style={{
              background: '#fff',
              padding: 'clamp(24px, 3vw, 36px)',
              display: 'flex', flexDirection: 'column', gap: '12px',
              transition: 'background 0.2s',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', background: '#f87171', flexShrink: 0,
              }} />
              <p style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 600,
                fontSize: 'clamp(14px, 1.4vw, 17px)',
                color: '#111', letterSpacing: '-0.02em', lineHeight: 1.3,
              }}>
                {p.title}
              </p>
              <p style={{ fontSize: '13.5px', color: '#666', lineHeight: 1.65, margin: 0 }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* Close */}
        <div ref={closeRef} style={{
          background: '#F4F7FB', borderRadius: '16px',
          padding: 'clamp(28px, 3.5vw, 44px)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap',
        }}>
          <p style={{
            fontSize: 'clamp(15px, 1.5vw, 18px)', color: '#333',
            maxWidth: '540px', lineHeight: 1.65, margin: 0,
            fontFamily: 'Sora, sans-serif', fontWeight: 500, letterSpacing: '-0.02em',
          }}>
            Antes de contratar mais pessoas, descubra quanta capacidade a sua equipa já está a perder.
          </p>
          <button
            className="ayl-btn"
            style={{
              background: '#217FF1', color: '#fff', border: 'none',
              borderRadius: '12px', padding: '15px 28px',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Sora, sans-serif', letterSpacing: '-0.01em',
              whiteSpace: 'nowrap', flexShrink: 0,
              boxShadow: '0 6px 24px rgba(33,127,241,0.3)',
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
