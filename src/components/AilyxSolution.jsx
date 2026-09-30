import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DELIVERABLES = [
  { num: '01', title: 'Principal ponto de fuga', desc: 'Onde se perdem mais oportunidades.' },
  { num: '02', title: 'Causa provável', desc: 'O que está a criar o problema.' },
  { num: '03', title: 'Prioridade', desc: 'O que faria sentido corrigir primeiro.' },
  { num: '04', title: 'Oportunidades de automação', desc: 'Onde a IA pode retirar trabalho manual.' },
  { num: '05', title: 'Próximos passos', desc: 'Recomendação personalizada para o seu caso.' },
]

export default function AilyxSolution() {
  const contentRef = useRef(null)
  const mockupRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: contentRef.current, start: 'top 78%', once: true },
      })
      if (mockupRef.current) {
        gsap.from(mockupRef.current, {
          y: 40, opacity: 0, scale: 0.97, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: mockupRef.current, start: 'top 82%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#06142e', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid rgba(33,127,241,0.15)' }}>
      <div className="ayl-container">
        <div ref={contentRef} style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div style={{
            alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(33,127,241,0.18)', border: '1px solid rgba(33,127,241,0.3)',
            borderRadius: '100px', padding: '5px 14px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#90c8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Comece aqui
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(24px, 3vw, 40px)',
            color: '#fff', lineHeight: 1.12, letterSpacing: '-0.04em', margin: 0,
          }}>
            Descubra onde está a perder oportunidades.
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
            Responda a algumas perguntas sobre o seu processo comercial. Em 60 segundos, identificamos o principal gargalo e enviamos um roadmap personalizado.
          </p>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.6, margin: 0, fontWeight: 600 }}>
            Analisamos e identificamos:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '480px', margin: '0 auto', textAlign: 'left' }}>
            {DELIVERABLES.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
              }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '13px', color: '#5aabff', minWidth: '24px', flexShrink: 0 }}>
                  {item.num}
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '2px' }}>{item.title}</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="/roadmap" style={{
            background: '#217FF1', color: '#fff',
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: '15px', padding: '18px 36px',
            borderRadius: '14px', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', alignSelf: 'center',
            boxShadow: '0 8px 32px rgba(33,127,241,0.45)',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(33,127,241,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(33,127,241,0.45)' }}
          >
            RECEBER O MEU ROADMAP →
          </a>

          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
            Gratuito · 60 segundos · Sem compromisso
          </span>

        </div>

        {/* Roadmap mockup */}
        <div ref={mockupRef} style={{
          maxWidth: '440px', margin: '48px auto 0',
          padding: '24px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
        }}>
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '16px' }}>
            O SEU CONVERSION ROADMAP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Principal ponto de fuga', value: 'Follow-up' },
              { label: 'Impacto', value: 'Alto' },
              { label: 'Prioridade', value: 'Automatizar follow-up' },
              { label: 'Oportunidade de automação', value: 'AI Lead Engagement' },
              { label: 'Próximo passo', value: 'Piloto controlado' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{row.label}</span>
                <span style={{ fontSize: '12px', color: '#5aabff', fontWeight: 600 }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
