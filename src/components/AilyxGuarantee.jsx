import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AI_TASKS    = ['Research', 'Personalização', 'Contacto', 'Follow-up', 'Qualificação inicial', 'Booking', 'Gestão de CRM']
const HUMAN_TASKS = ['Discovery', 'Consultoria', 'Proposta', 'Negociação', 'Fecho']

/* ─── Handoff flow illustration ──────────────────────────────────────── */

function HandoffFlow() {
  return (
    <div style={{ width: '100%', maxWidth: 680, margin: '0 auto' }}>
      {/* Main SVG diagram */}
      <svg viewBox="0 0 680 108" fill="none" style={{ width: '100%', overflow: 'visible' }} aria-hidden="true">

        {/* ── AI side ── */}
        <circle cx="90" cy="54" r="46" fill="rgba(90,171,255,0.08)" stroke="rgba(90,171,255,0.22)" strokeWidth="1.5"/>
        {/* Robot face */}
        <rect x="68" y="38" width="44" height="36" rx="9" fill="rgba(90,171,255,0.22)"/>
        <rect x="75" y="45" width="12" height="12" rx="3" fill="rgba(90,171,255,0.9)"/>
        <rect x="93" y="45" width="12" height="12" rx="3" fill="rgba(90,171,255,0.9)"/>
        <rect x="77" y="63" width="26" height="5" rx="2.5" fill="rgba(90,171,255,0.40)"/>
        {/* Antenna */}
        <line x1="90" y1="38" x2="90" y2="26" stroke="rgba(90,171,255,0.55)" strokeWidth="2"/>
        <circle cx="90" cy="22" r="5" fill="rgba(90,171,255,0.65)"/>
        <circle cx="90" cy="22" r="2.5" fill="rgba(255,255,255,0.40)"/>

        {/* Task bubbles floating left-to-center */}
        {['Prospeção', 'Follow-up', 'Qualificação'].map((t, i) => (
          <g key={i}>
            <rect x={152 + i * 56} y={16} width={t.length * 6.4 + 16} height={20} rx={10}
              fill="rgba(90,171,255,0.10)" stroke="rgba(90,171,255,0.28)" strokeWidth="1"/>
            <circle cx={158 + i * 56} cy={26} r={2.5} fill="rgba(90,171,255,0.70)"/>
          </g>
        ))}

        {/* Dashed line AI → center */}
        <line x1="138" y1="54" x2="296" y2="54" stroke="rgba(90,171,255,0.22)" strokeWidth="1.5" strokeDasharray="5 4"/>
        {/* Arrow tip */}
        <path d="M293 49 L300 54 L293 59" stroke="rgba(90,171,255,0.50)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

        {/* ── Center: Meeting badge ── */}
        <circle cx="340" cy="54" r="36" fill="rgba(33,127,241,0.15)" stroke="#217FF1" strokeWidth="1.5"/>
        <circle cx="340" cy="54" r="36" fill="rgba(33,127,241,0.05)"/>
        {/* Calendar icon */}
        <rect x="324" y="42" width="32" height="26" rx="6" fill="rgba(33,127,241,0.30)"/>
        <rect x="324" y="42" width="32" height="9"  rx="6" fill="#217FF1" opacity="0.85"/>
        <rect x="324" y="48" width="32" height="3"         fill="#217FF1" opacity="0.85"/>
        {/* Calendar dots */}
        <circle cx="334" cy="58" r="2.5" fill="white" opacity="0.50"/>
        <circle cx="340" cy="58" r="2.5" fill="white" opacity="0.90"/>
        <circle cx="346" cy="58" r="2.5" fill="white" opacity="0.50"/>
        {/* Checkmark */}
        <path d="M336 63 L340 67 L347 59" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Dashed line center → human */}
        <line x1="378" y1="54" x2="542" y2="54" stroke="rgba(74,222,128,0.22)" strokeWidth="1.5" strokeDasharray="5 4"/>
        <path d="M539 49 L546 54 L539 59" stroke="rgba(74,222,128,0.50)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

        {/* ── Human side ── */}
        <circle cx="590" cy="54" r="46" fill="rgba(74,222,128,0.07)" stroke="rgba(74,222,128,0.22)" strokeWidth="1.5"/>
        {/* Person silhouette */}
        <circle cx="590" cy="40" r="14" fill="rgba(74,222,128,0.50)"/>
        <path d="M562 92 Q564 74 590 74 Q616 74 618 92" fill="rgba(74,222,128,0.32)"/>
        {/* Success badge */}
        <circle cx="608" cy="32" r="10" fill="#4ade80"/>
        <path d="M604 32 L607 35 L613 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

      </svg>

      {/* Labels row */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        gap: '0', marginTop: '10px',
        paddingLeft: '44px', paddingRight: '44px',
      }} className="handoff-labels">
        <div style={{ textAlign: 'center', paddingLeft: '0' }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '12px', color: 'rgba(90,171,255,0.80)', letterSpacing: '0.06em' }}>
            REMINDER IA
          </span>
          <br />
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>trata de tudo</span>
        </div>
        <div style={{ textAlign: 'center', minWidth: 120 }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '12px', color: '#5aabff', letterSpacing: '0.04em' }}>
            REUNIÃO QUALIFICADA
          </span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '12px', color: 'rgba(74,222,128,0.80)', letterSpacing: '0.06em' }}>
            A SUA EQUIPA
          </span>
          <br />
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>fecha o negócio</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function AilyxGuarantee() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: contentRef.current, start: 'top 78%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#06142e', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid rgba(33,127,241,0.15)' }}>
      <div className="ayl-container">
        <div ref={contentRef} style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(33,127,241,0.18)', border: '1px solid rgba(33,127,241,0.3)',
            borderRadius: '100px', padding: '5px 14px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#90c8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              AI + Equipa Comercial
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(24px, 3vw, 40px)',
            color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', margin: 0,
          }}>
            A IA faz o trabalho repetitivo.<br />
            <span style={{ color: '#5aabff' }}>A sua equipa fecha negócios.</span>
          </h2>

          {/* ── Handoff illustration ── */}
          <HandoffFlow />

          {/* Two columns — AI vs Human */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', width: '100%', alignItems: 'stretch', marginTop: '0' }} className="ayl-ai-vs-grid">

            {/* AI side */}
            <div style={{
              padding: '24px 20px',
              background: 'rgba(90,171,255,0.08)',
              border: '1px solid rgba(90,171,255,0.2)',
              borderRadius: '16px',
            }}>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '14px', color: '#5aabff',
                letterSpacing: '0.06em', marginBottom: '16px',
              }}>
                REMINDER (IA)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {AI_TASKS.map((task, i) => (
                  <span key={i} style={{
                    padding: '8px 12px',
                    background: 'rgba(90,171,255,0.08)',
                    borderRadius: '8px',
                    fontSize: '13px', color: 'rgba(255,255,255,0.7)',
                    textAlign: 'center',
                  }}>
                    {task}
                  </span>
                ))}
              </div>
            </div>

            {/* Center divider */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '20px 0' }}>
              <svg width="2" height="60" viewBox="0 0 2 60" fill="none">
                <line x1="1" y1="0" x2="1" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
              <div style={{
                padding: '10px 14px',
                background: '#217FF1',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(33,127,241,0.4)',
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '10px', color: '#fff',
                letterSpacing: '0.05em', textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                REUNIÃO<br />QUALIFICADA
              </div>
              <svg width="2" height="60" viewBox="0 0 2 60" fill="none">
                <line x1="1" y1="0" x2="1" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Human side */}
            <div style={{
              padding: '24px 20px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
            }}>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '14px', color: 'rgba(255,255,255,0.75)',
                letterSpacing: '0.06em', marginBottom: '16px',
              }}>
                A SUA EQUIPA
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {HUMAN_TASKS.map((task, i) => (
                  <span key={i} style={{
                    padding: '8px 12px',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '8px',
                    fontSize: '13px', color: 'rgba(255,255,255,0.55)',
                    textAlign: 'center',
                  }}>
                    {task}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <p style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: '15px', color: '#5aabff', lineHeight: 1.5, margin: 0,
          }}>
            Construímos e operamos o sistema completo — da identificação à reunião.
          </p>

        </div>
      </div>
    </section>
  )
}
