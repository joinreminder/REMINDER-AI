import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Ilustrações inline (estilo undraw.co) ─────────────────────────── */

function IlluDiagnose() {
  return (
    <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Document */}
      <rect x="8" y="10" width="82" height="108" rx="10" fill="#EEF5FE" stroke="#C8DCFA" strokeWidth="1.5"/>
      <rect x="22" y="26" width="54" height="6" rx="3" fill="#C8DCFA"/>
      <rect x="22" y="38" width="38" height="6" rx="3" fill="#DAEAFD"/>
      <rect x="22" y="50" width="46" height="6" rx="3" fill="#DAEAFD"/>
      {/* Bar chart inside doc */}
      <rect x="22" y="72" width="9"  height="30" rx="3" fill="rgba(33,127,241,0.25)"/>
      <rect x="34" y="64" width="9"  height="38" rx="3" fill="rgba(33,127,241,0.50)"/>
      <rect x="46" y="56" width="9"  height="46" rx="3" fill="#217FF1" opacity="0.85"/>
      <rect x="58" y="66" width="9"  height="36" rx="3" fill="rgba(33,127,241,0.40)"/>
      {/* Magnifying glass */}
      <circle cx="124" cy="88" r="34" fill="white"  stroke="#E2EDFC" strokeWidth="1.5"/>
      <circle cx="124" cy="88" r="23" fill="#EEF5FE" stroke="rgba(33,127,241,0.35)" strokeWidth="1.5"/>
      {/* Checkmark */}
      <path d="M115 88 L121 94 L135 78" stroke="#217FF1" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Handle */}
      <rect x="142" y="106" width="22" height="7" rx="3.5" fill="#217FF1" transform="rotate(45 142 106)"/>
      {/* Decorative dots */}
      <circle cx="162" cy="18" r="5"   fill="rgba(33,127,241,0.20)"/>
      <circle cx="170" cy="38" r="3"   fill="rgba(33,127,241,0.14)"/>
      <circle cx="10"  cy="132" r="3.5" fill="rgba(33,127,241,0.14)"/>
    </svg>
  )
}

function IlluBuild() {
  return (
    <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Centre hub */}
      <rect x="62" y="56" width="56" height="38" rx="10" fill="#217FF1"/>
      <rect x="73" y="67" width="34" height="6" rx="3" fill="rgba(255,255,255,0.70)"/>
      <rect x="73" y="78" width="22" height="4" rx="2" fill="rgba(255,255,255,0.40)"/>
      {/* Top-left node */}
      <rect x="6"  y="14" width="46" height="32" rx="8" fill="#EEF5FE" stroke="rgba(33,127,241,0.30)" strokeWidth="1.5"/>
      <rect x="16" y="24" width="26" height="6" rx="3" fill="rgba(33,127,241,0.45)"/>
      <rect x="16" y="34" width="16" height="4" rx="2" fill="rgba(33,127,241,0.25)"/>
      {/* Bottom-left node */}
      <rect x="6"  y="104" width="46" height="32" rx="8" fill="#EEF5FE" stroke="rgba(74,222,128,0.35)" strokeWidth="1.5"/>
      <rect x="16" y="114" width="26" height="6" rx="3" fill="rgba(74,222,128,0.55)"/>
      <rect x="16" y="124" width="16" height="4" rx="2" fill="rgba(74,222,128,0.30)"/>
      {/* Top-right node */}
      <rect x="128" y="14" width="46" height="32" rx="8" fill="#EEF5FE" stroke="rgba(33,127,241,0.30)" strokeWidth="1.5"/>
      <rect x="138" y="24" width="26" height="6" rx="3" fill="rgba(33,127,241,0.45)"/>
      <rect x="138" y="34" width="16" height="4" rx="2" fill="rgba(33,127,241,0.25)"/>
      {/* Bottom-right node */}
      <rect x="128" y="104" width="46" height="32" rx="8" fill="#EEF5FE" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5"/>
      <rect x="138" y="114" width="26" height="6" rx="3" fill="rgba(245,158,11,0.55)"/>
      <rect x="138" y="124" width="16" height="4" rx="2" fill="rgba(245,158,11,0.30)"/>
      {/* Dashed connector lines */}
      <line x1="52"  y1="30"  x2="62"  y2="64"  stroke="rgba(33,127,241,0.30)"  strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="52"  y1="120" x2="62"  y2="82"  stroke="rgba(74,222,128,0.35)"  strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="118" y1="64"  x2="128" y2="30"  stroke="rgba(33,127,241,0.30)"  strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="118" y1="82"  x2="128" y2="120" stroke="rgba(245,158,11,0.35)"  strokeWidth="1.5" strokeDasharray="4 3"/>
      {/* Moving dots (static representation) */}
      <circle cx="57"  cy="47"  r="3.5" fill="#217FF1" opacity="0.50"/>
      <circle cx="57"  cy="101" r="3.5" fill="#4ade80" opacity="0.50"/>
      <circle cx="123" cy="73"  r="3.5" fill="#217FF1" opacity="0.50"/>
    </svg>
  )
}

