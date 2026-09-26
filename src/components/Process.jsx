import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    days: 'Sem. 1–2',
    tag: 'Diagnóstico',
    tagColor: '#16A34A',
    tagBg: 'rgba(22,163,74,0.08)',
    title: 'Identificamos a receita perdida — em euros reais',
    desc: 'Mapeamos cada fuga: faltas, tratamentos por fechar, pacientes inativos. Resultado: um número concreto em euros, específico para a sua clínica.',
    badge: 'Gratuito',
    badgeColor: '#16A34A',
    image: '/solucao_1.png',
  },
  {
    num: '02',
    days: 'Sem. 2–3',
    tag: 'Desenho',
    tagColor: '#217FF1',
    tagBg: 'rgba(33,127,241,0.08)',
    title: 'Desenhamos o sistema à medida da sua clínica',
    desc: 'Com base no diagnóstico, calculamos o ROI projetado de cada automação antes de implementar qualquer coisa. Nada acontece sem aprovação.',
    image: '/solucao_2.png',
  },
  {
    num: '03',
    days: 'Sem. 3–5',
    tag: 'Implementação',
    tagColor: '#0369A1',
    tagBg: 'rgba(3,105,161,0.08)',
    title: 'A clínica não para. Implementamos nós.',
    desc: 'Confirmações automáticas, follow-up de tratamentos, reativação de inativos — instalados pela nossa equipa. O tempo pedido à clínica: menos de 3 horas.',
    image: '/solucao_3.png',
  },
  {
    num: '04',
    days: 'Mês 2+',
    tag: 'Crescimento',
    tagColor: '#7C3AED',
    tagBg: 'rgba(124,58,237,0.08)',
    title: 'Medimos. Reportamos. Continuamos.',
    desc: 'Relatório mensal: receita recuperada, faltas evitadas, pacientes reativados. Simples, acionável, entregue ao dono.',
    badge: 'ROI 4.5× médio',
    badgeColor: '#7C3AED',
    image: null,
  },
]

const INCLUDED = [
  'Diagnóstico completo do percurso do paciente',
  'Confirmações automáticas e gestão de faltas',
  'Follow-up automático de tratamentos propostos',
  'Campanha de reativação de pacientes inativos',
  'Relatório mensal de crescimento',
  'Plano de expansão contínua',
]

// Custom visual for step 04 — results dashboard
function ResultsDashboard() {
  const METRICS = [
    { val: '+€3.200', label: 'receita/mês', color: '#16A34A' },
    { val: '−62%',   label: 'faltas',       color: '#217FF1' },
    { val: '×4.8',   label: 'ROI',          color: '#7C3AED' },
    { val: '31',     label: 'reativações',  color: '#0369A1' },
  ]
  return (
    <div className="proc-dashboard">
      <div className="proc-dashboard__header">
        <span className="proc-dashboard__dot" />
        <span className="proc-dashboard__title">Relatório Mensal · Reminder</span>
        <span className="proc-dashboard__live">ao vivo</span>
      </div>
      <div className="proc-dashboard__grid">
        {METRICS.map(m => (
          <div key={m.label} className="proc-dashboard__metric">
            <span className="proc-dashboard__val" style={{ color: m.color }}>{m.val}</span>
            <span className="proc-dashboard__label">{m.label}</span>
          </div>
        ))}
      </div>
      <div className="proc-dashboard__bar-wrap">
        <div className="proc-dashboard__bar-label">Receita recuperada este trimestre</div>
        <div className="proc-dashboard__bar-track">
          <div className="proc-dashboard__bar-fill" />
        </div>
        <div className="proc-dashboard__bar-end">€9.600 / €10.000</div>
      </div>
    </div>
  )
}

export default function Process() {
  const gridRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    if (!cards.length) return

    // Set initial state
    gsap.set(cards, { y: 70, opacity: 0, scale: 0.94 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 78%',
        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
          })
        },
        once: true,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="process">
      <div className="container">

        <div className="section-head anim">
          <span className="label">Como funciona</span>
          <h2 className="h2">Da primeira chamada aos resultados</h2>
          <p className="body-md" style={{ marginTop: 12, maxWidth: 520, margin: '12px auto 0' }}>
            Quatro fases. Primeiros resultados em <strong>4–6 semanas.</strong>{' '}
            ROI calculado antes de qualquer compromisso.
          </p>
        </div>

        {/* Image cards grid */}
        <div className="proc-grid" ref={gridRef}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="proc-card"
              ref={el => cardRefs.current[i] = el}
            >
              {/* Image / visual area */}
              <div className="proc-card__img-wrap">
                {step.image ? (
                  <img
                    src={step.image}
                    alt={step.title}
                    className="proc-card__img"
                    loading="lazy"
                  />
                ) : (
                  <ResultsDashboard />
                )}
                {/* Step number overlay */}
                <div className="proc-card__num-badge">{step.num}</div>
              </div>

              {/* Content */}
              <div className="proc-card__body">
                <div className="proc-card__meta">
                  <span className="proc-card__days">{step.days}</span>
                  <span className="proc-card__tag" style={{ color: step.tagColor, background: step.tagBg }}>
                    {step.tag}
                  </span>
                </div>
                <h3 className="proc-card__title">{step.title}</h3>
                <p className="proc-card__desc">{step.desc}</p>
                {step.badge && (
                  <div className="proc-card__badge" style={{ color: step.badgeColor, background: step.badgeColor + '12', borderColor: step.badgeColor + '30' }}>
                    ⭐ {step.badge}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Included checklist */}
        <div className="anim anim--d2" style={{ maxWidth: 820, margin: '56px auto 0' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', textAlign: 'center', marginBottom: 20 }}>
            Incluído em todos os planos
          </p>
          <div className="timeline__included-grid">
            {INCLUDED.map((item, i) => (
              <div key={i} className="timeline__included-item">
                <span className="timeline__check">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus banner */}
        <div className="process__bonus anim anim--d3" style={{ marginTop: 28 }}>
          <span className="process__bonus-badge">INCLUÍDO</span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'white', margin: '0 0 4px' }}>
              Relatório Mensal de Crescimento — incluído em todos os planos
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>
              Receita recuperada, faltas evitadas e pacientes reativados — apresentados ao dono mensalmente, de forma simples e acionável.
            </p>
          </div>
        </div>

        <div className="anim anim--d3" style={{ marginTop: 48, textAlign: 'center' }}>
          <a href="#final-cta" className="btn btn--primary btn--lg btn--pulse">
            Agendar o Diagnóstico Gratuito →
          </a>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 12 }}>
            ROI projetado antes de qualquer compromisso · implementação em 4–6 semanas
          </p>
        </div>

      </div>
    </section>
  )
}
