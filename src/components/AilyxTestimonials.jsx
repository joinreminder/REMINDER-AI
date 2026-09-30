import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: 'Em 30 dias passámos de 3 para 14 reuniões qualificadas por mês. A equipa agora só entra quando há oportunidade real.',
    name: 'Pedro C.',
    role: 'CEO · Consultoria B2B',
    initials: 'PC',
    color: '#5aabff',
  },
  {
    quote: 'O sistema é cirúrgico. Leads que ficavam esquecidas por semanas têm resposta em minutos. A taxa de conversão triplicou.',
    name: 'Ana F.',
    role: 'Head of Sales · SaaS',
    initials: 'AF',
    color: '#4ade80',
  },
  {
    quote: 'Sem contratar mais ninguém, o nosso pipeline cresceu 4x. Ainda não acredito que foi em apenas um mês.',
    name: 'Ricardo M.',
    role: 'Fundador · Serviços Profissionais',
    initials: 'RM',
    color: '#f59e0b',
  },
]

// Scattered absolute avatars, split left/right of center
const FLOATERS = [
  { top: '14%', left: '3%',  size: 62, ti: 0 },
  { top: '60%', left: '7%',  size: 50, ti: 1 },
  { top: '80%', left: '20%', size: 42, ti: 2 },
  { top:  '8%', left: '87%', size: 68, ti: 2 },
  { top: '55%', left: '86%', size: 54, ti: 0 },
  { top: '78%', left: '75%', size: 46, ti: 1 },
]

export default function AilyxTestimonials() {
  const sectionRef = useRef(null)
  const quoteRef   = useRef(null)
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from('.testi-floater', {
        scale: 0, opacity: 0, duration: 0.65, ease: 'back.out(1.4)', stagger: 0.07,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
      })
      gsap.from(quoteRef.current, {
        y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.25,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  function switchTo(i) {
    if (i === active || fading) return
    setFading(true)
    gsap.to(quoteRef.current, {
      opacity: 0, y: -10, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        setActive(i)
        setFading(false)
        gsap.fromTo(quoteRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        )
      },
    })
  }

  const t = TESTIMONIALS[active]

  return (
    <section ref={sectionRef} style={{
      background: '#040d1f',
      padding: 'clamp(80px, 10vw, 120px) 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />

      {/* Floating avatar circles — hidden on mobile via class */}
      {FLOATERS.map((f, i) => {
        const tv = TESTIMONIALS[f.ti]
        return (
          <div key={i} className="testi-floater testi-floater-hide-mobile" style={{
            position: 'absolute', top: f.top, left: f.left,
            width: f.size, height: f.size, borderRadius: '50%',
            background: `${tv.color}10`,
            border: `2px solid ${tv.color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: Math.round(f.size * 0.28), color: tv.color,
            userSelect: 'none',
            boxShadow: `0 0 ${Math.round(f.size * 0.5)}px ${tv.color}08`,
          }}>
            {tv.initials}
          </div>
        )
      })}

      <div className="ayl-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>

          {/* Section label */}
          <div style={{
            fontSize: '11px', fontWeight: 700,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: '44px',
          }}>
            O que dizem os clientes
          </div>

          {/* Animated quote block */}
          <div ref={quoteRef}>
            <p style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: 'clamp(19px, 2.8vw, 30px)',
              color: '#fff', lineHeight: 1.5,
              margin: '0 0 36px',
              letterSpacing: '-0.02em',
            }}>
              &ldquo;{t.quote}&rdquo;
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: `${t.color}18`, border: `2px solid ${t.color}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '12px', color: t.color, marginBottom: '6px',
              }}>
                {t.initials}
              </div>
              <span style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '14px', color: t.color,
              }}>
                {t.name}
              </span>
              <span style={{
                fontSize: '12px', color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.04em',
              }}>
                {t.role}
              </span>
            </div>
          </div>

          {/* Navigation dots */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '40px' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => switchTo(i)}
                aria-label={`Testemunho ${i + 1}`}
                style={{
                  width: i === active ? 28 : 8, height: 8,
                  borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0,
                  background: i === active ? '#5aabff' : 'rgba(255,255,255,0.14)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

        </div>
      </div>

      <p style={{
        textAlign: 'center', marginTop: '36px',
        fontSize: '11px', color: 'rgba(255,255,255,0.18)',
        fontStyle: 'italic', position: 'relative', zIndex: 2,
      }}>
        Depoimentos de clientes da fase de piloto.
      </p>

      <style>{`
        @media (max-width: 768px) {
          .testi-floater-hide-mobile { display: none !important; }
        }
      `}</style>
    </section>
  )
}
