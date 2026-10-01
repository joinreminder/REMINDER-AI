import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SI = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`

const CHANNELS = [
  { label: 'WhatsApp',  logo: SI('whatsapp',  '25D366'), color: '#25D366' },
  { label: 'Instagram', logo: SI('instagram', 'E4405F'), color: '#E4405F' },
  { label: 'Facebook',  logo: SI('facebook',  '1877F2'), color: '#1877F2' },
  { label: 'Email',     logo: SI('gmail',     'EA4335'), color: '#EA4335' },
  { label: 'SMS',       logo: null,           color: '#a78bfa' },
  { label: 'Telefonia', logo: null,           color: '#f59e0b' },
]

/* ── Visual zones ─────────────────────────────────────── */

function VisualChannels() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', width: 64, height: 64, borderRadius: '50%', background: 'rgba(90,171,255,0.15)', border: '1px solid rgba(90,171,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5aabff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      </div>
      {CHANNELS.map((ch, i) => {
        const angle = (i / CHANNELS.length) * 360
        const rad = angle * (Math.PI / 180)
        const r = 90
        const x = Math.cos(rad) * r
        const y = Math.sin(rad) * r
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`,
            transform: 'translate(-50%, -50%)',
            width: 36, height: 36, borderRadius: '10px',
            background: 'rgba(255,255,255,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}>
            {ch.logo ? (
              <img src={ch.logo} alt={ch.label} width={18} height={18} style={{ display: 'block' }}
                onError={e => e.currentTarget.style.display = 'none'} />
            ) : (
              <span style={{ fontSize: '9px', fontWeight: 700, color: ch.color }}>{ch.label.slice(0, 3)}</span>
            )}
          </div>
        )
      })}
      <div style={{ position: 'absolute', width: 196, height: 196, borderRadius: '50%', border: '1px dashed rgba(90,171,255,0.2)', pointerEvents: 'none' }} />
    </div>
  )
}

function VisualProspecting() {
  const leads = [
    { name: 'João Silva · TechCorp',   status: 'sent' },
    { name: 'Ana Costa · CloudBase',   status: 'sent' },
    { name: 'Pedro Ramos · SalesHub',  status: 'sent' },
    { name: 'Marta Lopes · DataPro',   status: 'sent' },
    { name: 'Rui Mendes · GrowthCo',   status: 'sent' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', justifyContent: 'center', height: '100%' }}>
      {leads.map((lead, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.06)', borderRadius: '8px',
          padding: '7px 12px',
        }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{lead.name}</span>
          <span style={{
            fontSize: '9px', fontWeight: 700, color: '#4ade80',
            background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)',
            borderRadius: '100px', padding: '2px 8px',
          }}>contactado</span>
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: '4px', fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>
        mais prospects nesta campanha…
      </div>
    </div>
  )
}

function VisualQualification() {
  const stages = [
    { label: 'Prospects identificados', n: '→',  color: 'rgba(255,255,255,0.15)', w: '100%' },
    { label: 'Contactados',             n: '→',  color: 'rgba(90,171,255,0.35)',  w: '90%'  },
    { label: 'Com follow-up',           n: '→',  color: 'rgba(90,171,255,0.55)',  w: '75%'  },
    { label: 'Qualificados',            n: '→',  color: 'rgba(74,222,128,0.45)',  w: '55%'  },
    { label: 'Reunião marcada',         n: '✓',  color: '#4ade80',                w: '35%'  },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', height: '100%' }}>
      {stages.map((s, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>{s.label}</span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: i === stages.length - 1 ? '#4ade80' : 'rgba(255,255,255,0.5)' }}>{s.n}</span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: s.w, background: s.color, borderRadius: 3, transition: 'width 1s ease' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function VisualZeroHours() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Antes</div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.2 }}>Equipa a<br />prospectar</div>
        </div>
        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '12px', padding: '14px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '9px', color: '#f59e0b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Depois</div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '13px', color: '#f59e0b', lineHeight: 1.2 }}>Equipa a<br />fechar</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>A equipa só fecha negócios</span>
      </div>
    </div>
  )
}

/* ── Cards ────────────────────────────────────────────── */

