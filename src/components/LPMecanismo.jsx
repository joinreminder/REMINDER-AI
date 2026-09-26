import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RobotPanel from './RobotPanel'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    num: '01',
    title: 'Resposta',
    desc: 'Cada pedido recebe resposta estruturada com recolha de contexto — tipo de serviço, urgência, localização. A equipa recebe a oportunidade qualificada, não em bruto.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Responsável',
    desc: 'Cada oportunidade tem um nome, uma data e um estado claro. Sem margem para "pensei que eras tu". A equipa sabe exatamente o que está por tratar e o que já avançou.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Próximo passo',
    desc: 'Nenhuma interação fica em aberto. Cada orçamento, chamada ou proposta termina com data e ação definida — até existir um resultado: fechado, perdido ou arquivado.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
  },
]

const SCATTER = [
  { x: -160, y: 80,  rotation: -9,  scale: 0.83 },
  { x: 0,    y: 140, rotation: 0,   scale: 0.80 },
  { x: 160,  y: 80,  rotation: 9,   scale: 0.83 },
]

export default function LPMecanismo() {
  const topRef   = useRef(null)
  const cardsRef = useRef([])
  const rightRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    const cards = cardsRef.current.filter(Boolean)
    if (!cards.length) return

    if (isMobile) {
      gsap.set(cards, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 })
    } else {
      cards.forEach((card, i) => {
        const s = SCATTER[i]
        gsap.set(card, { x: s.x, y: s.y, rotation: s.rotation, scale: s.scale, opacity: 0 })
      })
    }

    const ctx = gsap.context(() => {
      gsap.from(topRef.current.children, {
        y: 36, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: topRef.current, start: 'top 76%', once: true },
      })

      if (!isMobile) {
        ScrollTrigger.create({
          trigger: cards[0],
          start: 'top 78%',
          onEnter: () => {
            gsap.to(cards, {
              x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
              duration: 0.9, ease: 'power3.out',
              stagger: { amount: 0.22, from: 'center' },
            })
          },
          once: true,
        })

        gsap.from(rightRef.current, {
          x: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: rightRef.current, start: 'top 75%', once: true },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="lp-mec" id="mecanismo">
      <div className="ayl-container lp-mec__inner">

        {/* LEFT — copy + scatter cards */}
        <div className="lp-mec__left">
          <div className="lp-mec__top" ref={topRef}>
            <p className="ayl-section-label ayl-section-label--white">O mecanismo</p>
            <h2 className="ayl-h2 ayl-h2--white" style={{ fontSize: 'clamp(28px, 3.2vw, 48px)' }}>
              Uma oportunidade só deixa de estar em risco quando tem três coisas.
            </h2>
            <p className="lp-mec__sub">
              Resposta não é suficiente. Responsável não é suficiente. Próximo passo não é suficiente. Quando falta qualquer um dos três, a oportunidade fica em risco — mesmo que já tenha entrado no funil.
            </p>
          </div>

          <div className="lp-mec__cards" style={{ overflow: 'visible' }}>
            {CARDS.map((c, i) => (
              <div key={i} className="lp-mec__card lp-mec__card--dark" ref={el => cardsRef.current[i] = el}>
                <div className="lp-mec__card-top">
                  <div className="lp-mec__card-icon lp-mec__card-icon--dark">{c.icon}</div>
                  <span className="lp-mec__card-num lp-mec__card-num--dark">{c.num}</span>
                </div>
                <h3 className="lp-mec__card-title lp-mec__card-title--dark">{c.title}</h3>
                <p className="lp-mec__card-desc lp-mec__card-desc--dark">{c.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '36px' }}>
            <a href="/diagnostico" className="ayl-btn ayl-btn--white">
              Pedir Diagnóstico de Fugas de Receita →
            </a>
          </div>
        </div>

        {/* RIGHT — robot */}
        <div className="lp-mec__right" ref={rightRef}>
          <RobotPanel idPrefix="mec-" />
          <p style={{
            marginTop: '16px', fontSize: '11px', color: 'rgba(255,255,255,0.25)',
            textAlign: 'center', lineHeight: 1.55, maxWidth: '340px',
          }}>
            Exemplo ilustrativo do fluxo Reminder. A automação é configurada segundo as regras da empresa.
          </p>
        </div>

      </div>
    </section>
  )
}
