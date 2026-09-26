import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const flowSteps = [
  'Oportunidade identificada e registada automaticamente',
  'Follow-up executado sem depender de ninguém se lembrar',
  'Informação centralizada e disponível em tempo real',
  'Próximo passo activado sem intervenção manual',
]

export default function RHero() {
  const navigate = useNavigate()
  const badgeRef    = useRef(null)
  const headlineRef = useRef(null)
  const subRef      = useRef(null)
  const actionsRef  = useRef(null)
  const panelRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(badgeRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.15 })
        .fromTo(headlineRef.current, { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.3')
        .fromTo(subRef.current,      { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.55')
        .fromTo(actionsRef.current,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.45')
        .fromTo(panelRef.current,    { x: 48, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0 }, '-=0.85')
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      background: 'linear-gradient(135deg, #040e22 0%, #071635 55%, #0a1c42 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(100px, 12vw, 140px) 0 clamp(80px, 10vw, 120px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.12,
        backgroundImage: 'radial-gradient(circle, rgba(33,127,241,0.5) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />
      {/* Ambient glow right */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%',
        width: '55vw', height: '55vw',
        background: 'radial-gradient(circle, rgba(33,127,241,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Ambient glow bottom-left */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%',
        width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(33,127,241,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="ayl-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="r-hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}>

          {/* ── Left: Copy ───────────────────────────────── */}
          <div>
            <div ref={badgeRef} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(33,127,241,0.15)',
              border: '1px solid rgba(33,127,241,0.3)',
              borderRadius: '100px', padding: '6px 16px', marginBottom: '32px',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#217FF1', flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#90c8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Para empresas de serviços · 10–100 colaboradores
              </span>
            </div>

            <h1 ref={headlineRef} style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: 'clamp(34px, 4.2vw, 60px)',
              color: '#fff', lineHeight: 1.1,
              letterSpacing: '-0.05em', marginBottom: '24px',
            }}>
              A sua empresa pode crescer sem aumentar a equipa na mesma proporção.
            </h1>

            <p ref={subRef} style={{
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.75, marginBottom: '40px', maxWidth: '500px',
            }}>
              Se já tem clientes e volume de negócio — mas o crescimento fica preso em follow-ups e tarefas manuais — existe capacidade escondida. Em 60 minutos identificamos onde está e o que construir primeiro para a capturar.
            </p>

            <div ref={actionsRef} style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <button
                className="ayl-btn"
                style={{
                  background: '#217FF1', color: '#fff',
                  border: 'none', borderRadius: '14px',
                  padding: '17px 34px', fontSize: '15px', fontWeight: 700,
                  cursor: 'pointer', letterSpacing: '-0.02em',
                  fontFamily: 'Sora, sans-serif',
                  boxShadow: '0 8px 32px rgba(33,127,241,0.35)',
                  transition: 'background 0.2s',
                }}
                onClick={() => navigate('/diagnostico')}
              >
                Ver onde estou a perder capacidade →
              </button>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
                Gratuito · 60 min · Sem compromisso
              </span>
            </div>
          </div>

          {/* ── Right: Flow panel ────────────────────────── */}
          <div ref={panelRef} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '24px',
            padding: 'clamp(28px, 3vw, 36px)',
            backdropFilter: 'blur(16px)',
          }}>
            <div style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
              marginBottom: '14px',
            }}>
              EVENTO NA EMPRESA
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '10px', padding: '14px 16px', marginBottom: '20px',
              fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5,
            }}>
              Lead recebido · Proposta enviada · Tarefa repetitiva detectada
            </div>

            <div style={{ textAlign: 'center', margin: '0 0 20px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: '#217FF1', borderRadius: '10px',
                padding: '10px 28px',
                boxShadow: '0 4px 20px rgba(33,127,241,0.4)',
              }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '13px', color: '#fff', letterSpacing: '0.08em' }}>
                  REMINDR
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {flowSteps.map((step, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  background: 'rgba(33,127,241,0.08)',
                  border: '1px solid rgba(33,127,241,0.14)',
                  borderRadius: '10px', padding: '11px 13px',
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>{step}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: '16px' }}>
              O processo acontece. A equipa concentra-se no que importa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
