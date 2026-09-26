import { useEffect, useState } from 'react'

const LINES = [
  { text: 'client.onboarding.started',       state: 'done'   },
  { text: 'email.welcome → sent',            state: 'done'   },
  { text: 'documents.request → sent',        state: 'done'   },
  { text: 'crm.contact → updated',           state: 'done'   },
  { text: 'task.internal → created',         state: 'done'   },
  { text: 'waiting: client.documents',       state: 'active' },
  { text: 'followup.schedule → queued',      state: 'idle'   },
  { text: 'escalation.human → standby',      state: 'idle'   },
]

export default function CoWorkerCard({ title = 'onboarding.worker', autoAnimate = false, style = {} }) {
  const [visible, setVisible] = useState(autoAnimate ? 1 : LINES.length)

  useEffect(() => {
    if (!autoAnimate) return
    let i = 1
    const t = setInterval(() => {
      i++
      setVisible(i)
      if (i >= LINES.length) clearInterval(t)
    }, 700)
    return () => clearInterval(t)
  }, [autoAnimate])

  const doneCount = LINES.slice(0, visible).filter(l => l.state === 'done').length

  return (
    <div className="co-terminal" style={{ maxWidth: 400, ...style }}>
      {/* Title bar */}
      <div className="co-terminal__bar">
        <div className="co-terminal__dots">
          <span className="co-terminal__dot co-terminal__dot--r" />
          <span className="co-terminal__dot co-terminal__dot--y" />
          <span className="co-terminal__dot co-terminal__dot--g" />
        </div>
        <span className="co-terminal__title">{title}</span>
        <span className="co-terminal__status">
          <span className="co-terminal__pulse" />
          running
        </span>
      </div>

      {/* Log lines */}
      <div className="co-terminal__body">
        {LINES.map((line, i) => {
          const shown  = i < visible
          const isDone   = shown && line.state === 'done'
          const isActive = shown && line.state === 'active'
          return (
            <div key={i}
              className={`co-terminal__line${shown ? ' co-terminal__line--visible' : ''}${isDone ? ' co-terminal__line--done' : ''}${isActive ? ' co-terminal__line--active' : ''}`}
              style={{ transitionDelay: `${i * 0.04}s` }}>
              <span className="co-terminal__prefix" style={{ color: isDone ? '#34d399' : isActive ? '#60a5fa' : 'rgba(255,255,255,0.12)' }}>
                {isDone ? '✓' : isActive ? '›' : '·'}
              </span>
              <span>{line.text}</span>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="co-terminal__footer">
        <span className="co-terminal__meta"><strong>{doneCount}</strong> completed</span>
        <span className="co-terminal__meta"><strong>1</strong> awaiting human</span>
      </div>
    </div>
  )
}