function IlluOperate() {
  return (
    <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Robot body */}
      <rect x="54" y="68" width="72" height="64" rx="12" fill="#EEF5FE" stroke="rgba(33,127,241,0.30)" strokeWidth="1.5"/>
      {/* Eyes */}
      <rect x="64" y="80" width="20" height="16" rx="5" fill="#217FF1" opacity="0.75"/>
      <rect x="96" y="80" width="20" height="16" rx="5" fill="#217FF1" opacity="0.75"/>
      {/* Mouth */}
      <rect x="72" y="104" width="36" height="8" rx="4" fill="rgba(33,127,241,0.30)"/>
      {/* Antenna */}
      <line x1="90" y1="68" x2="90" y2="52" stroke="rgba(33,127,241,0.55)" strokeWidth="2.5"/>
      <circle cx="90" cy="46" r="7" fill="#217FF1" opacity="0.70"/>
      <circle cx="90" cy="46" r="3" fill="white" opacity="0.55"/>
      {/* Message bubble — right */}
      <rect x="132" y="14" width="44" height="34" rx="9" fill="white" stroke="rgba(33,127,241,0.28)" strokeWidth="1.5"/>
      <rect x="142" y="24" width="24" height="5"  rx="2.5" fill="rgba(33,127,241,0.50)"/>
      <rect x="142" y="33" width="16" height="4"  rx="2"   fill="rgba(33,127,241,0.28)"/>
      <path d="M132 42 L120 54 L136 42" fill="white" stroke="rgba(33,127,241,0.28)" strokeWidth="1" strokeLinejoin="round"/>
      {/* Message bubble — left */}
      <rect x="4" y="28" width="42" height="30" rx="9" fill="white" stroke="rgba(74,222,128,0.40)" strokeWidth="1.5"/>
      <rect x="13" y="37" width="24" height="5"  rx="2.5" fill="rgba(74,222,128,0.55)"/>
      <rect x="13" y="46" width="16" height="4"  rx="2"   fill="rgba(74,222,128,0.30)"/>
      <path d="M46 50 L58 62 L42 50" fill="white" stroke="rgba(74,222,128,0.40)" strokeWidth="1" strokeLinejoin="round"/>
      {/* Sparkles */}
      <circle cx="164" cy="100" r="6"  fill="#4ade80" opacity="0.55"/>
      <circle cx="174" cy="82"  r="3.5" fill="#217FF1" opacity="0.30"/>
      <circle cx="8"   cy="112" r="4.5" fill="#217FF1" opacity="0.22"/>
    </svg>
  )
}

