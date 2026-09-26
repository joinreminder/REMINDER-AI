import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const WELCOME    = 'Olá! Sou o Hermes, assistente da Reminder AI.\n\nPosso ajudá-lo a perceber se a sua empresa está a aproveitar ao máximo os leads que já recebe.\n\nPara começar: a sua empresa recebe leads regularmente e vende através de reuniões comerciais?'
const BUBBLE_MSG = 'Está a converter os seus leads em reuniões?'

export default function HermesChat() {
  const [open, setOpen]               = useState(false)
  const [messages, setMessages]       = useState([{ role: 'assistant', content: WELCOME }])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [bubbleVisible, setBubbleVisible] = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)
  const navigate  = useNavigate()

  // Mostra bubble uma vez após 3s; esconde quando chat abre
  useEffect(() => {
    const t = setTimeout(() => setBubbleVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (open) setBubbleVisible(false)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const updated = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setLoading(true)
    try {
      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content || 'Ocorreu um erro.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sem ligação. Tenta novamente.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Bubble de notificação — branca, aparece uma vez */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed', bottom: '100px', right: '28px', zIndex: 9997,
            background: '#fff',
            borderRadius: '12px 12px 4px 12px',
            padding: '10px 15px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
            opacity: bubbleVisible ? 1 : 0,
            transform: bubbleVisible ? 'translateY(0)' : 'translateY(8px)',
            pointerEvents: bubbleVisible ? 'all' : 'none',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0a1c42', fontFamily: 'Sora, sans-serif' }}>
            {BUBBLE_MSG}
          </span>
          {/* Triângulo apontador */}
          <div style={{
            position: 'absolute', bottom: '-6px', right: '20px',
            width: 0, height: 0,
            borderLeft: '6px solid transparent',
            borderTop: '6px solid #fff',
          }} />
        </div>
      )}

      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999,
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #217FF1, #0e3ba0)',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(33,127,241,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: open ? 'scale(0.92)' : 'scale(1)',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 32px rgba(33,127,241,0.75)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(33,127,241,0.55)'}
        aria-label="Abrir Hermes"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <text x="13" y="19" textAnchor="middle" fontSize="18" fontWeight="700" fill="white" fontFamily="Sora, sans-serif">H</text>
          </svg>
        )}
        {!open && (
          <span style={{
            position: 'absolute', inset: '-6px', borderRadius: '50%',
            border: '1.5px solid rgba(33,127,241,0.4)',
            animation: 'hero-pulse 2s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
        )}
      </button>

      {/* Painel de chat */}
      <div style={{
        position: 'fixed', bottom: '100px', right: '28px', zIndex: 9998,
        width: '360px', maxWidth: 'calc(100vw - 40px)',
        height: '500px',
        background: '#06142e',
        border: '1px solid rgba(33,127,241,0.25)',
        borderRadius: '20px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transformOrigin: 'bottom right',
        transform: open ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(12px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease',
      }}>

        {/* Header */}
        <div style={{
          padding: '14px 18px', flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(33,127,241,0.2), rgba(14,59,160,0.15))',
          borderBottom: '1px solid rgba(33,127,241,0.2)',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #217FF1, #0e3ba0)',
            border: '1.5px solid rgba(100,180,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(33,127,241,0.4)',
          }}>
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#fff', fontFamily: 'Sora, sans-serif' }}>H</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: 'Sora, sans-serif' }}>Hermes</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'hero-pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: '10.5px', color: '#4ade80', fontWeight: 600 }}>Online · Reminder AI</span>
            </div>
          </div>
          <button
            onClick={() => { setOpen(false); navigate('/diagnostico') }}
            style={{
              background: '#217FF1', border: 'none', borderRadius: '8px',
              padding: '6px 10px', cursor: 'pointer',
              fontSize: '10.5px', fontWeight: 700, color: '#fff',
              fontFamily: 'Sora, sans-serif', whiteSpace: 'nowrap',
            }}
          >
            Roadmap →
          </button>
        </div>

        {/* Mensagens — data-lenis-prevent impede o Lenis de interceptar o scroll aqui */}
        <div
          data-lenis-prevent
          style={{
            height: '340px', overflowY: 'scroll',
            padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px',
            scrollbarWidth: 'thin', scrollbarColor: 'rgba(33,127,241,0.25) transparent',
          }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '84%', padding: '9px 13px',
                borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: m.role === 'user' ? 'linear-gradient(135deg, #217FF1, #0e5cd4)' : 'rgba(255,255,255,0.07)',
                border: m.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                fontSize: '13px', lineHeight: 1.55, color: '#fff',
                fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap',
              }}>
                {m.content}
                {m.role === 'assistant' && i > 0 && i === messages.length - 1 && !loading && (
                  <button
                    onClick={() => { setOpen(false); navigate('/diagnostico') }}
                    style={{
                      display: 'block', marginTop: '10px', width: '100%', textAlign: 'left',
                      background: 'rgba(33,127,241,0.2)', border: '1px solid rgba(33,127,241,0.4)',
                      borderRadius: '8px', padding: '7px 12px', cursor: 'pointer',
                      fontSize: '11.5px', fontWeight: 700, color: '#90c8ff',
                      fontFamily: 'Sora, sans-serif',
                    }}
                  >
                    Quero o meu roadmap gratuito →
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '11px 16px', borderRadius: '16px 16px 16px 4px',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', gap: '5px', alignItems: 'center',
              }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#5aabff',
                    animation: `hero-pulse 1.2s ease-in-out infinite ${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '10px 14px', flexShrink: 0,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', gap: '8px', alignItems: 'flex-end',
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Escreve a tua pergunta..."
            rows={1}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(33,127,241,0.25)', borderRadius: '10px',
              padding: '9px 12px', color: '#fff', fontSize: '13px',
              fontFamily: 'Inter, sans-serif', resize: 'none', outline: 'none',
              lineHeight: 1.5, maxHeight: '72px', overflowY: 'auto',
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            style={{
              width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
              background: input.trim() && !loading ? '#217FF1' : 'rgba(255,255,255,0.1)',
              border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        <div style={{ padding: '6px 14px 10px', textAlign: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter, sans-serif' }}>
            Hermes · Reminder AI · Powered by Claude
          </span>
        </div>
      </div>
    </>
  )
}
