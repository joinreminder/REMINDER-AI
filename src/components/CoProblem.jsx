import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const WORK = [
  'Enviar emails de boas-vindas.',
  'Pedir informação ao cliente.',
  'Recolher documentos.',
  'Criar tarefas no sistema.',
  'Confirmar responsáveis.',
  'Atualizar o CRM.',
  'Coordenar a equipa.',
  'Fazer follow-ups.',
  'Identificar bloqueios.',
  'Enviar atualizações.',
]

export default function CoProblem() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('[data-reveal]')
      gsap.from(items, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="co-section co-section--white" id="como-funciona">
      <div className="co-container">

        <div className="co-grid-2i co-grid-stk" style={{ gap: 'clamp(48px, 6vw, 96px)' }}>

          {/* Left */}
          <div>
            <span className="co-eyebrow" data-reveal>O Problema</span>
            <h2 className="co-h2" data-reveal style={{ marginBottom: '24px' }}>
              A venda foi fechada.<br />Agora começa o trabalho.
            </h2>
            <p className="co-body" data-reveal style={{ marginBottom: '32px' }}>
              Cada novo projeto desencadeia dezenas de pequenas ações: enviar emails, pedir informação, recolher documentos, criar tarefas, confirmar responsáveis, atualizar o CRM, coordenar a equipa, fazer follow-ups, identificar bloqueios e enviar atualizações.
            </p>

            <div data-reveal style={{
              padding: '20px 24px',
              border: '1px solid var(--co-line)', borderRadius: '10px',
              borderLeft: '3px solid var(--co-blue)',
            }}>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '15px', fontWeight: 500, color: 'var(--co-ink)', lineHeight: 1.6, margin: '0 0 8px 0' }}>
                Nenhuma parece enorme.
              </p>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'var(--co-muted)', lineHeight: 1.65, margin: 0 }}>
                O problema é que se repetem em todos os clientes. E à medida que a empresa cresce, cresce também o trabalho operacional necessário para entregar o que vendeu.
              </p>
            </div>
          </div>

          {/* Right */}
          <div data-reveal>
            {/* Work list */}
            <div style={{ marginBottom: '24px' }}>
              {WORK.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '12px 0', borderBottom: '1px solid var(--co-line)',
                }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                    background: i < 3 ? 'var(--co-blue)' : 'var(--co-line)',
                  }} />
                  <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '15px', color: i < 3 ? 'var(--co-ink)' : 'var(--co-subtle)', fontWeight: i < 3 ? 500 : 400 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Equation */}
            <div style={{
              background: 'var(--co-black)', borderRadius: '10px',
              padding: '20px 24px', border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { val: 'Mais clientes', sep: '→' },
                  { val: 'Mais trabalho operacional',  sep: '→' },
                  { val: 'Equipa sem capacidade',   sep: null },
                ].map((item, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', fontWeight: 600, color: i === 0 ? '#93c5fd' : 'rgba(255,255,255,0.55)' }}>
                      {item.val}
                    </span>
                    {item.sep && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>{item.sep}</span>}
                  </span>
                ))}
              </div>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '12px', color: 'rgba(255,255,255,0.25)', margin: '10px 0 0 0', lineHeight: 1.5 }}>
                Mais clientes não deveriam significar mais trabalho administrativo. Deveriam significar mais capacidade de entrega.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
