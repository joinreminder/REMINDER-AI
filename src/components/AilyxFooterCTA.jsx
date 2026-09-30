import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 'Multicanal',   label: 'O canal certo para cada oportunidade',      color: '#5aabff' },
  { value: 'Prospeção',    label: 'Prospects dentro do seu ICP',                color: '#4ade80' },
  { value: 'Qualificação', label: 'Segundo os critérios definidos consigo',     color: '#a78bfa' },
  { value: 'Resultado',    label: 'O vendedor entra quando existe algo para fechar', color: '#f59e0b' },
]

export default function AilyxFooterCTA() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 78%', once: true },
      })
      gsap.from(rightRef.current.children, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.1,
        scrollTrigger: { trigger: rightRef.current, start: 'top 78%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      background: '#06142e',
      borderTop: '1px solid rgba(33,127,241,0.15)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 480 }} className="footer-cta-grid">

        {/* Left — visual panel */}
        <div ref={leftRef} style={{
          background: 'linear-gradient(135deg, #08224e 0%, #0e3ba0 60%, #217FF1 100%)',
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'flex-end',
          padding: 'clamp(40px, 5vw, 60px)',
        }}>
          {/* Dot grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Pipeline mini-mockup */}
          <div style={{
            position: 'absolute', top: 'clamp(24px,4vw,40px)', right: 'clamp(20px,3vw,36px)',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px', overflow: 'hidden', width: 200,
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'hero-pulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Pipeline · LIVE</span>
            </div>
            {[
              { label: 'Reunião marcada',  color: '#4ade80', time: '14:30'  },
              { label: 'Lead qualificado', color: '#5aabff', time: 'há 2h'  },
              { label: 'Follow-up enviado',color: '#f59e0b', time: 'há 5h'  },
            ].map((item, i) => (
              <div key={i} style={{ padding: '9px 14px', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{item.label}</span>
                </div>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)' }}>{item.time}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px 24px', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(13px, 1.4vw, 17px)', color: s.color, lineHeight: 1.2 }}>{s.value}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', marginTop: '4px', lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Headline */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Pronto para colaborar?
            </div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 34px)', color: '#fff', lineHeight: 1.2, margin: 0, letterSpacing: '-0.03em' }}>
              Nós tratamos do<br />caminho até à reunião.
            </p>
          </div>
        </div>

        {/* Right — CTA panel */}
        <div ref={rightRef} style={{
          background: '#06142e',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: 'clamp(40px, 5vw, 72px)',
          gap: '20px',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(33,127,241,0.18)', border: '1px solid rgba(33,127,241,0.3)',
            borderRadius: '100px', padding: '5px 14px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#90c8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Gratuito · Sem compromisso
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(22px, 2.8vw, 38px)',
            color: '#fff', lineHeight: 1.15,
            letterSpacing: '-0.03em', margin: 0,
          }}>
            Quantas oportunidades estão a ficar pelo caminho?
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', margin: 0, lineHeight: 1.65 }}>
            Descubra onde o seu processo comercial está a perder prospects e quanto potencial de reuniões pode existir sem contratar mais vendedores.
          </p>

          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: 0, lineHeight: 1.65 }}>
            Receba um roadmap personalizado do seu processo comercial.
          </p>

          <a href="/roadmap" className="ayl-btn ayl-btn--primary" style={{ fontSize: '15px', padding: '18px 36px', marginTop: '4px' }}>
            RECEBER O MEU ROADMAP →
          </a>

          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            60 segundos · Gratuito · Sem compromisso
          </span>

          {/* Risk reversal */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '4px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontSize: '12px', color: 'rgba(74,222,128,0.7)', lineHeight: 1.5 }}>
              Definimos consigo os critérios de uma reunião qualificada e os objectivos da operação antes de começar. Se não atingirmos o objectivo acordado no primeiro ciclo, continuamos a trabalhar sem cobrar o mês seguinte até o atingir.
            </span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