function IlluDeliver() {
  return (
    <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Calendar body */}
      <rect x="12" y="28" width="100" height="104" rx="12" fill="white" stroke="rgba(33,127,241,0.22)" strokeWidth="1.5"/>
      {/* Calendar header */}
      <rect x="12" y="28" width="100" height="36" rx="12" fill="#217FF1" opacity="0.85"/>
      <rect x="12" y="52" width="100" height="12"          fill="#217FF1" opacity="0.85"/>
      {/* Knobs */}
      <rect x="32" y="16" width="12" height="20" rx="6" fill="#217FF1"/>
      <rect x="84" y="16" width="12" height="20" rx="6" fill="#217FF1"/>
      {/* Header label */}
      <rect x="28" y="38" width="64" height="6" rx="3" fill="rgba(255,255,255,0.45)"/>
      {/* Grid cells — row 1 */}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={`r1-${i}`} x={22 + i*14} y={76} width="11" height="11" rx="3" fill="#EEF5FE"/>
      ))}
      {/* Grid cells — row 2 */}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={`r2-${i}`} x={22 + i*14} y={92} width="11" height="11" rx="3" fill="#EEF5FE"/>
      ))}
      {/* Grid cells — row 3 */}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={`r3-${i}`} x={22 + i*14} y={108} width="11" height="11" rx="3" fill="#EEF5FE"/>
      ))}
      {/* Highlighted meeting cell */}
      <rect x="50" y="92" width="11" height="11" rx="3" fill="#217FF1"/>
      <path d="M53 97 L55 99 L60 94" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Person avatar */}
      <circle cx="148" cy="60" r="22" fill="#EEF5FE" stroke="rgba(33,127,241,0.22)" strokeWidth="1.5"/>
      <circle cx="148" cy="54" r="9"  fill="rgba(33,127,241,0.45)"/>
      <path d="M128 82 Q130 70 148 70 Q166 70 168 82" fill="rgba(33,127,241,0.22)"/>
      {/* Green badge */}
      <circle cx="162" cy="46" r="9" fill="#4ade80"/>
      <path d="M158 46 L161 49 L167 43" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IlluOptimize() {
  return (
    <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Chart card */}
      <rect x="6" y="12" width="130" height="110" rx="12" fill="#EEF5FE" stroke="rgba(33,127,241,0.18)" strokeWidth="1.5"/>
      {/* Grid lines */}
      <line x1="22" y1="38" x2="124" y2="38"  stroke="rgba(33,127,241,0.10)" strokeWidth="1"/>
      <line x1="22" y1="58" x2="124" y2="58"  stroke="rgba(33,127,241,0.10)" strokeWidth="1"/>
      <line x1="22" y1="78" x2="124" y2="78"  stroke="rgba(33,127,241,0.10)" strokeWidth="1"/>
      <line x1="22" y1="98" x2="124" y2="98"  stroke="rgba(33,127,241,0.10)" strokeWidth="1"/>
      {/* Area fill */}
      <path d="M22 100 L50 88 L78 74 L106 54 L124 36 L124 108 L22 108Z" fill="rgba(33,127,241,0.10)"/>
      {/* Trend line */}
      <path d="M22 100 L50 88 L78 74 L106 54 L124 36" stroke="#217FF1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Data points */}
      <circle cx="22"  cy="100" r="5" fill="white" stroke="#217FF1" strokeWidth="2.2"/>
      <circle cx="78"  cy="74"  r="5" fill="white" stroke="#217FF1" strokeWidth="2.2"/>
      <circle cx="124" cy="36"  r="6" fill="#217FF1"/>
      {/* Metric chips at bottom */}
      <rect x="14"  y="116" width="36" height="18" rx="6" fill="rgba(33,127,241,0.12)"/>
      <rect x="56"  y="116" width="36" height="18" rx="6" fill="rgba(74,222,128,0.15)"/>
      <rect x="98"  y="116" width="32" height="18" rx="6" fill="rgba(33,127,241,0.12)"/>
      {/* Chip labels (colored bars instead of text for reliability) */}
      <rect x="20"  y="123" width="24" height="4" rx="2" fill="rgba(33,127,241,0.50)"/>
      <rect x="62"  y="123" width="24" height="4" rx="2" fill="rgba(74,222,128,0.60)"/>
      <rect x="104" y="123" width="20" height="4" rx="2" fill="rgba(33,127,241,0.50)"/>
      {/* Arrow badge (top-right) */}
      <circle cx="158" cy="30" r="20" fill="#217FF1" opacity="0.90"/>
      <path d="M158 40 L158 22"        stroke="white" strokeWidth="3"   strokeLinecap="round"/>
      <path d="M150 30 L158 22 L166 30" stroke="white" strokeWidth="3"   strokeLinecap="round" strokeLinejoin="round"/>
      {/* Percentage label inside badge */}
      <rect x="146" y="44" width="24" height="12" rx="6" fill="#217FF1"/>
      <rect x="150" y="48" width="16" height="4"  rx="2" fill="rgba(255,255,255,0.70)"/>
    </svg>
  )
}

/* ─── Data ───────────────────────────────────────────────────────────── */