const CARDS = [
  {
    col: 'span 2',
    grad: 'linear-gradient(135deg, #06183d 0%, #0a2a5e 60%, #0f3572 100%)',
    accent: '#5aabff',
    stat: '6', unit: 'canais',
    title: 'Contacto multicanal',
    desc: 'Activamos o contacto através dos canais adequados para cada mercado e decisor. Email, telefone, WhatsApp, LinkedIn e SMS — com a mensagem certa, no momento certo. O objectivo não é volume. É abrir conversas com os decisores certos.',
    Visual: VisualChannels,
    visualH: 220,
  },
  {
    col: 'span 1',
    grad: 'linear-gradient(135deg, #052216 0%, #073520 60%, #0a4428 100%)',
    accent: '#4ade80',
    stat: 'ICP', unit: 'em foco',
    title: 'ICP, Research & Targeting',
    desc: 'Identificamos as empresas e os decisores certos para o seu negócio. Construímos listas qualificadas, enriquecemos os dados e validamos o perfil antes de activar qualquer contacto.',
    Visual: VisualProspecting,
    visualH: 195,
  },
  {
    col: 'span 1',
    grad: 'linear-gradient(135deg, #180a3d 0%, #2a1060 60%, #351880 100%)',
    accent: '#a78bfa',
    stat: '', unit: '',
    title: 'Qualificação segundo os seus critérios',
    desc: 'Validamos cada prospect segundo critérios definidos consigo antes da reunião ser agendada. Só avançam oportunidades que cumprem os requisitos mínimos para uma conversa ter valor.',
    Visual: VisualQualification,
    visualH: 195,
  },
  {
    col: 'span 2',
    grad: 'linear-gradient(135deg, #201006 0%, #3d1e08 60%, #542a0a 100%)',
    accent: '#f59e0b',
    stat: '', unit: '',
    title: 'O vendedor entra quando existe algo para fechar.',
    desc: 'Tratamos de todo o trabalho entre o primeiro nome numa lista e a reunião marcada no calendário. A equipa comercial não toca no processo — entra quando existe algo para fechar.',
    Visual: VisualZeroHours,
    visualH: 180,
  },
]

/* ── Component ────────────────────────────────────────── */

export default function AilyxCapabilities() {
  const sectionRef = useRef(null)
  const cardsRef   = useRef([])

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current.filter(Boolean), {
        y: 48, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: '#06102a',
      padding: 'clamp(64px, 8vw, 100px) 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div className="ayl-container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px', padding: '5px 14px', marginBottom: '18px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'hero-pulse 2s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              O que entregamos
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(22px, 3vw, 40px)',
            color: '#fff', lineHeight: 1.15,
            letterSpacing: '-0.03em', margin: 0,
          }}>
            O trabalho comercial que acontece<br />
            <span style={{ color: '#5aabff' }}>antes da reunião.</span>
          </h2>
        </div>

        {/* Bento grid — 3 cols */}
        <div className="cap-bento" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {CARDS.map((card, i) => {
            const { Visual } = card
            return (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                style={{
                  gridColumn: card.col,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', flexDirection: 'column',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
              >
                {/* Visual zone */}
                <div style={{
                  height: card.visualH,
                  background: card.grad,
                  position: 'relative',
                  padding: '24px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                  }} />
                  <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
                    <Visual />
                  </div>
                </div>

                {/* Text zone */}
                <div style={{
                  padding: '20px 24px 24px',
                  background: 'rgba(255,255,255,0.03)',
                  borderTop: `1px solid ${card.accent}18`,
                  flex: 1,
                }}>
                  {(card.stat || card.unit) && (
                    <div style={{
                      fontFamily: 'Sora, sans-serif', fontWeight: 800,
                      fontSize: 'clamp(28px, 3.5vw, 42px)',
                      color: card.accent, lineHeight: 1,
                      letterSpacing: '-0.03em',
                    }}>
                      {card.stat}
                      {card.unit && (
                        <span style={{ fontSize: '0.42em', fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginLeft: '6px' }}>
                          {card.unit}
                        </span>
                      )}
                    </div>
                  )}
                  <div style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 700,
                    fontSize: '14px', color: '#fff',
                    marginTop: (card.stat || card.unit) ? '8px' : '0',
                    marginBottom: '4px',
                  }}>
                    {card.title}
                  </div>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <style>{`
        @keyframes cap-ping {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.25); opacity: 0; }
        }
        @media (max-width: 768px) {
          .cap-bento { grid-template-columns: 1fr !important; }
          .cap-bento > * { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  )
}
