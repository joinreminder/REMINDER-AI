import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const CHAIN = [
  'O cliente envia um email',
  'Alguém lê e decide o que fazer',
  'Vai ao CRM — campo errado',
  'Vai ao ERP — outra plataforma',
  'Copia informação manualmente',
  'Cria a tarefa para outro colega',
  'Envia mensagem interna',
  'Espera confirmação',
  'Atualiza o estado',
  'Envia resposta ao cliente',
]

export default function CoCost() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        y: 24, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="co-section co-section--surface">
      <div className="co-container">

        <div style={{ maxWidth: '640px', marginBottom: '64px' }}>
          <span className="co-eyebrow" data-reveal>O Problema Real</span>
          <h2 className="co-h2" data-reveal style={{ marginBottom: '16px' }}>
            O problema não é falta<br />de software.
          </h2>
          <p className="co-body" data-reveal>
            A maioria das empresas já tem CRM. Já tem ERP. Já tem email. O que falta é o que acontece entre eles — o trabalho manual que nenhuma ferramenta executa sozinha.
          </p>
        </div>

        <div className="co-grid-2 co-grid-stk" data-reveal>

          {/* Chain column */}
          <div>
            <div style={{ border: '1px solid var(--co-line)', borderRadius: '10px', overflow: 'hidden', background: 'var(--co-white)' }}>
              <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--co-line)', background: 'var(--co-surface)' }}>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'var(--co-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  1 pedido de cliente. 10 passos.
                </span>
              </div>
              {CHAIN.map((step, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '12px 20px', borderBottom: i < CHAIN.length - 1 ? '1px solid var(--co-line)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 700,
                    color: 'var(--co-subtle)', minWidth: '20px', letterSpacing: '0.06em',
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'var(--co-ink)', fontWeight: 400 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="co-card">
              <span className="co-step-num">IMPACTO</span>
              <h3 className="co-h3" style={{ marginBottom: '12px' }}>É falta de execução.</h3>
              <p className="co-body co-body--sm" style={{ marginBottom: '20px' }}>
                Cada pedido exige que alguém navegue entre sistemas, copie dados e coordene pessoas. Não porque o software falhe — mas porque ninguém está a ligar os pontos.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { val: '~10 min', label: 'por processo manual' },
                  { val: '×500',   label: 'clientes ao ano' },
                ].map((m, i) => (
                  <div key={i} style={{ padding: '14px 16px', background: 'var(--co-surface)', borderRadius: '8px', border: '1px solid var(--co-line)' }}>
                    <div style={{ fontFamily: 'var(--co-font-d)', fontWeight: 800, fontSize: '22px', color: 'var(--co-ink)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '4px' }}>{m.val}</div>
                    <div style={{ fontFamily: 'var(--co-font-b)', fontSize: '11px', color: 'var(--co-subtle)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: '20px 24px', background: 'var(--co-black)',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px',
            }}>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: 0 }}>
                O problema não é a vontade da equipa. É a ausência de uma camada que executa o trabalho entre os sistemas.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
