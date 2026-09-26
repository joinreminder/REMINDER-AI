import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const BLOCKS = [
  {
    title: 'Resultados mensuráveis',
    text: 'Não prometemos duplicar vendas nem "zero leads perdidos". Definimos uma baseline e medimos o que controlamos: resposta inicial, oportunidades sem responsável, orçamentos sem próxima ação, follow-ups pendentes e motivos de perda.',
  },
  {
    title: 'Risco operacional',
    text: 'Se avançarmos e a implementação atrasar por responsabilidade da Reminder, a mensalidade só começa quando o sistema acordado estiver operacional.',
  },
  {
    title: 'Transparência',
    text: 'Não precisa trocar de CRM antes de saber se existe um problema que justifique a mudança. A implementação começa pelos canais e workflows prioritários.',
  },
]

export default function LPTrust() {
  const topRef    = useRef(null)
  const blocksRef = useRef([])

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(topRef.current, {
        y: 36, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: topRef.current, start: 'top 78%', once: true },
      })
      const blocks = blocksRef.current.filter(Boolean)
      gsap.from(blocks, {
        y: 44, opacity: 0, duration: 0.8, ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: blocks[0], start: 'top 80%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="lp-trust">
      <div className="r-container">

        <div className="lp-trust__top" ref={topRef}>
          <p className="lp-section-label">Confiança</p>
          <h2 className="lp-h2">
            O compromisso é medir antes de prometer.
          </h2>
        </div>

        <div className="lp-trust__blocks">
          {BLOCKS.map((b, i) => (
            <div key={i} className="lp-trust__block" ref={el => blocksRef.current[i] = el}>
              <div className="lp-trust__block-num">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="lp-trust__block-title">{b.title}</h3>
              <p className="lp-trust__block-text">{b.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
