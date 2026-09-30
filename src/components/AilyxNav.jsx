import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { href: '#como-funciona', label: 'Método Reminder™' },
  { href: '#resultados',    label: 'Resultados' },
  { href: '#para-quem',     label: 'Para quem é' },
  { href: '#faq',           label: 'FAQ' },
]

export default function AilyxNav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const navRef = useRef(null)
  const { pathname } = useLocation()
  const isDiag = pathname === '/roadmap' || pathname === '/obrigado'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const close = () => setMenuOpen(false)

  return (
    <nav className={`ayl-nav${scrolled ? ' ayl-nav--scrolled' : ''}${isDiag ? ' ayl-nav--blue' : ''}${menuOpen ? ' ayl-nav--open' : ''}`} ref={navRef}>
      <div className="ayl-nav__inner">
        <Link to="/" className="ayl-nav__logo" onClick={close}>
          <img src="/logotipo-editado.png" alt="" width={310} height={306} className="ayl-nav__logo-bird" />
          <span className="ayl-nav__logo-mark">
            <span className="ayl-nav__logo-remindr">Reminder</span>
          </span>
        </Link>

        <div className="ayl-nav__links">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="ayl-nav__link">
              <span className="ayl-nav__link-inner">
                <span>{l.label}</span>
                <span aria-hidden="true">{l.label}</span>
              </span>
            </a>
          ))}
        </div>

        <a href="/roadmap" className="ayl-btn ayl-btn--nav ayl-nav__cta-desktop">
          Roadmap Gratuito →
        </a>

        <button
          className={`ayl-nav__burger${menuOpen ? ' ayl-nav__burger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`ayl-nav__mobile${menuOpen ? ' ayl-nav__mobile--open' : ''}`}>
        <div className="ayl-nav__mobile-links">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="ayl-nav__mobile-link" onClick={close}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="/roadmap" className="ayl-nav__mobile-cta" onClick={close}>
          Roadmap Gratuito →
        </a>
      </div>
    </nav>
  )
}
