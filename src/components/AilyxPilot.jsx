import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INCLUDES = [
  'Diagnóstico completo do processo comercial actual',
  'Implementação do sistema de IA (inbound e/ou outbound)',
  'Operação completa durante 30 dias — prospeção, follow-up, qualificação',
  'Integração com o CRM e ferramentas que já utiliza',
  'Reuniões qualificadas entregues directamente à equipa comercial',
  'Relatório de resultados com pipeline gerado',
]

const ASKS = [
  'Alinhamento semanal de 30 minutos',
  'Acesso à equipa comercial para contexto inicial',
  'Um testemunho honesto depois de ver os resultados — é tudo o que pedimos',
]

/* ─── 30-day Timeline ────────────────────────────────────────────────── */

const PHASES = [
  {
    day: 'Dia 1',
    label: 'Diagnóstico',
    desc: 'Mapeamos o processo e identificamos o bloqueio principal.',
    color: '#5aabff',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    day: 'Dias 2–7',
    label: 'Construir',
    desc: 'Criamos sequências, fluxos e automações integradas com o vosso stack.',
    color: '#a78bfa',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    day: 'Dias 8–28',
    label: 'Operar',
    desc: 'Executamos diariamente — prospeção, follow-up, qualificação, reuniões.',
    color: '#f59e0b',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    day: 'Dia 30',
    label: 'Resultados',
    desc: 'Reuniões entregues, pipeline gerado e relatório completo.',
    color: '#4ade80',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
]

function PilotTimeline() {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto 52px', padding: '0 4px' }}>

      {/* Desktop: horizontal */}
      <div className="pilot-timeline-desktop" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', position: 'relative' }}>

        {/* Connecting line */}
        <div style={{
          position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 2,
          background: 'linear-gradient(90deg, rgba(90,171,255,0.4), rgba(167,139,250,0.4), rgba(245,158,11,0.4), rgba(74,222,128,0.4))',
          zIndex: 0,
        }} />

        {PHASES.map((phase, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 8px' }}>

            {/* Icon circle */}
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: `${phase.color}15`,
              border: `2px solid ${phase.color}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: phase.color,
              boxShadow: `0 0 20px ${phase.color}20`,
              marginBottom: 14,
              background: `linear-gradient(135deg, ${phase.color}18, ${phase.color}08)`,
            }}>
              {phase.icon}
            </div>

            {/* Day badge */}
            <span style={{
              display: 'inline-block',
              padding: '3px 10px',
              background: `${phase.color}18`,
              border: `1px solid ${phase.color}35`,
              borderRadius: '100px',
              fontSize: '10px', fontWeight: 700, color: phase.color,
              letterSpacing: '0.05em', marginBottom: 8,
            }}>
              {phase.day}
            </span>

            {/* Label */}
            <div style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: '14px', color: '#fff', marginBottom: 6,
            }}>
              {phase.label}
            </div>

            {/* Desc */}
            <p style={{
              fontSize: '12px', color: 'rgba(255,255,255,0.40)',
              lineHeight: 1.55, margin: 0,
            }}>
              {phase.desc}
            </p>

          </div>
        ))}
      </div>

    </div>
  )
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function AilyxPilot() {
  const headRef     = useRef(null)
  const timelineRef = useRef(null)
  const leftRef     = useRef(null)
  const rightRef    = useRef(null)
  const ctaRef      = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: headRef.current, start: 'top 78%', once: true },
      })
      if (timelineRef.current) {
        gsap.from(Array.from(timelineRef.current.children[0].children), {
          y: 24, opacity: 0, scale: 0.95, duration: 0.6, ease: 'back.out(1.3)', stagger: 0.12,
          scrollTrigger: { trigger: timelineRef.current, start: 'top 82%', once: true },
        })
      }
      gsap.from(leftRef.current.children, {
        x: -24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06,
        scrollTrigger: { trigger: leftRef.current, start: 'top 82%', once: true },
      })
      gsap.from(rightRef.current.children, {
        x: 24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06,
        scrollTrigger: { trigger: rightRef.current, start: 'top 82%', once: true },
      })
      gsap.from(ctaRef.current, {
        y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      background: 'linear-gradient(160deg, #06102a 0%, #0b1f4a 50%, #06102a 100%)',
      padding: 'clamp(80px, 10vw, 120px) 0',
      borderTop: '1px solid rgba(33,127,241,0.2)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(33,127,241,0.1) 0%, transparent 65%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />

      <div className="ayl-container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '20px',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', animation: 'hero-pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#4ade80', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Piloto Gratuito — Clientes Fundadores
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 800,
            fontSize: 'clamp(26px, 3.5vw, 46px)',
            color: '#fff', lineHeight: 1.1, letterSpacing: '-0.04em', margin: '0 0 16px',
          }}>
            Implementamos na vossa empresa.<br />
            <span style={{ color: '#5aabff' }}>Sem custo. Sem risco.</span>
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', maxWidth: '580px', margin: '0 auto', lineHeight: 1.65 }}>
            Se o roadmap revelar uma oportunidade clara, avançamos com um piloto de 30 dias — construímos e operamos o sistema completo sem qualquer investimento da vossa parte.
          </p>
        </div>

        {/* ── 30-day Timeline ── */}
        <div ref={timelineRef}>
          <PilotTimeline />
        </div>

        {/* Two columns */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '20px', maxWidth: '860px', margin: '0 auto 48px',
        }} className="ayl-pilot-grid">

          {/* Left — O que inclui */}
          <div ref={leftRef} style={{
            padding: '28px',
            background: 'rgba(33,127,241,0.07)',
            border: '1px solid rgba(33,127,241,0.18)',
            borderRadius: '20px',
          }}>
            <div style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '11px',
              color: '#5aabff', letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              O que inclui
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {INCLUDES.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '6px', flexShrink: 0, marginTop: '1px',
                    background: 'rgba(33,127,241,0.15)', border: '1px solid rgba(33,127,241,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', color: '#5aabff', fontWeight: 800,
                  }}>✓</span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — O que pedimos + disclaimer */}
          <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              padding: '28px',
              background: 'rgba(74,222,128,0.05)',
              border: '1px solid rgba(74,222,128,0.15)',
              borderRadius: '20px', flex: 1,
            }}>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '11px',
                color: '#4ade80', letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                O que pedimos em troca
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {ASKS.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '6px', flexShrink: 0, marginTop: '1px',
                      background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px', color: '#4ade80', fontWeight: 800,
                    }}>→</span>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: '18px 22px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px',
            }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0 }}>
                Não pedimos dinheiro. Não pedimos exclusividade. Em troca do piloto gratuito, só pedimos o vosso feedback honesto depois de ver os resultados.
              </p>
            </div>
          </div>
        </div>

        {/* CTA block */}
        <div ref={ctaRef} style={{
          maxWidth: '520px', margin: '0 auto', textAlign: 'center',
          padding: '36px 40px',
          background: 'rgba(33,127,241,0.08)',
          border: '1px solid rgba(33,127,241,0.25)',
          borderRadius: '22px',
          boxShadow: '0 0 80px rgba(33,127,241,0.07)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px', padding: '4px 12px', marginBottom: '16px',
          }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
              Vagas disponíveis: limitadas
            </span>
          </div>

          <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', margin: '0 0 8px', lineHeight: 1.4 }}>
            A candidatura começa pelo Roadmap gratuito.
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '0 0 24px', lineHeight: 1.55 }}>
            60 segundos para perceber se somos a escolha certa — e se houver fit, avançamos sem custos.
          </p>

          <a href="/roadmap" style={{
            display: 'inline-flex', alignItems: 'center',
            background: '#217FF1', color: '#fff',
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: '15px', padding: '18px 40px',
            borderRadius: '14px', textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(33,127,241,0.45)',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(33,127,241,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(33,127,241,0.45)' }}
          >
            CANDIDATAR-ME AO PILOTO →
          </a>

          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.22)', marginTop: '14px' }}>
            Gratuito · Sem compromisso · Resultados em 30 dias
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .ayl-pilot-grid          { grid-template-columns: 1fr !important; }
          .pilot-timeline-desktop  { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 400px) {
          .pilot-timeline-desktop  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
