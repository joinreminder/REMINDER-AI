import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function RNav() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`rnav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="rnav__inner">
        <Link to="/" className="rnav__logo">
          REMIN<span>DR</span>
        </Link>

        <ul className="rnav__links">
          <li>
            <a href="#diagnostico" onClick={e => { e.preventDefault(); scrollTo('diagnostico') }}>
              Diagnóstico
            </a>
          </li>
          <li>
            <a href="#o-que-construimos" onClick={e => { e.preventDefault(); scrollTo('o-que-construimos') }}>
              O Que Construímos
            </a>
          </li>
          <li>
            <a href="#como-funciona" onClick={e => { e.preventDefault(); scrollTo('como-funciona') }}>
              Como Funciona
            </a>
          </li>
          <li>
            <a href="#para-quem" onClick={e => { e.preventDefault(); scrollTo('para-quem') }}>
              Para Quem É
            </a>
          </li>
          <li>
            <a href="#faq" onClick={e => { e.preventDefault(); scrollTo('faq') }}>
              FAQ
            </a>
          </li>
        </ul>

        <button className="r-btn r-btn--primary" onClick={() => navigate('/diagnostico')}>
          Ver onde estou a perder capacidade →
        </button>
      </div>
    </nav>
  )
}
