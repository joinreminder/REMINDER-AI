import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const examples = [
  {
    problem: 'Follow-up de orçamentos',
    before: 'Propostas enviadas sem processo de acompanhamento. O follow-up dependia de cada comercial se lembrar de contactar — quando tivesse tempo.',
    after: '100% das propostas entram num processo de acompanhamento automático. A equipa é alertada quando é necessária intervenção humana.',
    metric: 'Nenhuma proposta esquecida.',
  },
  {
    problem: 'Triagem de pedidos',
    before: 'Pedidos a chegar por vários canais — email, telefone, WhatsApp. Sem prioridade, sem routing. A equipa decidia na hora quem respondia.',
    after: 'Todos os pedidos entram no mesmo processo. Classificados, priorizados e encaminhados automaticamente para a pessoa certa.',
    metric: 'Tempo de resposta: de horas para minutos.',
  },
  {
    problem: 'Cobranças em atraso',
    before: 'Faturas com 30, 60, 90 dias de atraso sem processo activo. A equipa evitava o contacto por desconforto. Cash flow imprevisível.',
    after: 'Sequência estruturada de lembretes progressivos — profissional, sem confronto. O processo é consistente independentemente de quem gere.',
    metric: 'Processo activo em 100% das faturas em atraso.',
  },
]

export default function RSocialProof() {
  const navigate  = useNavigate()
  const headRef   = useRef(null)
  const cardRefs  = useRef([])
  const earlyRef  = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      })
      cardRefs.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          y: 44, opacity: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 82%', once: true },
        })
      })
      gsap.from(earlyRef.current.children, {
        y: 24, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: earlyRef.current, start: 'top 84%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0' }}>
      <div className="ayl-container">

        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
          <div className="ayl-section-label" style={{ marginBottom: '20px', display: 'inline-block' }}>Exemplos de Implementação</div>
          <h2 className="ayl-h2" style={{ marginBottom: '16px' }}>
            Três exemplos do tipo de problemas<br />que identificamos — e o que acontece depois.
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', color: '#888', maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}>
            Não inventamos histórias de sucesso. Estes são os padrões que encontramos nas primeiras implementações.
          </p>
        </div>

        {/* Cards */}
        <div className="r-cards-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: 'clamp(48px, 6vw, 64px)',
        }}>
          {examples.map((ex, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{
                padding: '16px 22px',
                background: '#F8FAFF',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#217FF1' }}>
                  {ex.problem}
                </span>
              </div>

              <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f3f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f87171', flexShrink: 0 }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Antes</span>
                </div>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.65, margin: 0 }}>{ex.before}</p>
              </div>

              <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f3f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#217FF1', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Depois</span>
                </div>
                <p style={{ fontSize: '13px', color: '#333', lineHeight: 1.65, margin: 0 }}>{ex.after}</p>
              </div>

              <div style={{ padding: '12px 22px', background: '#EEF4FF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#217FF1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#217FF1' }}>{ex.metric}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Early adopter */}
        <div ref={earlyRef} style={{
          background: '#F4F7FB',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '20px',
          padding: 'clamp(32px, 4vw, 48px)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: '560px' }}>
            <p style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 600,
              fontSize: 'clamp(16px, 1.8vw, 20px)', color: '#111',
              letterSpacing: '-0.03em', marginBottom: '10px',
            }}>
              Quer ser uma das primeiras empresas?
            </p>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, margin: 0 }}>
              Estamos a seleccionar empresas de serviços em crescimento para implementação inicial. O Revenue & Capacity Map é gratuito — se não encontrarmos uma oportunidade concreta, dizemos-lhe honestamente.
            </p>
          </div>
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
