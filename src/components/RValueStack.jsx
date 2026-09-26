import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const systems = [
  {
    num: '01',
    name: 'Revenue Recovery System',
    desc: 'Recupera oportunidades comerciais que se perdem antes de chegarem ao fecho.',
    items: [
      'Resposta e qualificação automática de leads',
      'Follow-up de propostas e orçamentos enviados',
      'Reativação de oportunidades em aberto',
      'Acompanhamento comercial sistemático',
    ],
    color: '#217FF1',
  },
  {
    num: '02',
    name: 'Customer Operations System',
    desc: 'Reduz o trabalho manual de atendimento e coordenação — libertando a equipa para trabalho que requer julgamento.',
    items: [
      'Triagem e routing automático de pedidos',
      'Agendamento e confirmações automáticas',
      'Comunicação de rotina com clientes',
      'Centralização de informação dispersa',
    ],
    color: '#0ea5e9',
  },
  {
    num: '03',
    name: 'Operations & Admin System',
    desc: 'Liga sistemas, elimina cópias manuais e automatiza o trabalho administrativo recorrente.',
    items: [
      'Sincronização entre ferramentas',
      'Criação automática de ordens de trabalho',
      'Relatórios e dashboards operacionais',
      'Processos de faturação e cobrança',
    ],
    color: '#6366f1',
  },
]

export default function RSystems() {
  const navigate  = useNavigate()
  const headRef   = useRef(null)
  const cardsRef  = useRef([])
  const noteRef   = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      })
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          y: 48, opacity: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 82%', once: true },
        })
      })
      gsap.from(noteRef.current.children, {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: noteRef.current, start: 'top 86%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0' }} id="o-que-construimos">
      <div className="ayl-container">

        {/* Header */}
        <div ref={headRef} style={{ maxWidth: '700px', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
          <div className="ayl-section-label" style={{ marginBottom: '20px' }}>O Que Construímos</div>
          <h2 className="ayl-h2" style={{ marginBottom: '20px' }}>
            Não construímos o que é mais fácil de automatizar.<br />Construímos o que mais vale a pena resolver.
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: '#666', lineHeight: 1.75, maxWidth: '560px' }}>
            Identificamos os maiores gargalos e construímos o sistema que os elimina. Cada sistema tem um problema económico específico que resolve.
          </p>
        </div>

        {/* Cards */}
        <div className="r-cards-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: 'clamp(40px, 5vw, 60px)',
        }}>
          {systems.map((s, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="ayl-card--hover"
              style={{
                background: '#F4F7FB',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '20px',
                padding: 'clamp(24px, 3vw, 36px)',
                display: 'flex', flexDirection: 'column', gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 800,
                  fontSize: '32px', color: 'rgba(0,0,0,0.06)',
                  lineHeight: 1, letterSpacing: '-0.04em',
                }}>
                  {s.num}
                </span>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0,
                }} />
              </div>

              <div>
                <p style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: 'clamp(15px, 1.5vw, 18px)',
                  color: '#111', letterSpacing: '-0.03em', marginBottom: '8px',
                }}>
                  {s.name}
                </p>
                <p style={{ fontSize: '13.5px', color: '#666', lineHeight: 1.65, margin: 0 }}>
                  {s.desc}
                </p>
              </div>

              <div style={{
                borderTop: '1px solid rgba(0,0,0,0.07)',
                paddingTop: '16px',
                display: 'flex', flexDirection: 'column', gap: '8px',
              }}>
                {s.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: '13px', color: '#555', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div ref={noteRef} style={{
          background: '#F4F7FB', borderRadius: '16px',
          padding: 'clamp(28px, 3.5vw, 44px)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap',
        }}>
          <p style={{
            fontSize: 'clamp(14px, 1.4vw, 16px)', color: '#555',
            maxWidth: '560px', lineHeight: 1.7, margin: 0,
          }}>
            O ponto de partida é sempre o Revenue & Capacity Map. É aí que descobrimos qual o sistema que cria maior impacto para a sua empresa específica.
          </p>
          <button
            className="ayl-btn"
            style={{
              background: '#217FF1', color: '#fff', border: 'none',
              borderRadius: '12px', padding: '15px 28px',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Sora, sans-serif', letterSpacing: '-0.01em',
              whiteSpace: 'nowrap', flexShrink: 0,
              boxShadow: '0 6px 24px rgba(33,127,241,0.28)',
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
