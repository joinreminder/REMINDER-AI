import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SCATTER = [
  { x: -160, y: 100, rotation: -10, scale: 0.82 },
  { x: 0,    y: 160, rotation:   0, scale: 0.78 },
  { x: 160,  y: 100, rotation:  10, scale: 0.82 },
]

const PLANS = [
  {
    num: '01',
    tag: 'Gratuito',
    tagColor: '#16A34A',
    tagBg: 'rgba(22,163,74,0.08)',
    name: 'Diagnóstico de Receita',
    price: '€0',
    priceSub: 'sem compromisso',
    desc: 'Calculamos a receita perdida da sua clínica em euros reais — faltas, tratamentos não seguidos, pacientes inativos. Resultado em 15 minutos.',
    items: [
      'Mapeamento completo do percurso do paciente',
      'Cálculo de perda em euros reais',
      'ROI projetado de cada automação',
      'Relatório com plano de acção',
    ],
    cta: 'Marcar o Diagnóstico →',
    ctaStyle: 'outline',
    highlight: false,
  },
  {
    num: '02',
    tag: 'Mais popular',
    tagColor: 'white',
    tagBg: 'rgba(255,255,255,0.2)',
    name: 'Sistema de Recuperação',
    price: 'Custom',
    priceSub: 'calculado no diagnóstico',
    desc: 'Implementamos as automações críticas — confirmações, follow-up de tratamentos, reativação de inativos. Primeiros resultados em 4–6 semanas.',
    items: [
      'Confirmações automáticas de consultas',
      'Follow-up de tratamentos propostos',
      'Campanha de reativação de inativos',
      'Implementação sem parar a clínica',
      'Menos de 3h de tempo da sua equipa',
    ],
    cta: 'Calcular o meu ROI →',
    ctaStyle: 'primary',
    highlight: true,
  },
  {
    num: '03',
    tag: 'Recorrente',
    tagColor: '#0369A1',
    tagBg: 'rgba(3,105,161,0.08)',
    name: 'Gestão Mensal',
    price: 'Fix mensal',
    priceSub: 'definido no diagnóstico',
    desc: 'Acompanhamento contínuo com relatório mensal de crescimento. Receita recuperada, faltas evitadas e pacientes reativados — entregue ao dono.',
    items: [
      'Relatório mensal de crescimento',
      'Otimização contínua das automações',
      'Novas campanhas de reativação',
      'Suporte direto com a equipa Reminder',
    ],
    cta: 'Saber mais →',
    ctaStyle: 'outline',
    highlight: false,
  },
]

export default function Pricing() {
  const gridRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    if (!cards.length) return

    cards.forEach((card, i) => {
      const s = SCATTER[i]
      gsap.set(card, { x: s.x, y: s.y, rotation: s.rotation, scale: s.scale, opacity: 0 })
    })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(cards, {
            x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: { amount: 0.22, from: 'center' },
          })
        },
        once: true,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="section section--alt" id="pricing">
      <div className="container">

        <div className="section-head anim">
          <span className="label">Modelo de trabalho</span>
          <h2 className="h2">Três fases. Resultado calculado antes de começar.</h2>
          <p className="body-md" style={{ marginTop: 12, maxWidth: 520, margin: '12px auto 0' }}>
            Começamos sempre pelo Diagnóstico gratuito — só avançamos se o ROI justificar.
          </p>
        </div>

        <div className="pricing-grid" ref={gridRef}>
          {PLANS.map((plan, i) => (
            <div
              key={plan.num}
              className={`pricing-card${plan.highlight ? ' pricing-card--highlight' : ''}`}
              ref={el => cardRefs.current[i] = el}
            >
              {/* Top meta */}
              <div className="pricing-card__meta">
                <span className="pricing-card__num">{plan.num}</span>
                <span
                  className="pricing-card__tag"
                  style={{ color: plan.tagColor, background: plan.tagBg }}
                >
                  {plan.tag}
                </span>
              </div>

              <h3 className="pricing-card__name">{plan.name}</h3>

              {/* Price */}
              <div className="pricing-card__price-row">
                <span className="pricing-card__price">{plan.price}</span>
                <span className="pricing-card__price-sub">{plan.priceSub}</span>
              </div>

              <p className="pricing-card__desc">{plan.desc}</p>

              <div className="pricing-card__divider" />

              {/* Feature list */}
              <ul className="pricing-card__items">
                {plan.items.map((item, j) => (
                  <li key={j} className="pricing-card__item">
                    <span className="pricing-card__check">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#final-cta"
                className={`pricing-card__cta btn ${plan.ctaStyle === 'primary' ? 'btn--primary' : 'pricing-card__cta--outline'}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 20, textAlign: 'center' }}>
          O Diagnóstico calcula os valores reais para a sua clínica antes de qualquer compromisso.
        </p>

      </div>
    </section>
  )
}
