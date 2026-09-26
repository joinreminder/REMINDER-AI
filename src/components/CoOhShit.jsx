import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function CoOhShit() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        y: 32, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="co-section co-section--surface">
      <div className="co-container">

        <div style={{ maxWidth: '640px', marginBottom: '64px' }}>
          <span className="co-eyebrow" data-reveal>O Momento</span>
          <h2 className="co-h2" data-reveal style={{ marginBottom: '16px' }}>
            Imagine fechar 20 clientes<br />este mês.
          </h2>
          <p className="co-body" data-reveal>
            O que acontece a seguir depende inteiramente de como está estruturada a sua operação.
          </p>
        </div>

        <div className="co-grid-2" data-reveal>

          {/* Without */}
          <div style={{ border: '1px solid var(--co-line)', borderRadius: '10px', overflow: 'hidden', background: 'var(--co-white)' }}>
            <div style={{
              padding: '14px 24px', borderBottom: '1px solid var(--co-line)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f87171' }} />
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'var(--co-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Sem Reminder AI
              </span>
            </div>
            <div style={{ padding: '32px 24px' }}>
              <div style={{ fontFamily: 'var(--co-font-d)', fontWeight: 800, fontSize: '48px', color: 'var(--co-ink)', letterSpacing: '-0.04em', textAlign: 'center', marginBottom: '24px' }}>
                20 clientes
              </div>
              {[
                '20 onboardings manuais',
                'centenas de emails',
                'documentos a pedir',
                'tarefas a criar',
                'follow-ups a fazer',
                'horas da equipa',
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '10px 0', borderBottom: '1px solid var(--co-line)',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'var(--co-muted)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* With */}
          <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden', background: 'var(--co-black)' }}>
            <div style={{
              padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', animation: 'co-pulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Com Reminder AI
              </span>
            </div>
            <div style={{ padding: '32px 24px' }}>
              <div style={{ fontFamily: 'var(--co-font-d)', fontWeight: 800, fontSize: '48px', color: 'white', letterSpacing: '-0.04em', textAlign: 'center', marginBottom: '24px' }}>
                20 clientes
              </div>
              {[
                { label: '20 processos iniciados', hi: true },
                { label: 'AI Workers executam', hi: true },
                { label: 'documentos recolhidos', hi: false },
                { label: 'tarefas criadas', hi: false },
                { label: 'follow-ups automáticos', hi: false },
                { label: 'equipa gere exceções', hi: false },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', fontWeight: item.hi ? 600 : 400, color: item.hi ? 'white' : 'rgba(255,255,255,0.45)' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Statement */}
        <div data-reveal style={{ marginTop: '56px', borderTop: '1px solid var(--co-line)', paddingTop: '48px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--co-font-d)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--co-ink)', letterSpacing: '-0.03em', lineHeight: 1.15, margin: 0 }}>
            O volume aumenta.{' '}
            <span style={{ color: 'var(--co-blue)' }}>
              A operação não precisa de<br />aumentar na mesma proporção.
            </span>
          </p>
        </div>

      </div>
    </section>
  )
}
