import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FLOW_STEPS = [
  { label: 'Lead recebida',  color: '#5aabff', left: '5.6%',  top: '7.27%',  x2: 97,  y2: 52,  dur: '2.2s', begin: '0s',   pulse: '1.5s' },
  { label: 'Contacto',       color: '#4ade80', left: '66%',   top: '4.09%',  x2: 399, y2: 38,  dur: '2.8s', begin: '0.4s', pulse: '1.8s' },
  { label: 'Follow-up',      color: '#f59e0b', left: '69.6%', top: '42.73%', x2: 417, y2: 208, dur: '1.9s', begin: '0.8s', pulse: '2.1s' },
  { label: 'Qualificação',   color: '#a78bfa', left: '64%',   top: '81.36%', x2: 389, y2: 378, dur: '2.5s', begin: '0.2s', pulse: '2.4s' },
  { label: 'Reunião',        color: '#34d399', left: '4%',    top: '82.27%', x2: 89,  y2: 382, dur: '3.1s', begin: '0.6s', pulse: '2.7s' },
]

const PAIN_POINTS = [
  'A resposta pode chegar tarde.',
  'O follow-up pode nunca acontecer.',
  'A qualificação pode ser inconsistente.',
  'E uma lead que tinha potencial pode simplesmente desaparecer.',
]

export default function AilyxServices() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const hubRef     = useRef(null)
  const cardsRef   = useRef([])

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: leftRef.current, start: 'top 75%', once: true },
      })

      gsap.fromTo(hubRef.current,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.0, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )

      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(card,
          { scale: 0.75, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)',
            delay: 0.15 + i * 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          }
        )
      })

      gsap.to(hubRef.current, { y: -8, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#06142e',
        padding: 'clamp(80px, 10vw, 120px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      {/* Glow top-right */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-5%', width: '50%', height: '80%',
        background: 'radial-gradient(rgba(33,127,241,0.12) 0%, transparent 65%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="ayl-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="ayl-services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

          {/* LEFT — copy */}
          <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(33,127,241,0.18)', border: '1px solid rgba(33,127,241,0.3)',
              borderRadius: '100px', padding: '5px 14px',
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#90c8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                O problema
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              color: '#fff', lineHeight: 1.06, letterSpacing: '-0.05em', margin: 0,
            }}>
              Está a gerar leads.<br />
              <span style={{ color: '#5aabff' }}>Mas quantos chegam realmente a uma reunião?</span>
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', margin: 0, fontFamily: 'Sora, sans-serif' }}>
              Uma lead entra. E depois?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {PAIN_POINTS.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#5aabff', flexShrink: 0, opacity: 0.6 }} />
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>

            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.65, maxWidth: '420px', margin: 0 }}>
              Muitas empresas não precisam necessariamente de mais leads. Precisam de aproveitar melhor os que já têm.
            </p>

            <p style={{ color: '#5aabff', fontSize: '16px', fontWeight: 700, margin: 0, fontFamily: 'Sora, sans-serif' }}>
              O primeiro passo é descobrir onde está o seu maior ponto de fuga.
            </p>
          </div>

          {/* RIGHT — flow visual */}
          <div className="ayl-services-visual" style={{ position: 'relative', height: '440px', width: '100%' }}>
            {/* SVG: lines + pulses + orbit rings */}
            <svg
              viewBox="0 0 500 440"
              preserveAspectRatio="xMidYMid meet"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
            >
              {FLOW_STEPS.map((ev, i) => {
                const path = `M250,220 L${ev.x2},${ev.y2}`
                return (
                  <g key={i}>
                    <line
                      x1="250" y1="220" x2={ev.x2} y2={ev.y2}
                      stroke={`${ev.color}30`} strokeWidth="1.5" strokeDasharray="5 7"
                    />
                    <circle r="3.5" fill={ev.color} opacity="0.9">
                      <animateMotion dur={ev.dur} repeatCount="indefinite" begin={ev.begin} path={path} />
                    </circle>
                    <circle r="2" fill={ev.color} opacity="0.5">
                      <animateMotion dur={ev.dur} repeatCount="indefinite" begin={`calc(${ev.begin} + ${parseFloat(ev.dur) / 2}s)`} path={path} />
                    </circle>
                  </g>
                )
              })}
              <circle cx="250" cy="220" r="68" stroke="rgba(33,127,241,0.15)" strokeWidth="1" fill="none" strokeDasharray="3 9" />
              <circle cx="250" cy="220" r="110" stroke="rgba(33,127,241,0.07)" strokeWidth="1" fill="none" />
            </svg>

            {/* Center hub */}
            <div ref={hubRef} style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 4,
            }}>
              <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', border: '1px solid rgba(33,127,241,0.25)', animation: 'robot-ring-pulse 2.5s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', inset: -36, borderRadius: '50%', border: '1px solid rgba(33,127,241,0.1)', animation: 'robot-ring-pulse 2.5s ease-in-out 0.6s infinite' }} />
              <div style={{
                width: 96, height: 96, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0e3ba0, #0a1c42)',
                border: '1.5px solid rgba(33,127,241,0.5)',
                boxShadow: '0 0 40px rgba(33,127,241,0.35), 0 0 80px rgba(33,127,241,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src="/logotipo-editado.png" alt="Logo" style={{ width: 52, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
              </div>
              <div style={{
                position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
                background: '#06142e', border: '1px solid rgba(245,158,11,0.4)',
                borderRadius: 100, padding: '2px 8px',
                display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b', animation: 'hero-pulse 2s ease-in-out infinite', flexShrink: 0 }} />
                <span style={{ fontSize: 9, fontWeight: 700, color: '#f59e0b', letterSpacing: '0.08em' }}>FUGA</span>
              </div>
            </div>

            {/* Flow step cards */}
            {FLOW_STEPS.map((ev, i) => (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                style={{
                  position: 'absolute', left: ev.left, top: ev.top,
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${ev.color}33`,
                  backdropFilter: 'blur(12px)',
                  borderRadius: '12px', padding: '9px 13px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  zIndex: 3, minWidth: '138px',
                }}
              >
                <span style={{
                  width: 26, height: 26, borderRadius: '7px',
                  background: `${ev.color}18`, border: `1px solid ${ev.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, color: ev.color, flexShrink: 0,
                  fontFamily: 'Sora, sans-serif',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#fff', fontFamily: 'Sora, sans-serif', whiteSpace: 'nowrap', flex: 1 }}>
                  {ev.label}
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color, opacity: 0.8, animation: `hero-pulse ${ev.pulse} ease-in-out infinite`, flexShrink: 0 }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
