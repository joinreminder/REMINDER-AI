import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DELIVERABLES = [
  { num: '01', title: 'Perfil de Conversão', desc: 'Uma visão geral do seu processo atual de conversão.' },
  { num: '02', title: 'Principal Gargalo', desc: 'Identificamos a área que apresenta maior oportunidade de melhoria.' },
  { num: '03', title: 'Prioridades', desc: 'Descubra o que deve corrigir primeiro — em vez de tentar melhorar tudo ao mesmo tempo.' },
  { num: '04', title: 'Roadmap de Conversão', desc: 'Receba as etapas recomendadas para melhorar o caminho: Lead → Contacto → Follow-up → Qualificação → Reunião' },
  { num: '05', title: 'Próximo Passo', desc: 'Uma recomendação clara sobre o que faz sentido testar a seguir.' },
]

export default function AilyxIntegrations() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      itemsRef.current.filter(Boolean).forEach((item, i) => {
        gsap.from(item, {
          y: 20, opacity: 0, duration: 0.5, ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#06142e',
        padding: 'clamp(64px, 8vw, 100px) 0',
        borderTop: '1px solid rgba(33,127,241,0.15)',
      }}
    >
      <div className="ayl-container">

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(33,127,241,0.18)', border: '1px solid rgba(33,127,241,0.3)',
            borderRadius: '100px', padding: '5px 14px', marginBottom: '16px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#90c8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Incluído no roadmap
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(22px, 2.8vw, 36px)',
            color: '#fff', letterSpacing: '-0.03em',
            lineHeight: 1.15, margin: '0 0 10px',
          }}>
            O que recebe gratuitamente
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', maxWidth: '460px', margin: '0 auto', lineHeight: 1.55 }}>
            O seu Roadmap Personalizado de Conversão
          </p>
        </div>

        {/* Deliverables list */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: '12px', maxWidth: '600px', margin: '0 auto',
        }}>
          {DELIVERABLES.map((item, i) => (
            <div
              key={i}
              ref={el => itemsRef.current[i] = el}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '16px',
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
              }}
            >
              {/* Checkmark + number */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px', flexShrink: 0,
                background: 'rgba(33,127,241,0.2)',
                border: '1px solid rgba(33,127,241,0.35)',
                borderRadius: '10px',
              }}>
                <span style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 800,
                  fontSize: '13px', color: '#90c8ff',
                }}>
                  {item.num}
                </span>
              </div>

              <div>
                <div style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: '15px', color: '#fff', marginBottom: '4px',
                }}>
                  {item.title}
                </div>
                <p style={{
                  fontSize: '13.5px', color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.5, margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Price */}
        <p style={{
          textAlign: 'center', marginTop: '36px',
          fontFamily: 'Sora, sans-serif', fontWeight: 700,
          fontSize: 'clamp(18px, 2.2vw, 24px)',
          color: '#fff', lineHeight: 1.4,
        }}>
          Tudo por {'\u20AC'}0.
        </p>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href="/diagnostico" style={{
            background: '#217FF1', color: '#fff',
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: '15px', padding: '16px 32px',
            borderRadius: '14px', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center',
            boxShadow: '0 8px 32px rgba(33,127,241,0.45)',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(33,127,241,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(33,127,241,0.45)' }}
          >
            QUERO O MEU ROADMAP GRÁTIS {'\u2192'}
          </a>
        </div>

      </div>
    </section>
  )
}
