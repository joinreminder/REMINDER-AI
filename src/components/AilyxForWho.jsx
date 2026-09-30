import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FOR_WHO = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'Tem uma equipa comercial',
    desc: 'Os seus vendedores devem estar a vender, não a passar horas em tarefas de prospeção e follow-up.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    label: 'Tem um ticket elevado',
    desc: 'Cada reunião qualificada representa valor real para o negócio.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    label: 'Tem leads ou mercado para atacar',
    desc: 'Existe potencial suficiente para gerar mais oportunidades comerciais.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    label: 'Tem capacidade para fechar mais negócio',
    desc: 'A sua equipa consegue absorver novas oportunidades.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    label: 'Tem um processo comercial',
    desc: 'Já sabe vender. Nós ajudamos a criar mais oportunidades para a equipa fechar.',
  },
]

const NOT_FOR = [
  'Envio massivo sem personalização',
  'Uma ferramenta para configurar sozinho',
  'Substituir completamente os vendedores',
  'Gerar listas de leads sem qualificação',
  'Empresas sem capacidade para atender novas reuniões',
  'Empresas B2C ou com ticket demasiado baixo',
]

export default function AilyxForWho() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const gridRef    = useRef(null)
  const notForRef  = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      })
      gsap.from(Array.from(gridRef.current.children), {
        y: 24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
      })
      gsap.from(Array.from(notForRef.current.children), {
        y: 16, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06,
        scrollTrigger: { trigger: notForRef.current, start: 'top 88%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: '#06102a', padding: 'clamp(80px, 10vw, 120px) 0',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative', overflow: 'hidden',
    }} id="para-quem">

      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '50%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(33,127,241,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="ayl-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div ref={headRef} style={{ maxWidth: '640px', margin: '0 auto 52px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(33,127,241,0.12)', border: '1px solid rgba(33,127,241,0.25)',
            borderRadius: '100px', padding: '5px 16px', marginBottom: '20px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5aabff', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#5aabff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Para quem é
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 800,
            fontSize: 'clamp(24px, 3.2vw, 40px)', color: '#fff',
            letterSpacing: '-0.04em', lineHeight: 1.15, margin: 0,
          }}>
            Para empresas B2B que já vendem —{' '}
            <span style={{ color: '#5aabff' }}>mas poderiam estar a gerar mais reuniões.</span>
          </h2>
        </div>

        {/* Criteria grid */}
        <div ref={gridRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px',
          maxWidth: '860px', margin: '0 auto 56px',
        }} className="fw-grid">
          {FOR_WHO.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '18px', padding: '28px 24px',
                display: 'flex', gap: '18px', alignItems: 'flex-start',
                transition: 'border-color 0.2s, background 0.2s', cursor: 'default',
                ...(i === FOR_WHO.length - 1 && FOR_WHO.length % 2 !== 0
                  ? { gridColumn: 'span 2', maxWidth: '420px', margin: '0 auto', width: '100%' }
                  : {}),
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(33,127,241,0.35)'; e.currentTarget.style.background = 'rgba(33,127,241,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
                background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80',
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '6px' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Not for */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '40px' }}>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 600,
            fontSize: '12px', color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            textAlign: 'center', marginBottom: '20px',
          }}>
            Não é para quem procura
          </p>
          <div ref={notForRef} style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {NOT_FOR.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 16px',
                background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)',
                borderRadius: '100px',
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{
            textAlign: 'center', marginTop: '28px', fontSize: '14px',
            color: 'rgba(255,255,255,0.45)', lineHeight: 1.6,
          }}>
            É para empresas B2B que querem transformar mais oportunidades em reuniões comerciais.
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .fw-grid { grid-template-columns: 1fr !important; }
          .fw-grid > * { grid-column: span 1 !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
