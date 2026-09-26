import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const SYSTEMS = [
  { label: 'CRM',           desc: 'Sabe o que foi vendido.' },
  { label: 'PSA / PM',      desc: 'Sabe o que precisa de ser feito.' },
  { label: 'Email',         desc: 'Sabe o que o cliente respondeu.' },
  { label: 'Slack / Teams', desc: 'Sabe o que a equipa discutiu.' },
]

export default function CoCategory() {
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
    <section ref={ref} className="co-section co-section--white" id="o-que-e">
      <div className="co-container">

        <div className="co-grid-2i co-grid-stk" style={{ gap: 'clamp(48px, 6vw, 96px)' }}>

          {/* Left — copy */}
          <div>
            <span className="co-eyebrow" data-reveal>O que é a Reminder AI</span>
            <h2 className="co-h2" data-reveal style={{ marginBottom: '24px' }}>
              Não substituímos<br />os seus sistemas.<br />
              <span style={{ color: 'var(--co-blue)' }}>Fazemos o trabalho<br />entre eles.</span>
            </h2>
            <p className="co-body" data-reveal style={{ marginBottom: '24px' }}>
              O seu CRM sabe o que foi vendido. O seu sistema de gestão sabe o que precisa de ser feito. O email sabe o que o cliente respondeu. O Slack ou Teams sabe o que a equipa discutiu.
            </p>
            <p className="co-body" data-reveal style={{ marginBottom: '32px' }}>
              Mas alguém continua a ter de ligar tudo.
            </p>

            <div data-reveal style={{
              padding: '20px 24px', background: 'var(--co-black)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
            }}>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: '0 0 12px 0' }}>
                A Reminder AI é uma camada de execução que trabalha sobre as ferramentas que a sua empresa já utiliza.
              </p>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, margin: 0 }}>
                Lê o contexto, decide o próximo passo dentro das regras definidas, executa a ação, verifica o resultado e continua o processo. Quando é necessária decisão humana, encaminha a exceção para a pessoa certa.
              </p>
            </div>
          </div>

          {/* Right — systems diagram */}
          <div data-reveal>
            <div style={{ border: '1px solid var(--co-line)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--co-line)', background: 'var(--co-surface)' }}>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'var(--co-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Os seus sistemas atuais
                </span>
              </div>
              {SYSTEMS.map((s, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '120px 1fr',
                  padding: '16px 24px', borderBottom: '1px solid var(--co-line)',
                  alignItems: 'center', gap: '16px',
                }}>
                  <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', fontWeight: 600, color: 'var(--co-ink)' }}>{s.label}</span>
                  <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', color: 'var(--co-muted)' }}>{s.desc}</span>
                </div>
              ))}
              <div style={{ padding: '20px 24px', background: 'var(--co-black)', borderTop: '2px solid var(--co-blue)' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'var(--co-blue)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Reminder AI — Camada de execução
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                  Os seus sistemas continuam a ser os sistemas de registo.
                  A Reminder AI torna-os sistemas de ação.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
