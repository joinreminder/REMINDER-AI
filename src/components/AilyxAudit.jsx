import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DIMENSIONS = [
  {
    num: '01',
    title: 'Tempo de resposta',
    question: 'Com que rapidez está a contactar os novos leads?',
    desc: 'Quanto mais tempo passa entre a entrada do lead e o primeiro contacto, maior pode ser a oportunidade de melhoria.',
  },
  {
    num: '02',
    title: 'Follow-up',
    question: 'O que acontece quando o lead não responde?',
    desc: 'Um contacto único raramente representa um processo completo.',
  },
  {
    num: '03',
    title: 'Qualificação',
    question: 'Como determina se existe uma oportunidade real?',
    desc: 'Critérios claros tornam o processo mais consistente.',
  },
  {
    num: '04',
    title: 'Lead \u2192 Reunião',
    question: 'Quantos leads chegam efetivamente ao calendário da equipa comercial?',
    desc: 'É aqui que o esforço de aquisição começa a transformar-se em pipeline.',
  },
  {
    num: '05',
    title: 'Consistência do processo',
    question: 'Existe um processo definido ou cada lead é tratado de forma diferente?',
    desc: 'Quanto mais consistente o processo, mais fácil é medir e melhorar.',
  },
]

export default function AilyxAudit() {
  const headRef  = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 76%', once: true },
      })
      cardsRef.current.filter(Boolean).forEach((card) => {
        gsap.fromTo(card,
          { y: 120, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#F3F6FB', padding: 'clamp(80px, 10vw, 120px) 0 0', borderTop: '1px solid #e8edf5' }} id="audit">
      <div className="ayl-container">
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#217FF1', borderRadius: '100px', padding: '6px 18px', marginBottom: '20px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'white', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Análise completa
            </span>
          </div>
          <h2 className="ayl-h2" style={{ marginBottom: '12px', color: '#0a1c42' }}>
            O seu Roadmap analisa 5 dimensões do processo
          </h2>
        </div>
      </div>

      {/* Sticky stacking cards */}
      <div style={{ position: 'relative' }}>
        {DIMENSIONS.map((dim, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            style={{
              position: 'sticky',
              top: `${100 + i * 28}px`,
              marginBottom: '40px',
              zIndex: i + 1,
            }}
          >
            <div className="ayl-container">
              <div
                className="ayl-card--hover"
                style={{
                  background: '#fff',
                  border: '1.5px solid #e8edf5',
                  borderRadius: '24px',
                  padding: 'clamp(32px, 4vw, 48px) clamp(28px, 4vw, 56px)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.5fr',
                  gap: '40px',
                  alignItems: 'center',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                  minHeight: '200px',
                }}
              >
                {/* Left — number + title */}
                <div>
                  <div style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 800,
                    fontSize: 'clamp(56px, 6vw, 80px)',
                    color: 'rgba(33,127,241,0.12)',
                    lineHeight: 1, letterSpacing: '-0.04em',
                    marginBottom: '12px',
                  }}>
                    {dim.num}
                  </div>
                  <h3 style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    color: '#0a1c42',
                    letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0,
                  }}>
                    {dim.title}
                  </h3>
                </div>

                {/* Right — question + description */}
                <div>
                  <p style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 600,
                    fontSize: '17px', color: '#217FF1',
                    lineHeight: 1.5, margin: '0 0 12px 0',
                  }}>
                    {dim.question}
                  </p>
                  <p style={{
                    fontSize: '16px', color: '#555',
                    lineHeight: 1.7, margin: 0, maxWidth: '520px',
                  }}>
                    {dim.desc}
                  </p>
                  <div style={{
                    marginTop: '20px',
                    width: '40px', height: '3px', borderRadius: '2px',
                    background: '#217FF1', opacity: 0.6,
                  }} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: '100px' }} />
      </div>
    </section>
  )
}
