import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const yes = [
  { title: 'Já existe volume', desc: 'Leads, clientes, propostas ou operações suficientes para existir impacto real.' },
  { title: 'A equipa está ocupada', desc: 'As pessoas gastam demasiado tempo em trabalho que um processo poderia fazer.' },
  { title: 'Mais negócio = mais trabalho', desc: 'O crescimento está a criar pressão sobre a equipa.' },
  { title: 'Existem processos repetitivos', desc: 'O trabalho acontece regularmente e segue padrões reconhecíveis.' },
  { title: 'Quer crescer sem contratar proporcionalmente', desc: 'A ambição existe. Falta o sistema para a suportar.' },
  { title: 'Existe capacidade para investir', desc: 'O valor do problema justifica a implementação.' },
]

const no = [
  'Procura apenas um chatbot',
  'Quer experimentar tecnologia sem um problema concreto',
  'Ainda não tem volume suficiente para existir impacto',
  'Quer apenas uma lista de recomendações',
  'Espera substituir a equipa inteira com tecnologia',
]

export default function RForWho() {
  const navigate = useNavigate()
  const headRef  = useRef(null)
  const yesRef   = useRef(null)
  const noRef    = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      })
      gsap.from(yesRef.current, {
        x: -32, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: yesRef.current, start: 'top 82%', once: true },
      })
      gsap.from(noRef.current, {
        x: 32, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: noRef.current, start: 'top 82%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#F4F7FB', padding: 'clamp(80px, 10vw, 120px) 0' }} id="para-quem">
      <div className="ayl-container">

        {/* Header */}
        <div ref={headRef} style={{ maxWidth: '640px', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
          <div className="ayl-section-label" style={{ marginBottom: '20px' }}>Para Quem É</div>
          <h2 className="ayl-h2" style={{ marginBottom: '20px' }}>
            Isto é para empresas<br />que já têm negócio.
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: '#666', lineHeight: 1.75, maxWidth: '520px' }}>
            Não trabalhamos com todas as empresas. Trabalhamos onde conseguimos criar impacto real.
          </p>
        </div>

        {/* Yes / No */}
        <div className="r-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>

          {/* Yes */}
          <div ref={yesRef} style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: '20px', overflow: 'hidden',
          }}>
            <div style={{
              padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Faz sentido se...
              </span>
            </div>
            <div style={{ padding: 'clamp(20px, 2.5vw, 28px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {yes.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '14px', color: '#111', letterSpacing: '-0.02em', marginBottom: '3px' }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No + closing */}
          <div ref={noRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: '20px', overflow: 'hidden',
              flex: 1,
            }}>
              <div style={{
                padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f87171', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Não faz sentido se...
                </span>
              </div>
              <div style={{ padding: 'clamp(20px, 2.5vw, 28px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {no.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.5, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: '#217FF1', borderRadius: '20px',
              padding: 'clamp(24px, 3vw, 32px)',
            }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: '20px' }}>
                Não vendemos tecnologia. Ajudamos empresas com negócio real a recuperar capacidade para crescer.
              </p>
              <button
                className="ayl-btn"
                style={{
                  background: '#fff', color: '#217FF1', border: 'none',
                  borderRadius: '10px', padding: '13px 24px',
                  fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'Sora, sans-serif', letterSpacing: '-0.01em', width: '100%',
                }}
                onClick={() => navigate('/diagnostico')}
              >
                Ver onde estou a perder capacidade →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
