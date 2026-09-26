import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AilyxHero() {
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = contentRef.current
      if (!el) return
      const siblings = Array.from(el.children)
      gsap.fromTo(siblings,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, ease: 'power3.out', stagger: 0.11, delay: 0.2 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#06102a',
      overflowX: 'hidden',
    }}>

      {/* Animated mesh background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '60%', height: '80%',
          background: 'radial-gradient(ellipse, rgba(33,127,241,0.35) 0%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'blob1 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '5%',
          width: '55%', height: '70%',
          background: 'radial-gradient(ellipse, rgba(14,60,160,0.4) 0%, transparent 65%)',
          filter: 'blur(80px)',
          animation: 'blob2 10s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '20%',
          width: '30%', height: '40%',
          background: 'radial-gradient(ellipse, rgba(100,180,255,0.15) 0%, transparent 65%)',
          filter: 'blur(40px)',
          animation: 'blob3 12s ease-in-out infinite',
        }} />
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        {/* Top edge glow */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(100,180,255,0.7) 40%, rgba(33,127,241,0.4) 70%, transparent)',
        }} />
      </div>

      {/* Main content — centered */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 'calc(var(--nav-h, 72px) + 32px) 0 48px',
        position: 'relative',
        zIndex: 2,
      }}>
        <div className="ayl-container">
          <div ref={contentRef} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center',
            gap: '24px', maxWidth: '780px', margin: '0 auto',
          }}>

            <h1 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800,
              fontSize: 'clamp(30px, 4.5vw, 58px)',
              letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#fff', margin: 0,
            }}>
              Descubra Como Transformar Mais Leads em Reuniões{' '}
              <span style={{ color: '#5aabff' }}>
                — Grátis e em Menos de 60 Segundos.
              </span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: 1.65, maxWidth: '540px', margin: 0 }}>
              Responda a algumas perguntas e receba o seu Roadmap Personalizado de Conversão, com os principais pontos onde está a perder oportunidades e o que deve fazer para os corrigir.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/diagnostico" className="ayl-btn ayl-btn--primary" style={{ fontSize: '17px', padding: '18px 40px' }}>
                Receber o Meu Roadmap Grátis →
              </a>
            </div>

            <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}>
              Grátis · Personalizado · 14 perguntas · Resultados instantâneos · Sem compromisso
            </span>

            {/* Mobile-only logo strip */}
            <MobileLogoStrip />

          </div>
        </div>
      </div>
    </section>
  )
}

const LOGOS = [
  { src: '/logo_rdpower.png',        alt: 'RD Power Nutrition' },
  { src: '/logo_nrtechsolucion.png', alt: 'NR Techsolución' },
  { src: '/logo_jpcrodrigues.png',   alt: 'JPC Rodrigues' },
  { src: '/logo_jj_bespoke.png',     alt: 'J&J Bespoke Travel' },
]

function MobileLogoStrip() {
  const items = [...LOGOS, ...LOGOS]
  return (
    <div className="hero-mobile-proof" style={{
      display: 'none',
      flexDirection: 'column',
      gap: '12px',
      marginTop: '8px',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 auto' }}>
        Empresas que já confiam na Reminder
      </p>
      <div className="logo-ticker__track-wrap hero-logo-single">
        <div className="logo-ticker__track">
          {items.map((l, i) => (
            <div key={i} className="logo-ticker__item">
              <img src={l.src} alt={l.alt} className="logo-ticker__img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
