import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FLOW_STEPS = [
  { label: 'Encontrar',     color: '#5aabff', left: '5.6%',  top: '7.27%',  x2: 97,  y2: 52,  dur: '2.2s', begin: '0s',   pulse: '1.5s' },
  { label: 'Contactar',     color: '#4ade80', left: '66%',   top: '4.09%',  x2: 399, y2: 38,  dur: '2.8s', begin: '0.4s', pulse: '1.8s' },
  { label: 'Follow-up',     color: '#f59e0b', left: '69.6%', top: '42.73%', x2: 417, y2: 208, dur: '1.9s', begin: '0.8s', pulse: '2.1s' },
  { label: 'Qualificar',    color: '#a78bfa', left: '64%',   top: '81.36%', x2: 389, y2: 378, dur: '2.5s', begin: '0.2s', pulse: '2.4s' },
  { label: 'Marcar',        color: '#34d399', left: '4%',    top: '82.27%', x2: 89,  y2: 382, dur: '3.1s', begin: '0.6s', pulse: '2.7s' },
]

const STEPS = [
  'Encontrar →',
  'Contactar →',
  'Responder →',
  'Fazer follow-up →',
  'Qualificar →',
  'Marcar',
]

const CONSEQUENCES = [
  'Prospects que nunca são contactados.',
  'Leads que deixam de receber follow-up.',
  'Oportunidades que ficam paradas no CRM.',
]

const CARDS = [
  { label: 'PROSPEÇÃO', desc: 'Decisores certos que nunca foram contactados.', color: '#5aabff' },
  { label: 'FOLLOW-UP', desc: 'Prospects que responderam mas ficaram sem acompanhamento.', color: '#4ade80' },
  { label: 'PIPELINE', desc: 'Oportunidades qualificadas que nunca chegam ao calendário.', color: '#f59e0b' },
]

export default function AilyxServices() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const hubRef = useRef(null)
  const cardsRef = useRef([])
  const bottomRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: leftRef.current, start: 'top 78%', once: true },
      })
      gsap.fromTo(hubRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0, ease: 'back.out(1.5)', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      )
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(card,
          { scale: 0.75, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 0.15 + i * 0.08, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
        )
      })
      gsap.to(hubRef.current, { y: -8, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2 })
      if (bottomRef.current) {
        gsap.from(bottomRef.current.children, {
          y: 30, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
          scrollTrigger: { trigger: bottomRef.current, start: 'top 85%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#06142e', padding: 'clamp(80px, 10vw, 120px) 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '50%', height: '80%', background: 'radial-gradient(rgba(33,127,241,0.12) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="ayl-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="ayl-services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

          {/* LEFT — copy */}
          <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
              fontSize: 'clamp(22px, 2.8vw, 38px)',
              color: '#fff', lineHeight: 1.12, letterSpacing: '-0.04em', margin: 0,
            }}>
              A sua equipa comercial não devia passar o dia a prospectar.
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
              Antes de uma reunião existir, há dezenas de tarefas operacionais que alguém tem de executar:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
              {STEPS.map((step, i) => (
                <span key={i} style={{ color: '#5aabff', fontSize: '14px', fontWeight: 600, fontFamily: 'Sora, sans-serif' }}>{step}</span>
              ))}
            </div>

            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.65, margin: 0 }}>
              Quando a equipa comercial trata de tudo — prospeção, follow-up e qualificação — o tempo disponível para fechar reduz.
            </p>

            <div style={{
              padding: '14px 20px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
            }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0 0 8px', fontWeight: 600 }}>
                O resultado?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {CONSEQUENCES.map((item, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{item}</p>
                ))}
              </div>
            </div>

            <p style={{ color: '#5aabff', fontSize: '14px', fontWeight: 700, margin: 0, fontFamily: 'Sora, sans-serif' }}>
              O problema não é a capacidade de venda da equipa. É o trabalho operacional que acontece antes de a reunião existir.
            </p>
          </div>

          {/* RIGHT — hub visual */}
          <div className="ayl-services-visual" style={{ position: 'relative', height: '440px', width: '100%' }}>
            <svg viewBox="0 0 500 440" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
              {FLOW_STEPS.map((ev, i) => {
                const path = `M250,220 L${ev.x2},${ev.y2}`
                return (
                  <g key={i}>
                    <line x1="250" y1="220" x2={ev.x2} y2={ev.y2} stroke={`${ev.color}30`} strokeWidth="1.5" strokeDasharray="5 7" />
                    <circle r="3.5" fill={ev.color} opacity="0.9"><animateMotion dur={ev.dur} repeatCount="indefinite" begin={ev.begin} path={path} /></circle>
                    <circle r="2" fill={ev.color} opacity="0.5"><animateMotion dur={ev.dur} repeatCount="indefinite" begin={`calc(${ev.begin} + ${parseFloat(ev.dur) / 2}s)`} path={path} /></circle>
                  </g>
                )
              })}
              <circle cx="250" cy="220" r="68" stroke="rgba(33,127,241,0.15)" strokeWidth="1" fill="none" strokeDasharray="3 9" />
              <circle cx="250" cy="220" r="110" stroke="rgba(33,127,241,0.07)" strokeWidth="1" fill="none" />
            </svg>

            <div ref={hubRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 4 }}>
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
            </div>

            {FLOW_STEPS.map((ev, i) => (
              <div key={i} ref={el => cardsRef.current[i] = el} style={{
                position: 'absolute', left: ev.left, top: ev.top,
                background: 'rgba(255,255,255,0.05)', border: `1px solid ${ev.color}33`,
                backdropFilter: 'blur(12px)', borderRadius: '12px', padding: '9px 13px',
                display: 'flex', alignItems: 'center', gap: '8px', zIndex: 3, minWidth: '138px',
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: '7px',
                  background: `${ev.color}18`, border: `1px solid ${ev.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, color: ev.color, flexShrink: 0, fontFamily: 'Sora, sans-serif',
                }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#fff', fontFamily: 'Sora, sans-serif', whiteSpace: 'nowrap', flex: 1 }}>{ev.label}</span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color, opacity: 0.8, animation: `hero-pulse ${ev.pulse} ease-in-out infinite`, flexShrink: 0 }} />
              </div>
            ))}
          </div>

        </div>

        {/* 3 Bottom Cards */}
        <div ref={bottomRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '800px', margin: '48px auto 0' }} className="ayl-problem-cards">
          {CARDS.map((card, i) => (
            <div key={i} style={{
              padding: '24px 20px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${card.color}33`,
              borderRadius: '16px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '13px', color: card.color,
                letterSpacing: '0.06em', marginBottom: '10px',
              }}>
                {card.label}
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, margin: 0 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