const STEPS = [
  { num: '01', title: 'Encontrar',  desc: 'Identificamos empresas e decisores dentro do seu perfil de cliente ideal.', Illu: IlluDiagnose },
  { num: '02', title: 'Contactar',  desc: 'Iniciamos o contacto através dos canais mais adequados, com mensagens relevantes para cada prospect.', Illu: IlluBuild },
  { num: '03', title: 'Follow-up',  desc: 'Mantemos cada oportunidade acompanhada sem depender da memória ou disponibilidade da equipa comercial.', Illu: IlluOperate },
  { num: '04', title: 'Qualificar', desc: 'Aplicamos os critérios comerciais definidos consigo e filtramos as oportunidades com verdadeiro potencial.', Illu: IlluDeliver },
  { num: '05', title: 'Marcar',     desc: 'Quando existe uma oportunidade real, a reunião é marcada e entregue à equipa comercial.', Illu: IlluOptimize },
]

const TOOLS = ['HubSpot', 'Salesforce', 'Pipedrive', 'Apollo', 'Gmail', 'Calendly']

export default function AilyxAudit() {
  const headRef  = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: headRef.current, start: 'top 78%', once: true },
      })
      cardsRef.current.filter(Boolean).forEach((card) => {
        gsap.fromTo(card,
          { y: 120, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 60%', scrub: 0.5 } }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#F3F6FB', padding: 'clamp(80px, 10vw, 120px) 0 0', borderTop: '1px solid #e8edf5' }} id="como-funciona">
      <div className="ayl-container">
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#217FF1', borderRadius: '100px', padding: '6px 18px', marginBottom: '20px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'white', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Método Reminder™
            </span>
          </div>
          <h2 className="ayl-h2" style={{ marginBottom: '12px', color: '#0a1c42' }}>
            Encontrar. Activar. Desenvolver. Qualificar. Entregar.
          </h2>
          <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 10px' }}>
            Construímos e operamos o sistema comercial que transforma prospects e leads em reuniões qualificadas.
          </p>
          <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
            Não precisa de aprender IA, configurar automações ou gerir dezenas de ferramentas. Nós construímos, operamos e optimizamos tudo por si.
          </p>
        </div>
      </div>

      {/* Stacking cards */}
      <div style={{ position: 'relative' }}>
        {STEPS.map((step, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            style={{ position: 'sticky', top: `${100 + i * 28}px`, marginBottom: '40px', zIndex: i + 1 }}
          >
            <div className="ayl-container">
              <div className="ayl-card--hover" style={{
                background: '#fff', border: '1.5px solid #e8edf5', borderRadius: '24px',
                padding: 'clamp(28px, 3.5vw, 44px) clamp(24px, 4vw, 52px)',
                display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', alignItems: 'center',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08)', minHeight: '180px',
              }}>
                {/* Left — number + title */}
                <div>
                  <div style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 800,
                    fontSize: 'clamp(56px, 6vw, 80px)', color: 'rgba(33,127,241,0.12)',
                    lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '12px',
                  }}>{step.num}</div>
                  <h3 style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#0a1c42',
                    letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0,
                  }}>{step.title}</h3>
                </div>

                {/* Right — description + illustration */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.7, margin: 0 }}>
                      {step.desc}
                    </p>
                    <div style={{ marginTop: '20px', width: '40px', height: '3px', borderRadius: '2px', background: '#217FF1', opacity: 0.6 }} />
                  </div>
                  <div className="ayl-method-illu" style={{ width: 160, flexShrink: 0 }}>
                    <step.Illu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: '60px' }} />
      </div>

      {/* Bottom — tools + statement */}
      <div className="ayl-container" style={{ textAlign: 'center', paddingBottom: '60px' }}>
        <div style={{
          display: 'inline-block', padding: '24px 36px',
          background: '#06142e', border: '1px solid rgba(33,127,241,0.3)', borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(14px, 1.6vw, 17px)', margin: 0, lineHeight: 1.5,
          }}>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>A IA executa. O sistema acompanha. </span>
            <span style={{ color: '#5aabff' }}>A equipa comercial fecha.</span>
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
          {TOOLS.map((tool, i) => (
            <span key={i} style={{
              padding: '6px 14px',
              background: 'rgba(33,127,241,0.06)',
              border: '1px solid rgba(33,127,241,0.12)',
              borderRadius: '100px',
              fontSize: '12px', fontWeight: 500, color: '#555',
              fontFamily: 'Sora, sans-serif',
            }}>
              {tool}
            </span>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#999', marginTop: '12px' }}>
          Sem reconstruir a sua operação comercial do zero.
        </p>
      </div>
    </section>
  )
}
