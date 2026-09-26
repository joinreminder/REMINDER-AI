import { useEffect, useState, useRef } from 'react'

const SEQUENCE = [
  { type: 'event',      text: 'Nova lead — João Ferreira · Formulário · 23:47:02', t: 400 },
  { type: 'timer',                                                                   t: 700 },
  { type: 'lead',       text: 'Olá, gostaria de saber mais sobre os vossos serviços de automação de vendas.',  time: '23:47', t: 1200 },
  { type: 'ai',         text: 'Olá João! Obrigado pelo interesse ✅\n\nAo que parece, estás a procurar aumentar a taxa de conversão das tuas leads. Posso perguntar — quantas leads recebes por mês em média?', time: '23:47', responseTime: true, t: 2600 },
  { type: 'timer-done', val: '0:18s',                                                t: 2700 },
  { type: 'lead',       text: 'Umas 150 por mês, mas a equipa não chega a todas a tempo.',                    time: '23:48', t: 4200 },
  { type: 'ai',         text: 'Faz todo o sentido! É exatamente o problema que resolvemos 💡\n\nTens disponibilidade amanhã às 10h para uma chamada de 20 min com o nosso especialista?', time: '23:48', t: 5600 },
  { type: 'lead',       text: 'Amanhã às 10h fica ótimo!',                                                    time: '23:49', t: 7100 },
  { type: 'success',                                                                  t: 8300 },
]

const RESTART_DELAY = 4000

export default function ChatDemo() {
  const [items, setItems] = useState([])
  const [timerVal, setTimerVal] = useState('0:00s')
  const [showTimer, setShowTimer] = useState(false)
  const [timerDone, setTimerDone] = useState(false)
  const bodyRef = useRef(null)
  const tickRef = useRef(null)
  const timeoutsRef = useRef([])

  function scrollBottom() {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }

  function clearAll() {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    if (tickRef.current) clearInterval(tickRef.current)
    tickRef.current = null
  }

  function run() {
    setItems([])
    setShowTimer(false)
    setTimerDone(false)
    setTimerVal('0:00s')

    SEQUENCE.forEach(({ type, text, time, val, responseTime, t }) => {
      const id = setTimeout(() => {
        if (type === 'event') {
          setItems(prev => [...prev, { type: 'event', text }])
        } else if (type === 'timer') {
          setShowTimer(true)
          let ticks = 0
          tickRef.current = setInterval(() => {
            ticks++
            setTimerVal(`0:${String(ticks).padStart(2, '0')}s`)
          }, 90)
        } else if (type === 'timer-done') {
          clearInterval(tickRef.current)
          setTimerVal(val)
          setTimerDone(true)
        } else if (type === 'ai' || type === 'lead') {
          setItems(prev => [...prev, { type, text, time, responseTime }])
        } else if (type === 'success') {
          setItems(prev => [...prev, { type: 'success' }])
          const rid = setTimeout(() => {
            setItems(prev => [...prev.filter(x => x.type === 'success'), { type: 'fade-out' }])
            setTimeout(run, 600)
          }, RESTART_DELAY)
          timeoutsRef.current.push(rid)
        }
        scrollBottom()
      }, t)
      timeoutsRef.current.push(id)
    })
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Static fallback
      setItems([
        { type: 'event', text: 'Nova lead — João Ferreira · 23:47:02' },
        { type: 'lead', text: 'Gostaria de saber mais sobre os serviços.', time: '23:47' },
        { type: 'ai', text: 'Olá João! Tenho disponibilidade para falar já. Queres agendar para amanhã às 10h?', time: '23:47', responseTime: true },
        { type: 'success' },
      ])
      setShowTimer(true)
      setTimerDone(true)
      setTimerVal('0:18s')
      return
    }

    run()
    return clearAll
  }, [])

  // scroll when items change
  useEffect(() => {
    scrollBottom()
  }, [items])

  return (
    <div className="chat-panel" role="img" aria-label="Demonstração do Recall by Reminder a responder a uma lead em 18 segundos">
      <div className="chat-panel__header">
        <span className="chat-panel__title">Recall by Reminder — ao vivo</span>
        <span className="chat-panel__tag">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16C784', display: 'inline-block', marginRight: 4 }}></span>
          Sistema ativo
        </span>
      </div>

      {/* WhatsApp interface */}
      <div className="wa-interface">
        <div className="wa-header">
          <div className="wa-avatar" aria-hidden="true">R</div>
          <div className="wa-info">
            <div className="wa-name">Recall by Reminder</div>
            <div className="wa-status">online · WhatsApp Business</div>
          </div>
        </div>

        <div
          className="wa-body"
          ref={bodyRef}
          style={{ maxHeight: 320, overflowY: 'hidden' }}
          aria-live="polite"
        >
          {items.map((item, i) => {
            if (item.type === 'event') {
              return (
                <div key={i} className="wa-event">
                  <span className="wa-event-badge">{item.text}</span>
                </div>
              )
            }

            if (item.type === 'lead') {
              return (
                <div key={i} className="wa-msg wa-msg--lead show">
                  <div className="wa-bubble">{item.text}</div>
                  <span className="wa-time">{item.time}</span>
                </div>
              )
            }

            if (item.type === 'ai') {
              return (
                <div key={i} className="wa-msg wa-msg--ai show">
                  <div className="wa-bubble" style={{ whiteSpace: 'pre-line' }}>
                    {item.text}
                    {item.responseTime && (
                      <div style={{ marginTop: 6, fontSize: 10, opacity: 0.6 }}>✓✓ entregue</div>
                    )}
                  </div>
                  <span className="wa-time">{item.time}</span>
                </div>
              )
            }

            if (item.type === 'success') {
              return (
                <div key={i} className="wa-success show" style={{ marginTop: 4 }}>
                  <div className="wa-success-icon">✓</div>
                  <div>
                    <div className="wa-success-title">Reunião confirmada — amanhã 10:00 ✓</div>
                    <div className="wa-success-sub">Lead qualificada · Convite enviado · CRM atualizado</div>
                  </div>
                </div>
              )
            }

            return null
          })}

          {showTimer && (
            <div
              className={`wa-timer${showTimer ? ' show' : ''}`}
              style={{
                borderColor: timerDone ? 'rgba(22,199,132,0.3)' : 'rgba(91,79,233,0.15)',
                marginTop: 4,
              }}
            >
              <span className="wa-timer-label">⚡ Tempo de resposta</span>
              <span
                className="wa-timer-val"
                style={{ color: timerDone ? '#16C784' : '#5B4FE9' }}
              >
                {timerVal}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
