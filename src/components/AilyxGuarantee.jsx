import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AilyxGuarantee() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const cardRef    = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: contentRef.current, start: 'top 78%', once: true },
      })
      gsap.fromTo(cardRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 78%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid #e8edf5' }}>
      <div className="ayl-container">
        <div ref={contentRef} style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>

          <div className="ayl-section-label" style={{ marginBottom: '0' }}>Próximo passo</div>

          <h2 className="ayl-h2" style={{ marginBottom: '0', color: '#0a1c42' }}>
            Quer transformar o Roadmap em execução?
          </h2>

          <p style={{ color: '#666', fontSize: '16px', lineHeight: 1.65, maxWidth: '560px', margin: 0 }}>
            O Roadmap mostra-lhe onde pode estar a perder oportunidades. O próximo passo é testar o processo com leads reais.
          </p>

          {/* Pilot Card */}
          <div ref={cardRef} style={{
            width: '100%', maxWidth: '600px',
            background: '#06142e',
            borderRadius: '20px',
            padding: 'clamp(32px, 4vw, 48px)',
            border: '1px solid rgba(33,127,241,0.2)',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px',
          }}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(33,127,241,0.15)', border: '1px solid rgba(33,127,241,0.3)',
              borderRadius: '100px', padding: '8px 22px',
            }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#94c4ff', letterSpacing: '0.04em', fontFamily: 'Sora, sans-serif' }}>
                Reminder 30-Day Pilot
              </span>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6, margin: 0, maxWidth: '480px' }}>
              Durante 30 dias, a Reminder implementa e executa o processo entre:
            </p>

            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px',
            }}>
              {['Lead', 'Contacto', 'Follow-up', 'Qualificação', 'Reunião'].map((step, i, arr) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    padding: '6px 14px', borderRadius: '100px',
                    background: 'rgba(33,127,241,0.15)',
                    border: '1px solid rgba(33,127,241,0.25)',
                    fontSize: '13px', fontWeight: 600, color: '#94c4ff',
                    fontFamily: 'Sora, sans-serif',
                  }}>
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px', fontWeight: 600 }}>→</span>
                  )}
                </span>
              ))}
            </div>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6, margin: 0, maxWidth: '480px' }}>
              Enquanto a sua equipa continua focada em:
            </p>

            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px',
            }}>
              {['Reuniões', 'Propostas', 'Negociação', 'Closing'].map((step, i, arr) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    padding: '6px 14px', borderRadius: '100px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)',
                    fontFamily: 'Sora, sans-serif',
                  }}>
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px', fontWeight: 600 }}>→</span>
                  )}
                </span>
              ))}
            </div>

            <div style={{
              marginTop: '8px', padding: '16px 24px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>
                O objetivo não é enviar mais mensagens. É transformar mais da procura que já existe em oportunidades comerciais.
              </p>
            </div>

          </div>

          <a href="/diagnostico" className="ayl-btn ayl-btn--primary" style={{ textAlign: 'center', justifyContent: 'center', fontSize: '15px', padding: '16px 36px', marginTop: '8px' }}>
            CANDIDATAR-ME AO 30-DAY PILOT →
          </a>

        </div>
      </div>
    </section>
  )
}
