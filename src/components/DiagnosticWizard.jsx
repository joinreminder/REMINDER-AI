import { useState, useEffect } from 'react'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/meebdjwa'

const QUESTIONS = [
  {
    key: 'tipo',
    question: 'Que tipo de clínica tem?',
    options: ['Dentária', 'Fisioterapia', 'Estética', 'Multidisciplinar', 'Outra'],
  },
  {
    key: 'faturacao',
    question: 'Faturação anual aproximada?',
    options: ['< €150k/ano', '€150k–€300k/ano', '€300k–€600k/ano', '> €600k/ano'],
  },
  {
    key: 'desafio',
    question: 'Qual é o principal desafio?',
    options: ['Faltas sem aviso', 'Tratamentos sem follow-up', 'Pacientes inativos', 'Os três em simultâneo'],
  },
]

const TOTAL = QUESTIONS.length + 1 // 3 questions + contact

export default function DiagnosticWizard({ open, onClose }) {
  const [slide, setSlide] = useState(0)
  const [dir, setDir] = useState(1)
  const [data, setData] = useState({ tipo: '', faturacao: '', desafio: '', nome: '', telemovel: '', email: '', clinica: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSlide(0)
        setDir(1)
        setData({ tipo: '', faturacao: '', desafio: '', nome: '', telemovel: '', email: '', clinica: '' })
        setStatus('idle')
      }, 300)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const progress = Math.round((slide / TOTAL) * 100)

  const goTo = (next, direction) => {
    setDir(direction)
    setSlide(next)
  }

  const selectOption = (key, val) => {
    setData(d => ({ ...d, [key]: val }))
    setTimeout(() => goTo(slide + 1, 1), 240)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!data.nome.trim() || !data.email.trim() || !data.clinica.trim() || !data.telemovel.trim()) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[Reminder] Diagnóstico grátis — ${data.clinica} (${data.tipo} · ${data.faturacao})`,
          nome: data.nome,
          email: data.email,
          telemovel: data.telemovel,
          clinica: data.clinica,
          tipo_clinica: data.tipo,
          faturacao_anual: data.faturacao,
          principal_desafio: data.desafio,
          pedido: 'Diagnóstico grátis',
        }),
      })
      if (res.ok) { setStatus('done'); goTo(TOTAL, 1) }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const isContactSlide = slide === QUESTIONS.length
  const isSuccess = slide === TOTAL

  return (
    <div className="wz-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="wz-card">

        {/* Progress bar */}
        <div className="wz-progress-bar">
          <div className="wz-progress-bar__fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Header */}
        <div className="wz-header">
          {slide > 0 && !isSuccess ? (
            <button className="wz-back" onClick={() => goTo(slide - 1, -1)}>← Anterior</button>
          ) : <span />}
          {!isSuccess && (
            <span className="wz-counter">{slide + 1} / {TOTAL}</span>
          )}
          <button className="wz-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        {/* Slide content */}
        <div className="wz-body">
          <div key={slide} className={`wz-slide${dir < 0 ? ' wz-slide--back' : ''}`}>

            {/* Question slides */}
            {!isContactSlide && !isSuccess && (() => {
              const q = QUESTIONS[slide]
              return (
                <>
                  <p className="wz-q-num">{String(slide + 1).padStart(2, '0')} —</p>
                  <h2 className="wz-q-text">{q.question}</h2>
                  <p className="wz-q-hint">Selecione uma opção para continuar automaticamente</p>
                  <div className="wz-options">
                    {q.options.map(opt => (
                      <button
                        key={opt}
                        className={`wz-option${data[q.key] === opt ? ' selected' : ''}`}
                        onClick={() => selectOption(q.key, opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )
            })()}

            {/* Contact slide */}
            {isContactSlide && !isSuccess && (
              <>
                <p className="wz-q-num">04 —</p>
                <h2 className="wz-q-text">Quase lá. Como podemos entrar em contacto?</h2>
                <div className="wz-urgency">
                  <span className="wz-urgency__dot" />
                  <span>1 vaga disponível em Agosto — respondemos em 24h úteis</span>
                </div>
                <form className="wz-form" onSubmit={submit} noValidate>
                  <div className="wz-form-grid">
                    <input className="wz-input" type="text" placeholder="O seu nome *" value={data.nome} onChange={e => setData(d => ({ ...d, nome: e.target.value }))} disabled={status === 'sending'} />
                    <input className="wz-input" type="tel" placeholder="Telemóvel *" value={data.telemovel} onChange={e => setData(d => ({ ...d, telemovel: e.target.value }))} disabled={status === 'sending'} />
                    <input className="wz-input" type="email" placeholder="Email profissional *" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} disabled={status === 'sending'} />
                    <input className="wz-input" type="text" placeholder="Nome da clínica *" value={data.clinica} onChange={e => setData(d => ({ ...d, clinica: e.target.value }))} disabled={status === 'sending'} />
                  </div>
                  {status === 'error' && (
                    <p className="wz-error">Preencha todos os campos ou contacte <a href="mailto:hello@remindr-ai.com">hello@remindr-ai.com</a></p>
                  )}
                  <button className="wz-submit" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'A enviar…' : 'Marcar o Diagnóstico →'}
                  </button>
                  <p className="wz-fine">Diagnóstico gratuito · sem compromisso · respondemos em 24h úteis</p>
                </form>
              </>
            )}

            {/* Success */}
            {isSuccess && (
              <div className="wz-success">
                <div className="wz-success__icon">✓</div>
                <h2 className="wz-success__title">Pedido recebido, {data.nome.split(' ')[0]}.</h2>
                <p className="wz-success__sub">
                  Entraremos em contacto em menos de 24h úteis para agendar o Diagnóstico de Receita da {data.clinica}.
                </p>
                <button className="wz-close-btn" onClick={onClose}>Fechar →</button>
              </div>
            )}

          </div>
        </div>

        {/* Summary bar on contact slide */}
        {isContactSlide && !isSuccess && (
          <div className="wz-summary">
            <span>{data.tipo}</span><span>·</span>
            <span>{data.faturacao}</span><span>·</span>
            <span>{data.desafio}</span>
          </div>
        )}

      </div>
    </div>
  )
}
