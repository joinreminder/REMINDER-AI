import { useEffect, useState } from 'react'
import HeroBg from './HeroBg'

const PROOF = [
  { value: '−62%', label: 'Redução de faltas' },
  { value: '4.5×', label: 'ROI médio em 90 dias' },
  { value: '4–6 sem.', label: 'Primeiros resultados' },
]

const NOTIFICATIONS = [
  {
    icon: '✅',
    label: 'Consulta confirmada automaticamente',
    sub: 'Dr. Carlos M. · amanhã às 10h30',
    time: 'agora mesmo',
    accent: '#16C784',
  },
  {
    icon: '💬',
    label: 'Follow-up de tratamento enviado',
    sub: 'Ana P. · plano de €2.100 · proposto há 3 dias',
    time: '2 min atrás',
    accent: 'var(--purple)',
  },
  {
    icon: '🔄',
    label: 'Paciente inativo reativado',
    sub: 'Maria S. · última consulta há 9 meses',
    time: '18 min atrás',
    accent: '#2563EB',
  },
  {
    icon: '📉',
    label: 'Falta evitada — consulta mantida',
    sub: 'João F. · teria cancelado sem confirmação',
    time: '1h atrás',
    accent: '#16C784',
  },
]

const MINI_STATS = [
  { val: '+€4.200', label: 'este mês' },
  { val: '−58%', label: 'faltas' },
  { val: '31', label: 'reativações' },
  { val: '4.8×', label: 'ROI' },
]

const TOASTS = [
  { clinic: 'Clínica Dental Premium', city: 'Porto' },
  { clinic: 'Centro de Fisioterapia Costa', city: 'Lisboa' },
  { clinic: 'Clínica Estética Bela Vida', city: 'Braga' },
  { clinic: 'Clínica Oral Dr. Silva', city: 'Coimbra' },
  { clinic: 'Medicina Estética Norte', city: 'Viana do Castelo' },
]

function LiveToast() {
  const [idx, setIdx] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const first = setTimeout(() => setShow(true), 3500)
    const interval = setInterval(() => {
      setShow(false)
      setTimeout(() => {
        setIdx(p => (p + 1) % TOASTS.length)
        setShow(true)
      }, 500)
    }, 6000)
    return () => { clearTimeout(first); clearInterval(interval) }
  }, [])

  const t = TOASTS[idx]
  return (
    <div className={`hero-toast${show ? ' hero-toast--show' : ''}`} aria-live="polite" aria-atomic="true">
      <span className="hero-toast__dot" />
      <div className="hero-toast__body">
        <span className="hero-toast__label">Diagnóstico marcado agora</span>
        <span className="hero-toast__clinic">{t.clinic} · {t.city}</span>
      </div>
    </div>
  )
}

function HeroNotifPanel() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(false)
      setTimeout(() => {
        setActiveIdx(prev => (prev + 1) % NOTIFICATIONS.length)
        setPulse(true)
      }, 250)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hero-notif" role="img" aria-label="Sistema Reminder em funcionamento — notificações em tempo real">

      <div className="hero-notif__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="hero-notif__live-dot" />
          <span className="hero-notif__title">Reminder · Sistema ao vivo</span>
        </div>
        <span className="hero-notif__badge">Ativo</span>
      </div>

      <div className="hero-notif__body">
        {NOTIFICATIONS.map((n, i) => {
          const isActive = i === activeIdx
          return (
            <div
              key={i}
              className={`hero-notif__item${isActive ? ' hero-notif__item--active' : ''}`}
              style={isActive ? { borderColor: n.accent, opacity: pulse ? 1 : 0.6 } : {}}
            >
              <span className="hero-notif__icon">{n.icon}</span>
              <div className="hero-notif__content">
                <div className="hero-notif__label">{n.label}</div>
                <div className="hero-notif__sub">{n.sub}</div>
              </div>
              <span className="hero-notif__time">{n.time}</span>
            </div>
          )
        })}
      </div>

      <div className="hero-notif__stats">
        {MINI_STATS.map(s => (
          <div key={s.label} className="hero-notif__stat">
            <div className="hero-notif__stat-val">{s.val}</div>
            <div className="hero-notif__stat-label">{s.label}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <HeroBg />

      <div className="container hero__container">
        <div className="hero__split">

          {/* LEFT */}
          <div className="hero__split-left">

            <div className="hero__eyebrow-pill">
              <span className="hero__eyebrow-dot" />
              <span>Clinic Growth Partner · Clínicas Privadas · Portugal</span>
            </div>

            <h1 className="h1 hero__headline" style={{ textAlign: 'left', color: 'white' }}>
              Recupere{' '}
              <mark>€3.000–€8.000/mês</mark><br />
              das consultas que já tem.
            </h1>

            <p className="hero__sub" style={{ textAlign: 'left', margin: '0 0 40px' }}>
              Faltas sem aviso, tratamentos não seguidos, pacientes desaparecidos —
              calculamos a perda exacta em euros e implementamos o sistema que a elimina
              em 4 a 6 semanas. Sem parar a clínica. Sem contratar mais ninguém.
            </p>

            <div className="hero__cta hero__cta--double" style={{ justifyContent: 'flex-start' }}>
              <a href="#final-cta" className="btn btn--primary btn--xl btn--pulse">
                Calcular quanto perco por mês →
              </a>
              <a href="#como-funciona" className="btn btn--ghost-white btn--xl">
                Ver como funciona
              </a>
            </div>

            <div className="hero__trust-row">
              {['Diagnóstico gratuito', '15 minutos', 'Sem compromisso'].map(t => (
                <span key={t} className="hero__trust-chip">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="6" fill="#16C784" fillOpacity="0.15"/>
                    <path d="M3.5 6l1.8 1.8L8.5 4" stroke="#16C784" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>

            {/* Social proof micro-testimonial */}
            <div className="hero__mini-proof">
              <div className="hero__mini-proof-stars">★★★★★</div>
              <p className="hero__mini-proof-quote">
                "O diagnóstico mostrou-me que perdia €4.000/mês. Em 5 semanas tudo mudou — +€3.200 por mês de receita recuperada."
              </p>
              <span className="hero__mini-proof-author">Dra. Mariana F. · Diretora Clínica · Lisboa</span>
            </div>

            {/* Proof strip */}
            <div className="hero__proof-strip">
              {PROOF.map((s, i) => (
                <div key={s.label} className="hero__proof-item"
                  style={{ borderRight: i < PROOF.length - 1 ? '1px solid rgba(255,255,255,0.18)' : 'none' }}>
                  <div className="hero__proof-val">{s.value}</div>
                  <div className="hero__proof-label">{s.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div className="hero__split-right">
            <HeroNotifPanel />
            <LiveToast />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <span>Veja os números</span>
        <div className="hero__scroll-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>

    </section>
  )
}
