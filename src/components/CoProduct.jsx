import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CoWorkerCard from './CoWorkerCard'
gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { n: '01', label: 'Venda fechada',            desc: 'O processo começa automaticamente assim que a venda é confirmada.' },
  { n: '02', label: 'Handoff para delivery',    desc: 'A equipa de entrega é notificada com o contexto completo da venda.' },
  { n: '03', label: 'Welcome enviado',          desc: 'O cliente recebe comunicação de boas-vindas e próximos passos.' },
  { n: '04', label: 'Informação solicitada',    desc: 'O Worker pede os dados, documentos e informação necessária.' },
  { n: '05', label: 'Documentos recolhidos',    desc: 'Verifica o que está completo e faz follow-up automático do que falta.' },
  { n: '06', label: 'Tarefas criadas',          desc: 'Cria tarefas internas e envolve as pessoas certas nos sistemas corretos.' },
  { n: '07', label: 'Follow-ups automáticos',   desc: 'Persegue o que está pendente sem a equipa ter de se lembrar.' },
  { n: '08', label: 'Equipa coordenada',        desc: 'Mantém todos os intervenientes sincronizados e informados.' },
  { n: '09', label: 'Bloqueios identificados',  desc: 'Deteta situações que exigem decisão humana e encaminha com contexto.' },
  { n: '10', label: 'Cliente pronto para começar', desc: 'O processo está completo. Sem a equipa ter de coordenar cada passo.' },
]

export default function CoProduct() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="co-section co-section--white" id="produto">
      <div className="co-container">

        <div style={{ maxWidth: '640px', marginBottom: '64px' }}>
          <span className="co-eyebrow" data-reveal>Primeiro Workflow</span>
          <h2 className="co-h2" data-reveal>
            Venda → Cliente pronto para começar.
          </h2>
          <p className="co-body" data-reveal style={{ marginTop: '16px' }}>
            Começamos por um processo. Depois expandimos. O primeiro workflow que automatizamos é normalmente o que acontece depois de uma venda ser fechada.
          </p>
        </div>

        <div className="co-grid-2i co-grid-stk">

          {/* Steps */}
          <div data-reveal>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'var(--co-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Primeiro workflow que automatizamos
              </span>
            </div>
            {STEPS.map((s, i) => (
              <div key={i} className="co-process-row">
                <span className="co-process-n">{s.n}</span>
                <div>
                  <div className="co-process-label">{s.label}</div>
                  <div className="co-process-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Card + copy */}
          <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <CoWorkerCard title="onboarding.worker" autoAnimate={false} style={{ maxWidth: '100%' }} />

            <div>
              <h3 className="co-h3" style={{ marginBottom: '12px' }}>
                Do contrato assinado ao cliente pronto a começar.
              </h3>
              <p className="co-body co-body--sm" style={{ marginBottom: '20px' }}>
                O objetivo não é automatizar uma tarefa isolada. É fazer com que o processo inteiro continue a avançar sem depender de alguém para se lembrar de cada passo.
              </p>
              <a href="#cta-final" className="co-btn co-btn--outline-dark">
                Agendar diagnóstico gratuito
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
