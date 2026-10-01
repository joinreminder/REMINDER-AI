import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import LogoTicker from './LogoTicker'

const LOGOS = [
  { src: '/logo_rdpower.png',        alt: 'RD Power Nutrition' },
  { src: '/logo_nrtechsolucion.png', alt: 'NR Techsolución' },
  { src: '/logo_jpcrodrigues.png',   alt: 'JPC Rodrigues' },
  { src: '/logo_jj_bespoke.png',     alt: 'J&J Bespoke Travel' },
]

const FEED = [
  { icon: '\u2713', color: '#4ade80', label: 'Reunião marcada', name: 'Pedro Costa', co: 'SalesHub', time: 'Amanhã 14:30' },
  { icon: '\u2192', color: '#5aabff', label: 'Lead qualificado', name: 'Ana Ferreira', co: 'CloudSys', time: 'há 2 min' },
  { icon: '\u2197', color: '#f59e0b', label: 'Follow-up #3 enviado', name: 'Maria Santos', co: 'DataPro', time: 'há 5 min' },
  { icon: '\u25CF', color: '#5aabff', label: 'Lead contactado', name: 'João Silva', co: 'TechCorp', time: 'há 12 min' },
]

export default function AilyxHero() {
  const contentRef = useRef(null)
  const mockupRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(Array.from(contentRef.current.children),
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.09, delay: 0.2 }
        )
      }
      if (mockupRef.current) {
        gsap.fromTo(mockupRef.current,
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.5 }
        )
        const items = mockupRef.current.querySelectorAll('.hero-feed-item')
        if (items.length) {
          gsap.fromTo(items,
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12, delay: 0.9 }
          )
        }
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      background: '#06102a', overflowX: 'hidden',
    }}>
      {/* Animated mesh background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '80%', background: 'radial-gradient(ellipse, rgba(33,127,241,0.35) 0%, transparent 65%)', filter: 'blur(60px)', animation: 'blob1 8s ease-in-out infinite', willChange: 'transform' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '5%', width: '55%', height: '70%', background: 'radial-gradient(ellipse, rgba(14,60,160,0.4) 0%, transparent 65%)', filter: 'blur(80px)', animation: 'blob2 10s ease-in-out infinite', willChange: 'transform' }} />
        <div style={{ position: 'absolute', top: '30%', right: '20%', width: '30%', height: '40%', background: 'radial-gradient(ellipse, rgba(100,180,255,0.15) 0%, transparent 65%)', filter: 'blur(40px)', animation: 'blob3 12s ease-in-out infinite', willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(100,180,255,0.7) 40%, rgba(33,127,241,0.4) 70%, transparent)' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 'calc(var(--nav-h, 72px) + 72px) 0 48px', position: 'relative', zIndex: 2 }}>
        <div className="ayl-container">
          <div className="ayl-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>

            {/* Left — Copy */}
            <div ref={contentRef} className="ayl-hero-content-col" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

              {/* Urgency badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
                borderRadius: '100px', padding: '6px 16px', alignSelf: 'flex-start',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', flexShrink: 0, animation: 'hero-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#4ade80', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Para empresas B2B com equipa comercial activa
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 800,
                fontSize: 'clamp(30px, 4.5vw, 52px)',
                letterSpacing: '-0.04em', lineHeight: 1.08,
                color: '#fff', margin: 0,
              }}>
                Mais reuniões qualificadas.{' '}
                <span style={{ color: '#5aabff' }}>Sem aumentar a sua equipa comercial.</span>
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.7, maxWidth: '520px', margin: 0 }}>
                A Reminder constrói e opera o seu motor de outbound — encontra os decisores certos, contacta-os, faz o follow-up e agenda reuniões qualificadas directamente no calendário da sua equipa.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a href="/roadmap" className="ayl-btn ayl-btn--primary" style={{ fontSize: '15px', padding: '18px 36px' }}>
                  RECEBER O MEU ROADMAP →
                </a>
              </div>

              <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', lineHeight: 1.6 }}>
                Gratuito · 60 segundos · Diagnóstico personalizado · Sem compromisso
              </span>

            </div>

            {/* Right — Pipeline Mockup */}
            <div ref={mockupRef} className="ayl-hero-mockup" style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '120%', height: '120%',
                background: 'radial-gradient(ellipse, rgba(33,127,241,0.18) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none',
              }} />

              <div style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}>
                {/* Header */}
                <div style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/logotipo-editado.png" alt="" width={22} height={22} style={{ width: 22, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
                    <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                      Pipeline Reminder
                    </span>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '4px 10px',
                    background: 'rgba(74,222,128,0.12)',
                    border: '1px solid rgba(74,222,128,0.25)',
                    borderRadius: '100px',
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#4ade80',
                      animation: 'hero-pulse 2s ease-in-out infinite',
                    }} />
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#4ade80', letterSpacing: '0.08em' }}>LIVE</span>
                  </div>
                </div>

                {/* Feed items */}
                <div style={{ padding: '4px 0' }}>
                  {FEED.map((item, i) => (
                    <div key={i} className="hero-feed-item" style={{
                      padding: '12px 20px',
                      borderBottom: i < FEED.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      background: i === 0 ? 'rgba(74,222,128,0.04)' : 'transparent',
                    }}>
                      <span style={{
                        width: 28, height: 28, borderRadius: '8px',
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', color: item.color, fontWeight: 700,
                        flexShrink: 0, marginTop: '1px',
                      }}>{item.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: '2px' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                          {item.name} · {item.co}
                        </div>
                      </div>
                      <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap', marginTop: '2px' }}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom stats */}
                <div style={{
                  padding: '14px 20px',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px',
                  background: 'rgba(33,127,241,0.04)',
                }}>
                  {[
                    { value: '87%', label: 'Contactados' },
                    { value: '14', label: 'Reuniões' },
                    { value: '5 min', label: 'Resposta' },
                  ].map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '16px', color: '#5aabff' }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Tagline — centered below */}
          <p style={{
            color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.65,
            maxWidth: '580px', margin: '36px auto 0', fontWeight: 600, textAlign: 'center',
          }}>
            Nós tratamos de tudo antes da reunião. A sua equipa entra para vender.
          </p>
        </div>
      </div>

      {/* Logo ticker — inside hero, always visible above the fold */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <LogoTicker />
      </div>
    </section>
  )
}
