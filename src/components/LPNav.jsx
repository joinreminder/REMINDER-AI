import { useState, useEffect } from 'react'

export default function LPNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Urgency bar */}
      <div className="lp-urgency">
        <div className="lp-urgency__inner">
          <span className="lp-urgency__dot" />
          <span className="lp-urgency__text">
            Cada semana sem um processo deixa pedidos sem resposta e propostas sem follow-up.
          </span>
          <a href="/diagnostico" className="lp-urgency__cta">
            Ver diagnóstico →
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`lp-nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="lp-nav__inner">
          <a href="/" className="lp-nav__logo">
            <img
              src="/logotipo-editado.png"
              alt="Reminder"
              style={{ height: '30px', width: 'auto', filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
            />
            <span>Reminder</span>
          </a>
          <a href="/diagnostico" className="lp-nav__cta">
            Pedir Diagnóstico →
          </a>
        </div>
      </nav>
    </>
  )
}
