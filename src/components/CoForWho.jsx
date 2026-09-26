import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const GOOD = [
  'Tem vários projetos em simultâneo',
  'O crescimento está a pressionar a operação',
  'A equipa passa demasiado tempo a perseguir informação',
  'Existem várias pessoas envolvidas na entrega',
  'Usa vários sistemas (CRM, PSA, project management, email…)',
  'Existe um processo repetível com um resultado mensurável',
]

const BAD = [
  'Tem poucos clientes ou projetos',
  'Cada projeto é completamente diferente',
  'Ainda não existe qualquer processo definido',
  'Procura apenas um chatbot',
  'Quer substituir imediatamente o seu CRM ou PSA',
]

export default function CoForWho() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        y: 24, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="co-section co-section--surface" id="para-quem">
      <div className="co-container">

        <div style={{ maxWidth: '560px', marginBottom: '56px' }}>
          <span className="co-eyebrow" data-reveal>Para quem é</span>
          <h2 className="co-h2" data-reveal>
            Criado para empresas B2B onde cada novo cliente ou projeto cria trabalho operacional recorrente.
          </h2>
        </div>

        <div className="co-grid-2 co-grid-stk" data-reveal style={{ gap: 'clamp(20px, 3vw, 40px)', maxWidth: '900px' }}>

          {/* Good */}
          <div className="co-card">
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399' }} />
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'var(--co-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ideal para</span>
            </div>
            {GOOD.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 0', borderBottom: i < GOOD.length - 1 ? '1px solid var(--co-line)' : 'none',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--co-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'var(--co-ink)', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Bad */}
          <div className="co-card" style={{ background: 'var(--co-surface)' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--co-line)' }} />
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'var(--co-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Não é para</span>
            </div>
            {BAD.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '10px 0', borderBottom: i < BAD.length - 1 ? '1px solid var(--co-line)' : 'none',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--co-line)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'var(--co-subtle)' }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--co-line)' }}>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '12px', color: 'var(--co-subtle)', margin: 0, lineHeight: 1.6 }}>
                Não vendemos IA. Vendemos capacidade operacional. Trabalhamos onde o impacto é real e mensurável.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
