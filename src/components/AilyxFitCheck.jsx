import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const YES = [
  'Recebe pedidos de potenciais clientes regularmente',
  'Alguns pedidos demoram demasiado tempo a receber resposta',
  'O follow-up depende da memória ou disponibilidade da equipa',
  'Tem oportunidades espalhadas por diferentes canais',
  'Cada novo cliente tem valor suficiente para justificar melhorar a conversão',
  'Quer perceber o que acontece a cada oportunidade depois de entrar',
]

const NO = [
  'Recebe muito poucos pedidos de orçamento',
  'Cada venda tem um valor demasiado baixo para justificar o investimento',
  'Procura apenas um chatbot ou uma ferramenta isolada',
  'Quer apenas software — sem alterar ou melhorar o processo',
]

export default function AilyxFitCheck() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -40, opacity: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
      gsap.from(rightRef.current, {
        x: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="ayl-section" ref={sectionRef} style={{ background: '#fff' }}>
      <div className="ayl-container">
        <div className="ayl-section-label">Perfil do cliente</div>
        <h2 className="ayl-h2" style={{ marginBottom: '8px' }}>
          A Reminder é para a sua empresa?
        </h2>
        <p style={{ color: '#555', fontSize: '17px', maxWidth: '540px', lineHeight: 1.6, marginBottom: '40px' }}>
          Leia antes de pedir o diagnóstico — para não perdermos o tempo de nenhum dos dois.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

          {/* YES */}
          <div ref={leftRef} style={{ background: 'white', border: '2px solid #d1fae5', borderRadius: '24px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>✓</div>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '18px', color: '#065f46' }}>
                Faz sentido se…
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {YES.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                  <span style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #d1fae5' }}>
              <a href="/diagnostico" className="ayl-btn" style={{ width: '100%', textAlign: 'center', display: 'block', boxSizing: 'border-box' }}>
                Quero perceber onde estou a perder oportunidades →
              </a>
            </div>
          </div>

          {/* NO */}
          <div ref={rightRef} style={{ background: 'white', border: '2px solid #fee2e2', borderRadius: '24px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>✕</div>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '18px', color: '#7f1d1d' }}>
                Provavelmente não faz sentido se…
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {NO.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✕</span>
                  <span style={{ fontSize: '15px', color: '#555', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #fee2e2' }}>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6, margin: 0 }}>
                Se nenhum destes pontos se aplica, provavelmente não somos o parceiro certo — e preferimos ser honestos desde o início.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
