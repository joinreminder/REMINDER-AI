import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ROWS = [
  {
    label: 'Pedidos de orçamento',
    before: 'Espalhados por WhatsApp, email e chamadas — sem registo único',
    after: 'Todos os pedidos entram no mesmo fluxo, com registo',
  },
  {
    label: 'Primeira resposta',
    before: 'Depende de quem está disponível — horas ou dias depois',
    after: 'Resposta estruturada com recolha de contexto',
  },
  {
    label: 'Orçamentos enviados',
    before: 'Saem sem dono, data ou cadência de follow-up',
    after: 'Cada proposta tem responsável e próxima ação definida',
  },
  {
    label: 'Acompanhamento',
    before: 'Manual, inconsistente e dependente da memória da equipa',
    after: 'Follow-ups sistemáticos até existir um resultado',
  },
  {
    label: 'Visibilidade da direção',
    before: 'Nenhuma — não se sabe o que está parado nem por quê',
    after: 'Dashboard com estado de cada oportunidade em tempo real',
  },
]

export default function LPBeforeAfter() {
  const wrapRef  = useRef(null)
  const tableRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current.children, {
        y: 36, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: wrapRef.current, start: 'top 76%', once: true },
      })
      const rows = tableRef.current.querySelectorAll('.lpba__row')
      gsap.from(rows, {
        y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: tableRef.current, start: 'top 80%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="lpba" id="antes-depois">
      <div className="r-container">

        <div className="lpba__header" ref={wrapRef}>
          <p className="lp-section-label">Antes vs. Depois</p>
          <h2 className="lp-h2">
            O que muda quando cada pedido<br />tem um processo por trás.
          </h2>
          <p className="lpba__sub">
            Não é sobre mais tecnologia. É sobre garantir que cada oportunidade que já chega até si tem responsável, contexto e próximo passo — em vez de ficar esquecida.
          </p>
        </div>

        <div className="lpba__table-wrap" ref={tableRef}>

          {/* Table header */}
          <div className="lpba__thead">
            <div className="lpba__th lpba__th--label" />
            <div className="lpba__th lpba__th--before">
              <span className="lpba__th-badge lpba__th-badge--before">Sem processo</span>
            </div>
            <div className="lpba__th lpba__th--after">
              <span className="lpba__th-badge lpba__th-badge--after">Com Reminder</span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div key={i} className="lpba__row">
              <div className="lpba__cell lpba__cell--label">{row.label}</div>
              <div className="lpba__cell lpba__cell--before">
                <span className="lpba__x">✕</span>
                {row.before}
              </div>
              <div className="lpba__cell lpba__cell--after">
                <span className="lpba__check">✓</span>
                {row.after}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}
