import { useEffect, useState, useCallback, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AilyxNav      from './components/AilyxNav'
import AilyxMotion   from './components/AilyxMotion'
import CookieBanner  from './components/CookieBanner'

// Eager — crítico para LCP da homepage
import HomePage from './pages/HomePage'

// Lazy — carregam só quando necessário
const RoadmapPage  = lazy(() => import('./pages/DiagnosticoPage'))
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'))
const PrivacyPage  = lazy(() => import('./pages/PrivacyPage'))
const CookiesPage  = lazy(() => import('./pages/CookiesPage'))
const CoPage       = lazy(() => import('./pages/CoPage'))
const CopilotPage  = lazy(() => import('./pages/CopilotPage'))
const CrmPage      = lazy(() => import('./pages/CrmPage'))

function LenisWrapper({ children }) {
  useEffect(() => {
    if (window.innerWidth <= 900) return
    let cleanup
    Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        })
        const onScroll = () => ScrollTrigger.update()
        lenis.on('scroll', onScroll)
        const ticker = (time) => lenis.raf(time * 1000)
        gsap.ticker.add(ticker)
        gsap.ticker.lagSmoothing(0)
        cleanup = () => {
          lenis.destroy()
          gsap.ticker.remove(ticker)
        }
      }
    )
    return () => cleanup?.()
  }, [])
  return children
}

const CO_ROUTES    = ['/ai-operations', '/copilot']
const LEGAL_ROUTES = ['/privacidade', '/cookies']
const HIDE_NAV     = ['/roadmap', '/obrigado', ...LEGAL_ROUTES]

function UrgencyBar() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (HIDE_NAV.includes(pathname) || pathname.startsWith('/crm') || CO_ROUTES.includes(pathname)) return null

  return (
    <div className={`urgency-bar urgency-bar--bottom${visible ? ' urgency-bar--visible' : ''}`}>
      <span className="urgency-bar__dot" />
      <span className="urgency-bar__text">
        Descubra onde está a perder oportunidades — roadmap gratuito em 60 segundos.
      </span>
      <a href="/roadmap" className="urgency-bar__cta">
        Receber o Meu Roadmap →
      </a>
    </div>
  )
}

function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem('ann-bar') === '1')
  const { pathname } = useLocation()

  const dismiss = useCallback(() => {
    setDismissed(true)
    sessionStorage.setItem('ann-bar', '1')
    document.documentElement.style.setProperty('--bar-h', '0px')
  }, [])

  useEffect(() => {
    if (HIDE_NAV.includes(pathname) || pathname.startsWith('/crm') || CO_ROUTES.includes(pathname)) return
    document.documentElement.style.setProperty('--bar-h', dismissed ? '0px' : '36px')
  }, [dismissed, pathname])

  if (dismissed) return null
  if (HIDE_NAV.includes(pathname) || pathname.startsWith('/crm') || CO_ROUTES.includes(pathname)) return null

  return (
    <div className="ann-bar">
      <span className="ann-bar__dot" />
      <span className="ann-bar__text">
        Descubra onde está a perder oportunidades — roadmap gratuito em 60 segundos.
      </span>
      <a href="/roadmap" className="ann-bar__cta">Receber o Meu Roadmap →</a>
      <button className="ann-bar__close" onClick={dismiss} aria-label="Fechar">✕</button>
    </div>
  )
}

function LandingShell({ children }) {
  const { pathname } = useLocation()
  if (pathname.startsWith('/crm')) return children
  if (CO_ROUTES.includes(pathname)) return children
  const showNav = !HIDE_NAV.includes(pathname)
  return (
    <>
      <AilyxMotion />
      {showNav && <AilyxNav />}
      {children}
    </>
  )
}

// Fallback mínimo — evita flash branco
function PageLoader() {
  return <div style={{ minHeight: '100vh', background: '#06102a' }} />
}

export default function App() {
  return (
    <BrowserRouter>
      <UrgencyBar />
      <CookieBanner />
      <LandingShell>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={
              <LenisWrapper><HomePage /></LenisWrapper>
            } />
            <Route path="/ai-operations" element={
              <LenisWrapper><CoPage /></LenisWrapper>
            } />
            <Route path="/home"        element={<Navigate to="/" replace />} />
            <Route path="/case-studies" element={<Navigate to="/" replace />} />
            <Route path="/features"    element={<Navigate to="/" replace />} />
            <Route path="/roadmap"     element={<RoadmapPage />} />
            <Route path="/diagnostico" element={<Navigate to="/roadmap" replace />} />
            <Route path="/obrigado"    element={<ThankYouPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route path="/cookies"     element={<CookiesPage />} />
            <Route path="/copilot"     element={<CopilotPage />} />
            <Route path="/crm"         element={<CrmPage />} />
            <Route path="/crm/*"       element={<CrmPage />} />
          </Routes>
        </Suspense>
      </LandingShell>
    </BrowserRouter>
  )
}
