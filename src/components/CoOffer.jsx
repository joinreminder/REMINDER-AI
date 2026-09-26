import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const DELIVERABLES = [
  { n: 'S1', label: 'Mapear', desc: 'Processo atual, pessoas, sistemas, regras, exceções e pontos de fricção.' },
  { n: 'S2', label: 'Quantificar', desc: 'Volume, tempo, intervenções humanas, atrasos e custo operacional.' },
  { n: 'S3', label: 'Construir', desc: 'AI Workers, integrações, comunicações, regras e gestão de exceções.' },
  { n: 'S4', label: 'Lançar', desc: 'Testes, ajustes, formação da equipa e entrada em produção.' },
]

export default function CoOffer() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        y: 28, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="co-section co-section--dark" id="oferta">
      <div className="co-container">

        <div className="co-grid-2i co-grid-stk" style={{ gap: 'clamp(48px, 6vw, 96px)' }}>

          {/* Left — offer summary */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <span className="co-eyebrow co-eyebrow--dim" data-reveal>Implementação</span>
            <h2 className="co-h2 co-h2--white" data-reveal style={{ marginBottom: '20px' }}>
              Implementação do seu<br />primeiro<br />
              <span style={{ color: 'var(--co-blue)' }}>AI Workflow.</span>
            </h2>
            <p className="co-body co-body--dark" data-reveal style={{ marginBottom: '32px' }}>
              Não começamos por transformar a empresa inteira. Começamos por um processo. Em 4 semanas, mapeamos, construímos e colocamos o workflow em produção.
            </p>

            <div data-reveal style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Foco num processo operacional bem definido',
                'Integra com os sistemas que já usa (CRM, PSA, ERP…)',
                'Métricas e critérios de sucesso definidos antes de começar',
                'Sem caixa-preta — construído para o seu processo',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            <a href="#cta-final" className="co-btn co-btn--primary co-btn--lg" data-reveal>
              Agendar diagnóstico gratuito
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          {/* Right — deliverables list */}
          <div data-reveal style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px', overflow: 'hidden',
          }}>
            <div style={{ padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Implementação em 4 semanas · O que está incluído
              </span>
            </div>
            {DELIVERABLES.map((d, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '52px 1fr',
                padding: '20px 28px', borderBottom: i < DELIVERABLES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                alignItems: 'start',
              }}>
                <span style={{ fontFamily: 'var(--co-font-d)', fontWeight: 800, fontSize: '11px', color: 'rgba(37,99,235,0.7)', letterSpacing: '0.06em', paddingTop: '2px' }}>
                  {d.n}
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--co-font-b)', fontWeight: 600, fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '3px' }}>{d.label}</div>
                  <div style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.55 }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
