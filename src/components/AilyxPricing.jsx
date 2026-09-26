import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const PLANS = [
  {
    name: 'O que está a acontecer',
    desc: 'A razão pela qual está a perder vendas:',
    pill: null,
    features: [
      'Leads sem resposta a tempo — o cliente vai à concorrência',
      '"Vou pensar…" — sem follow-up, desaparece',
      'Orçamentos enviados que nunca são acompanhados',
      'Mensagens perdidas em WhatsApp, Instagram ou email',
      'Ninguém sabe o estado de cada oportunidade',
    ],
    cta: 'Quero ver o que estou a perder →',
    highlight: false,
    priceLabel: 'O problema',
    priceColor: '#e53e3e',
  },
  {
    name: 'NEVER LOSE A LEAD™',
    desc: 'O sistema que garante que nenhuma oportunidade é esquecida por falta de processo:',
    pill: 'A oferta',
    features: [
      'Diagnóstico Reminder gratuito — onde estão as fugas',
      'Inbox unificado — todos os canais num único lugar',
      'Resposta estruturada a cada novo pedido',
      'Qualificação, encaminhamento e follow-up sistemático',
      'Dashboard com oportunidades, conversões e perdas',
      'Setup e formação feitos pela Reminder — Done-For-You',
    ],
    cta: 'Quero o diagnóstico gratuito →',
    highlight: true,
    priceLabel: 'Investimento a discutir',
    priceColor: '#217FF1',
  },
  {
    name: 'A garantia',
    desc: 'O risco é nosso:',
    pill: null,
    features: [
      'Se o sistema não ficar operacional no prazo, não paga mensalidade até estar',
      'Diagnóstico Reminder 100% gratuito — sem compromisso',
      'Não precisa de mudar de software nem contratar ninguém',
      'A equipa fica formada — não depende só de nós',
      'Sem contrato de longo prazo na fase inicial',
    ],
    cta: 'Quero o diagnóstico gratuito →',
    highlight: false,
    priceLabel: 'Risco zero para si',
    priceColor: '#38a169',
  },
]

const SCATTER = [
  { x: -160, y: 100, rotation: -10, scale: 0.82 },
  { x: 0,    y: 160, rotation:   0, scale: 0.78 },
  { x: 160,  y: 100, rotation:  10, scale: 0.82 },
]

function CheckIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke={color || '#217FF1'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AilyxPricing() {
  const gridRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    const cards = cardRefs.current.filter(Boolean)
    if (!cards.length) return

    if (isMobile) {
      gsap.set(cards, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 })
      return
    }

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
            duration: 0.9, ease: 'power3.out',
            stagger: { amount: 0.22, from: 'center' },
          })
        },
        once: true,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="ayl-section" id="pricing" style={{ background: '#fff' }}>
      <div className="ayl-container">

        <div className="ayl-section-label">A Oferta</div>
        <h2 className="ayl-h2" style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}>
          Primeiro mostramos quanto está a perder.<br />Depois decidem juntos se faz sentido avançar.
        </h2>

        <p className="ayl-pricing__sub">
          O diagnóstico é gratuito e sem compromisso. Analisamos o seu processo, identificamos onde estão as fugas e mostramos o impacto financeiro real. Só depois apresentamos uma proposta — se fizer sentido para o seu negócio.
        </p>

        <div className="ayl-pricing__grid" ref={gridRef}>
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`ayl-pricing-card${plan.highlight ? ' ayl-pricing-card--highlight' : ''}`}
              ref={el => cardRefs.current[i] = el}
            >
              {plan.pill && (
                <div style={{ marginBottom: '12px', display: 'inline-block', background: 'rgba(33,127,241,0.1)', color: '#217FF1', fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.05em' }}>
                  {plan.pill}
                </div>
              )}
              <h3 className="ayl-h3">{plan.name}</h3>
              <p className="ayl-pricing-card__desc">{plan.desc}</p>

              <div className="ayl-pricing-card__price-row">
                <span className="ayl-pricing-card__price" style={{ color: plan.priceColor }}>{plan.priceLabel}</span>
              </div>

              <a href="/diagnostico" className="ayl-btn ayl-btn--primary ayl-pricing-card__cta">
                {plan.cta}
              </a>

              <ul className="ayl-pricing-card__features">
                {plan.features.map((feat, j) => (
                  <li key={j} className="ayl-pricing-card__feature">
                    <CheckIcon color={plan.highlight ? '#217FF1' : '#555'} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
