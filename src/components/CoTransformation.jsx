import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const PAIRS = [
  { before: 'Já enviaram os documentos?',          after: 'Pendências identificadas automaticamente.' },
  { before: 'Quem ficou de tratar disto?',         after: 'Responsável identificado e notificado.' },
  { before: 'Já fizeram follow-up?',               after: 'Follow-up enviado automaticamente.' },
  { before: 'O CRM está atualizado?',              after: 'Sistema atualizado em tempo real.' },
  { before: 'Este projeto está bloqueado?',        after: 'Bloqueio detectado e escalado.' },
  { before: 'Quem está a tratar deste cliente?',   after: 'Estado e responsável visíveis.' },
]

export default function CoTransformation() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        y: 24, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="co-section co-section--surface">
      <div className="co-container">

        <div style={{ maxWidth: '600px', marginBottom: '60px' }}>
          <span className="co-eyebrow" data-reveal>A Transformação</span>
          <h2 className="co-h2" data-reveal>
            De uma equipa que persegue processos<br />para uma equipa que gere exceções.
          </h2>
        </div>

        {/* Comparison table */}
        <div data-reveal style={{ border: '1px solid var(--co-line)', borderRadius: '10px', overflow: 'hidden', background: 'var(--co-white)', maxWidth: '860px' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '12px 28px', borderRight: '1px solid var(--co-line)', borderBottom: '1px solid var(--co-line)', background: 'var(--co-surface)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f87171' }} />
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'var(--co-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Antes</span>
            </div>
            <div style={{ padding: '12px 28px', borderBottom: '1px solid var(--co-line)', background: 'var(--co-black)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', animation: 'co-pulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Depois</span>
            </div>
          </div>

          {PAIRS.map((pair, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < PAIRS.length - 1 ? '1px solid var(--co-line)' : 'none' }}>
              <div style={{ padding: '18px 28px', borderRight: '1px solid var(--co-line)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'var(--co-subtle)', fontStyle: 'italic' }}>"{pair.before}"</span>
              </div>
              <div style={{ padding: '18px 28px', background: 'rgba(13,13,13,0.02)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'var(--co-ink)', fontWeight: 500 }}>"{pair.after}"</span>
              </div>
            </div>
          ))}
        </div>

        {/* Statement */}
        <div data-reveal style={{ marginTop: '48px' }}>
          <p style={{ fontFamily: 'var(--co-font-d)', fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 30px)', color: 'var(--co-ink)', letterSpacing: '-0.025em', lineHeight: 1.3, margin: 0 }}>
            A equipa deixa de perseguir processos.{' '}
            <span style={{ color: 'var(--co-blue)' }}>Começa a gerir exceções.</span>
          </p>
        </div>

      </div>
    </section>
  )
}
