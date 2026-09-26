import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AilyxFooterCTA() {
  const contentRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: contentRef.current, start: 'top 75%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      background: 'linear-gradient(135deg, #08224e 0%, #1056cc 55%, #217FF1 100%)',
      padding: 'clamp(80px, 10vw, 120px) 0',
      position: 'relative',
      overflow: 'hidden',
    }} id="contact">

      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
        pointerEvents: 'none',
      }} />

      <div className="ayl-container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={contentRef} style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '100px', padding: '6px 18px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#c8e8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              O primeiro passo
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(24px, 3vw, 44px)',
            color: 'white', lineHeight: 1.12, letterSpacing: '-0.04em', margin: 0,
          }}>
            Descubra Como Transformar Mais Leads em Reuniões.
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '520px', margin: 0, lineHeight: 1.6 }}>
            Receba o seu Roadmap Personalizado de Conversão gratuitamente e descubra onde está a perder oportunidades.
          </p>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
            Menos de 60 segundos. 14 perguntas. Sem compromisso.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <a href="/diagnostico" className="ayl-btn ayl-btn--white" style={{ fontSize: '17px', padding: '18px 40px' }}>
              RECEBER O MEU ROADMAP GRÁTIS →
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
