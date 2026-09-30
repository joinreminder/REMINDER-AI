import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AilyxTeam() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: contentRef.current, start: 'top 76%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid #e8edf5' }}>
      <div className="ayl-container">
        <div ref={contentRef} style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <h2 className="ayl-h2" style={{ color: '#0a1c42', marginBottom: '0' }}>
            Já está a gerar leads. O próximo crescimento pode estar aqui.
          </h2>

          <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.7, margin: 0 }}>
            Imagine que, sempre que uma lead entra:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '480px', margin: '0 auto' }}>
            {[
              'É contactada rapidamente.',
              'Recebe follow-up sem depender da sua equipa.',
              'É qualificada.',
              'É acompanhada até estar pronta.',
              'E, quando existe uma oportunidade real, marca uma reunião.',
            ].map((s, i) => (
              <p key={i} style={{ fontSize: '15px', color: '#0a1c42', lineHeight: 1.6, margin: 0, fontWeight: 700 }}>{s}</p>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '480px', margin: '0 auto' }}>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.6, margin: 0 }}>Sem depender de alguém se lembrar.</p>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.6, margin: 0 }}>Sem deixar leads esquecidas no CRM.</p>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.6, margin: 0 }}>Sem obrigar a equipa comercial a passar o dia a perseguir oportunidades.</p>
          </div>

          <div style={{
            marginTop: '8px', padding: '20px 28px',
            background: '#06142e', border: '1px solid rgba(33,127,241,0.2)',
            borderRadius: '14px',
          }}>
            <p style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: '15px', color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6, margin: 0,
            }}>
              Mais leads não são necessariamente a resposta.<br />
              <span style={{ color: '#5aabff' }}>Mais reuniões a partir dos leads que já gera podem ser.</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
