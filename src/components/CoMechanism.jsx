import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const SOURCES = ['CRM', 'Email', 'ERP', 'Calendar', 'WhatsApp', 'Docs']

export default function CoMechanism() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="co-section co-section--dark" id="mecanismo">
      <div className="co-container">

        {/* Bridge */}
        <div data-reveal style={{ maxWidth: '720px', margin: '0 auto 80px', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--co-font-d)', fontWeight: 800,
            fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'white',
            letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px',
          }}>
            E se o processo<br />
            <span style={{ color: 'var(--co-blue)' }}>simplesmente continuasse?</span>
          </h2>
          <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>
            Criamos AI Workers especializados que executam partes repetitivas do seu processo de entrega.
            Eles não substituem a sua equipa. Executam o caminho normal e encaminham as exceções.
          </p>
        </div>

        <div className="co-grid-2i co-grid-ctr" style={{ gap: 'clamp(48px, 6vw, 96px)' }}>

          {/* Left — diagram */}
          <div data-reveal>
            <div className="co-integration">
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                  Reminder AI — AI Execution Layer
                </span>
              </div>

              {/* Integrations */}
              {SOURCES.map((src, i) => (
                <div key={src} className="co-int-row">
                  <div className="co-int-chip">{src}</div>
                  <div className="co-int-line" />
                  {i === 2 ? (
                    <div className="co-int-core">
                      <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '2px', letterSpacing: '0.08em' }}>AI WORKER</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', animation: 'co-pulse 2s ease-in-out infinite' }} />
                        <span>Execution</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ width: 100, height: 38, borderLeft: '1px solid rgba(37,99,235,0.2)' }} />
                  )}
                </div>
              ))}

              <div className="co-int-exception">
                Exceção detectada → Equipa humana notificada
              </div>
            </div>
          </div>

          {/* Right — copy */}
          <div>
            <span className="co-eyebrow co-eyebrow--dim" data-reveal>Como funciona</span>
            <h2 className="co-h2 co-h2--white" data-reveal style={{ marginBottom: '24px' }}>
              Deteta. Executa.<br />
              <span style={{ color: 'var(--co-blue)' }}>Verifica. Escala.</span>
            </h2>
            <p className="co-body co-body--dark" data-reveal style={{ marginBottom: '32px' }}>
              Ligamos os sistemas que a sua empresa já usa e colocamos AI Workers a fazer o trabalho entre eles — do início ao fim, com passagem a humano quando necessário.
            </p>

            <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { n: '01', label: 'Deteta', desc: 'O Worker identifica um evento: uma venda fechada, uma nova tarefa, uma resposta do cliente, um prazo ultrapassado ou outra condição definida no processo.' },
                { n: '02', label: 'Executa', desc: 'Analisa o contexto e realiza a próxima ação: envia uma mensagem, solicita informação, cria uma tarefa, atualiza um sistema ou avisa alguém da equipa.' },
                { n: '03', label: 'Verifica', desc: 'Confirma o que aconteceu, identifica o que continua pendente e determina o próximo passo.' },
                { n: '04', label: 'Escala', desc: 'Quando existe uma decisão, exceção ou situação fora das regras, encaminha para a pessoa certa.' },
              ].map((step, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '14px',
                  padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'rgba(37,99,235,0.6)', minWidth: '20px', letterSpacing: '0.06em', paddingTop: '2px' }}>
                    {step.n}
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--co-font-b)', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>
                      {step.label}
                    </div>
                    <div style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '20px', lineHeight: 1.5 }}>
              Executar → Verificar → Escalar. É assim que transformamos um processo manual numa operação que se mantém em movimento.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
