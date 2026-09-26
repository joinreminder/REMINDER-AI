import { useState, useEffect } from 'react'

const LINKS = [
  { href: '#mecanismo', label: 'Como funciona' },
  { href: '#o-que-executamos', label: 'AI Workers' },
  { href: '#oferta', label: 'Implementação' },
  { href: '#para-quem', label: 'Para quem é' },
  { href: '#faq', label: 'FAQ' },
]

export default function CoNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`co-nav${scrolled ? ' co-nav--scrolled' : ''}`}>
      <div className="co-nav__inner">
        <a href="/ai-operations" className="co-nav__logo">
          <img src="/logotipo-editado.png" alt="" className="co-nav__logo-bird" />
          <span className="co-nav__logo-text">
            Reminder<span className="co-nav__logo-ai"> AI</span>
          </span>
        </a>

        <div className="co-nav__links">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="co-nav__link">{l.label}</a>
          ))}
        </div>

        <a href="#cta-final" className="co-nav__cta">Diagnóstico gratuito →</a>

        <button className="co-nav__burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="co-nav__mobile-menu">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="co-nav__mobile-link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#cta-final" className="co-nav__mobile-cta" onClick={() => setOpen(false)}>
            Diagnóstico gratuito →
          </a>
        </div>
      )}
    </nav>
  )
}
