import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="container">
          <div className="nav__inner">
            <a href="#" className="nav__logo" aria-label="Reminder — página inicial" style={{ display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
              <img src="/logotipo-editado.png" alt="" style={{ height: 64, width: 'auto' }} />
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>Reminder</span>
            </a>

            <div className="nav__trust-strip">
              <span className="nav__trust-item"><span className="nav__trust-dot" />Diagnóstico gratuito</span>
              <span className="nav__trust-item">15 min · sem compromisso</span>
              <span className="nav__trust-item">🇵🇹 Equipa em Portugal</span>
            </div>

            <div className="nav__actions">
              <a href="#final-cta" className="btn btn--primary btn--sm">
                Descobrir quanto perco →
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating pill nav — Ailyx signature */}
      <div className="nav-pill">
        <a href="#hero" className="nav-pill__item nav-pill__item--icon" aria-label="Início">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </a>
        <a href="#problem" className="nav-pill__item">O Problema</a>
        <a href="#social-proof" className="nav-pill__item">Resultados</a>
        <a href="#como-funciona" className="nav-pill__item">Como Funciona</a>
        <a href="#objections" className="nav-pill__item">FAQ</a>
        <a href="#final-cta" className="nav-pill__item nav-pill__item--cta">Diagnóstico →</a>
      </div>
    </>
  )
}
