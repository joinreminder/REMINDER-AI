import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { label: 'Coordenação',        desc: 'Envolve as pessoas certas no momento certo, com o contexto completo.',  tag: 'Primeiro Worker' },
  { label: 'Follow-up',          desc: 'Persegue automaticamente o que está pendente sem a equipa ter de se lembrar.' },
  { label: 'Project Ops',        desc: 'Cria tarefas, atualiza estados e mantém o projeto a avançar.'          },
  { label: 'Blockers',           desc: 'Deteta bloqueios e encaminha exceções para a pessoa certa com contexto.' },
  { label: 'Reporting',          desc: 'Gera atualizações de estado e relatórios sem intervenção manual.'       },
  { label: 'Sync',               desc: 'Mantém CRM, PSA, ERP e outros sistemas sincronizados em tempo real.'   },
]

export default function CoServices() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        y: 24, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="co-section co-section--white" id="o-que-executamos">
      <div className="co-container">

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span className="co-eyebrow" data-reveal>O que executamos</span>
            <h2 className="co-h2" data-reveal style={{ maxWidth: '480px' }}>
              AI Workers para<br />cada parte do processo.
            </h2>
          </div>
          <p className="co-body co-body--sm" data-reveal style={{ maxWidth: '320px' }}>
            Qualquer parte repetitiva do processo de entrega que atravessa vários sistemas pode tornar-se um AI Worker.
          </p>
        </div>

        {/* Services table */}
        <div data-reveal className="co-services-wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--co-line)', background: 'var(--co-surface)' }}>
            {['Processo', 'O Worker pode fazer'].map((h, i) => (
              <div key={i} style={{
                padding: '12px 32px', fontFamily: 'var(--co-font-b)', fontSize: '10px',
                fontWeight: 600, color: 'var(--co-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase',
                borderRight: i === 0 ? '1px solid var(--co-line)' : 'none',
              }}>{h}</div>
            ))}
          </div>

          {SERVICES.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              borderBottom: i < SERVICES.length - 1 ? '1px solid var(--co-line)' : 'none',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--co-surface)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ padding: '20px 32px', borderRight: '1px solid var(--co-line)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '15px', fontWeight: 600, color: 'var(--co-ink)' }}>{s.label}</span>
                {s.tag && <span className="co-badge">{s.tag}</span>}
              </div>
              <div style={{ padding: '20px 32px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'var(--co-muted)' }}>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div data-reveal style={{
          marginTop: '24px', padding: '20px 28px',
          border: '1px solid var(--co-line)', borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px',
        }}>
          <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '15px', color: 'var(--co-ink)', margin: 0, fontWeight: 500 }}>
            Tem um processo diferente? Se é repetitivo, baseado em regras e atravessa vários sistemas — provavelmente conseguimos construir um Worker.
          </p>
          <a href="#cta-final" className="co-btn co-btn--primary" style={{ flexShrink: 0 }}>
            Falar sobre o meu processo →
          </a>
        </div>

      </div>
    </section>
  )
}
