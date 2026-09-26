import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FLOW = [
  { label: 'PEDIDO',       sub: 'Entra por qualquer canal',           note: 'WhatsApp · Instagram · Email · Website' },
  { label: 'RESPOSTA',     sub: 'Rápida e consistente',               note: 'IA quando acelera' },
  { label: 'QUALIFICAÇÃO', sub: 'Contexto recolhido antes da equipa', note: 'Serviço · Urgência · Localização',  highlight: true },
  { label: 'PRÓXIMO PASSO',sub: 'Marcação, visita ou proposta',       note: 'Equipa entra quando importa' },
  { label: 'FOLLOW-UP',    sub: 'Nenhuma oportunidade é esquecida',   note: 'Automático e sistemático' },
  { label: 'RESULTADO',    sub: 'Venda, perda ou pendente — com razão', note: 'Visibilidade total' },
]

export default function AilyxDemo() {
  const wrapRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current, {
        y: 60, opacity: 0, scale: 0.96, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 80%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="ayl-section ayl-section--alt" id="sistema">
      <div className="ayl-container">
        <div className="ayl-section-label">O mecanismo</div>
        <h2 className="ayl-h2" style={{ maxWidth: '700px', marginBottom: '16px', fontSize: 'clamp(28px, 3vw, 48px)' }}>
          Cada pedido segue um caminho até existir um resultado.
        </h2>
        <p style={{ color: '#555', maxWidth: '600px', marginBottom: '12px', lineHeight: 1.7, fontSize: '17px' }}>
          A Reminder liga este processo entre os seus canais, a sua equipa e a IA.
        </p>
        <p style={{ color: '#888', maxWidth: '600px', marginBottom: '40px', lineHeight: 1.7, fontSize: '15px' }}>
          O objetivo não é enviar mais mensagens. É garantir que cada oportunidade tem um estado, um responsável e um próximo passo — até existir uma decisão.
        </p>

        <div className="ayl-demo__wrap" ref={wrapRef} style={{ background: 'white', borderRadius: '24px', padding: '48px', boxShadow: '0 4px 40px rgba(33,127,241,0.10)' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#217FF1', marginBottom: '32px' }}>
            O processo — do pedido ao resultado
          </p>
          <div className="ayl-demo__grid">
            {FLOW.map((step) => (
              <div key={step.label} style={{
                background: step.highlight ? '#217FF1' : '#F3F6FB',
                borderRadius: '14px', padding: '20px',
                display: 'flex', flexDirection: 'column', gap: '8px',
              }}>
                <span style={{ fontWeight: 700, fontSize: '14px', color: step.highlight ? 'white' : '#111', letterSpacing: '-0.01em' }}>
                  {step.label}
                </span>
                <span style={{ fontSize: '12px', color: step.highlight ? 'rgba(255,255,255,0.7)' : '#888', lineHeight: 1.4 }}>
                  {step.sub}
                </span>
                <span style={{
                  marginTop: '4px', fontSize: '11px', fontWeight: 600,
                  color: step.highlight ? 'rgba(255,255,255,0.9)' : '#217FF1',
                  background: step.highlight ? 'rgba(255,255,255,0.15)' : 'rgba(33,127,241,0.08)',
                  borderRadius: '6px', padding: '4px 8px', width: 'fit-content',
                }}>
                  {step.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
