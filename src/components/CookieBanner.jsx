import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so it doesn't flash on initial load
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'all')
    setVisible(false)
  }

  function necessary() {
    localStorage.setItem(STORAGE_KEY, 'necessary')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)', maxWidth: '680px',
      background: 'rgba(8, 18, 42, 0.97)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '18px',
      padding: '20px 24px',
      display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
      zIndex: 9999,
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(33,127,241,0.1)',
      animation: 'cookie-slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
    }}>

      <style>{`
        @keyframes cookie-slide-up {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Icon */}
      <span style={{ fontSize: '22px', flexShrink: 0 }}>🍪</span>

      {/* Text */}
      <p style={{
        flex: 1, minWidth: '200px',
        fontSize: '13.5px', color: 'rgba(255,255,255,0.65)',
        lineHeight: 1.6, margin: 0,
        fontFamily: 'Inter, sans-serif',
      }}>
        Utilizamos cookies para melhorar a sua experiência.{' '}
        <Link to="/cookies" style={{ color: '#5aabff', textDecoration: 'none' }}>
          Política de Cookies
        </Link>
        {' '}·{' '}
        <Link to="/privacidade" style={{ color: '#5aabff', textDecoration: 'none' }}>
          Privacidade
        </Link>
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
        <button
          onClick={necessary}
          style={{
            padding: '9px 18px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '10px',
            fontSize: '13px', fontWeight: 600,
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            fontFamily: 'Sora, sans-serif',
            transition: 'border-color 0.15s, color 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
        >
          Apenas necessários
        </button>
        <button
          onClick={accept}
          style={{
            padding: '9px 20px',
            background: '#217FF1',
            border: '1px solid transparent',
            borderRadius: '10px',
            fontSize: '13px', fontWeight: 700,
            color: '#fff',
            cursor: 'pointer',
            fontFamily: 'Sora, sans-serif',
            transition: 'background 0.15s, box-shadow 0.15s',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(33,127,241,0.4)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1a6fdb'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(33,127,241,0.55)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#217FF1'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(33,127,241,0.4)' }}
        >
          Aceitar todos
        </button>
      </div>

    </div>
  )
}
