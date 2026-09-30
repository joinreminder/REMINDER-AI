import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { value: '5', unit: 'min', label: 'Tempo até 1º contacto', before: 'Era +24 horas', color: '#5aabff', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8' },
  { value: '100', unit: '%', label: 'Follow-up garantido', before: 'Era 60%', color: '#4ade80', icon: 'M20 6L9 17l-5-5' },
  { value: '14', unit: '', label: 'Reuniões recuperadas', before: 'Primeiro mês', color: '#f59e0b', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
]

const SEQUENCE = [
  { day: 'Dia 1', label: 'Contacto inicial', desc: 'Email personalizado enviado', type: 'system' },
  { day: 'Dia 3', label: 'Follow-up #1', desc: 'Valor adicional', type: 'system' },
  { day: 'Dia 5', label: 'Follow-up #2', desc: 'Proposta de conversa', type: 'system' },
  { day: 'Dia 5', label: 'Resposta recebida', desc: '"Sim, faz sentido. Vamos falar?"', type: 'response' },
  { day: 'Dia 6', label: 'Reunião marcada', desc: 'Quinta-feira, 15:00', type: 'success' },
]

export default function AilyxProof() {
  const headRef = useRef(null)
  const metricsRef = useRef([])
  const timelineRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      })
      metricsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          y: 40, opacity: 0, scale: 0.95, duration: 0.7, ease: 'back.out(1.3)', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        })
      })
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll('.proof-seq-item')
        gsap.from(items, {
          x: -30, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#06142e', padding: 'clamp(70px, 9vw, 110px) 0' }} id="resultados">
      <div className="ayl-container">

        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(33,127,241,0.18)', border: '1px solid rgba(33,127,241,0.3)',
            borderRadius: '100px', padding: '5px 14px', marginBottom: '20px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#90c8ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Na Prática
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700,
            fontSize: 'clamp(26px, 3.5vw, 44px)',
            color: '#fff', lineHeight: 1.1, letterSpacing: '-0.04em',
            marginBottom: '16px',
          }}>
            O que muda nos primeiros 30 dias.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}>
            Resultados típicos após implementação.
          </p>
        </div>

        {/* Metrics cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }} className="ayl-proof-metrics">
          {METRICS.map((m, i) => (
            <div
              key={i}
              ref={el => metricsRef.current[i] = el}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '28px 24px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '80px', height: '80px',
                background: `radial-gradient(circle, ${m.color}12 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              <div style={{
                width: 40, height: 40, borderRadius: '12px',
                background: `${m.color}15`, border: `1px solid ${m.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={m.icon} />
                </svg>
              </div>

              <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '36px', color: m.color, lineHeight: 1 }}>
                {m.value}<span style={{ fontSize: '20px', fontWeight: 700 }}>{m.unit}</span>
              </div>

              <div style={{ fontWeight: 600, fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginTop: '8px' }}>
                {m.label}
              </div>

              <div style={{
                fontSize: '12px', color: 'rgba(255,255,255,0.35)',
                marginTop: '8px',
                padding: '4px 12px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '100px',
                display: 'inline-block',
              }}>
                {m.before}
              </div>
            </div>
          ))}
        </div>

        {/* Sequence timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'stretch' }} className="ayl-proof-layout">
          {/* Left — Sequence visualization */}
          <div ref={timelineRef} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '24px',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '20px', paddingBottom: '14px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5aabff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                  Sequência de Prospeção
                </span>
              </div>
              <span style={{
                fontSize: '10px', fontWeight: 600, color: '#5aabff',
                padding: '3px 8px', background: 'rgba(90,171,255,0.12)',
                borderRadius: '100px',
              }}>Exemplo</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {SEQUENCE.map((step, i) => {
                const isLast = i === SEQUENCE.length - 1
                const dotColor = step.type === 'success' ? '#4ade80' : step.type === 'response' ? '#4ade80' : '#5aabff'
                const bgColor = step.type === 'success' ? 'rgba(74,222,128,0.08)' : step.type === 'response' ? 'rgba(74,222,128,0.05)' : 'transparent'
                return (
                  <div key={i} className="proof-seq-item" style={{ display: 'flex', gap: '14px' }}>
                    {/* Timeline line + dot */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px', flexShrink: 0 }}>
                      <span style={{
                        width: step.type === 'success' ? 14 : 10,
                        height: step.type === 'success' ? 14 : 10,
                        borderRadius: '50%',
                        background: dotColor,
                        border: step.type === 'success' ? '2px solid rgba(74,222,128,0.4)' : 'none',
                        boxShadow: step.type === 'success' ? `0 0 12px ${dotColor}60` : 'none',
                        flexShrink: 0,
                        marginTop: '6px',
                      }} />
                      {!isLast && (
                        <div style={{ width: '1.5px', flex: 1, background: 'rgba(255,255,255,0.08)', minHeight: '20px' }} />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{
                      flex: 1,
                      padding: '4px 12px 16px',
                      background: bgColor,
                      borderRadius: bgColor !== 'transparent' ? '10px' : '0',
                      marginBottom: isLast ? 0 : '2px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 600, fontSize: '13px', color: step.type === 'success' ? '#4ade80' : 'rgba(255,255,255,0.8)' }}>
                          {step.label}
                        </span>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>{step.day}</span>
                      </div>
                      <p style={{
                        fontSize: '12px', margin: 0, lineHeight: 1.4,
                        color: step.type === 'response' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)',
                        fontStyle: step.type === 'response' ? 'italic' : 'normal',
                      }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right — Email mockup */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Email header */}
            <div style={{
              padding: '16px 20px',
              background: '#F8FAFF',
              borderBottom: '1px solid #e8edf5',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #217FF1, #0e3ba0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src="/logotipo-editado.png" alt="" style={{ width: 16, height: 'auto', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#0a1c42' }}>Reminder</div>
                <div style={{ fontSize: '11px', color: '#999' }}>para: joao.silva@techcorp.pt</div>
              </div>
            </div>

            {/* Email body */}
            <div style={{ padding: '20px 24px', flex: 1 }}>
              <p style={{ fontSize: '13px', color: '#333', lineHeight: 1.65, margin: '0 0 14px' }}>
                Olá João,
              </p>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.65, margin: '0 0 14px' }}>
                Vi que a TechCorp tem expandido a equipa comercial. Muitas empresas nesta fase perdem oportunidades por falta de acompanhamento consistente dos leads.
              </p>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.65, margin: '0 0 14px' }}>
                Faria sentido uma conversa rápida de 15 min para perceber se vos podemos ajudar?
              </p>
              <p style={{ fontSize: '13px', color: '#333', lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
                Cumprimentos
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f0f3f9' }}>
                <span style={{
                  padding: '4px 10px', borderRadius: '100px',
                  background: 'rgba(33,127,241,0.08)', border: '1px solid rgba(33,127,241,0.15)',
                  fontSize: '10px', fontWeight: 600, color: '#217FF1',
                }}>Personalizado</span>
                <span style={{
                  padding: '4px 10px', borderRadius: '100px',
                  background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)',
                  fontSize: '10px', fontWeight: 600, color: '#16a34a',
                }}>100% automático</span>
              </div>
            </div>

            {/* Response preview */}
            <div style={{
              padding: '14px 20px',
              background: '#EEF4FF',
              borderTop: '1px solid #dbe6f5',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#217FF1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#217FF1' }}>
                Resposta recebida · Reunião agendada
              </span>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
          Exemplos ilustrativos baseados em cenários reais do mercado B2B.
        </p>

      </div>
    </section>
  )
}
