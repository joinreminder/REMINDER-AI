import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DELIVERABLES = [
  'Mapa dos canais por onde entram os pedidos.',
  'Análise do caminho pedido → resposta → visita/orçamento → follow-up → resultado.',
  'Identificação de pedidos sem responsável, resposta ou próximo passo.',
  'Revisão de orçamentos sem atividade e follow-up em aberto.',
  'Baseline de métricas: tempo de primeira resposta, oportunidades paradas e conversão disponível.',
  'Estimativa por cenários do valor económico em risco.',
  'Recomendação honesta: implementar, testar num piloto, medir primeiro ou não avançar.',
]

export default function LPDiagnostico() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 75%', once: true },
      })
      gsap.from(rightRef.current.children, {
        y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.08, delay: 0.2,
        scrollTrigger: { trigger: rightRef.current, start: 'top 75%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="lp-diag">
      <div className="r-container">

        <div className="lp-diag__inner">

          <div className="lp-diag__left" ref={leftRef}>
            <p className="lp-section-label lp-section-label--light">O diagnóstico</p>
            <h2 className="lp-h2 lp-h2--white">
              Primeiro encontramos as fugas. Só depois decide se vale a pena corrigir.
            </h2>
            <p className="lp-diag__intro">
              O Diagnóstico de Fugas de Receita Reminder é uma análise orientada ao processo comercial atual — não é uma demo genérica nem uma apresentação de software.
            </p>

            <div className="lp-diag__criteria">
              <p className="lp-diag__criteria-title">Para quem é este diagnóstico</p>
              <p className="lp-diag__criteria-text">
                Para empresas AVAC com pedidos comerciais regulares e valor suficiente por obra ou contrato para justificar melhorar a conversão. Não é indicado para quem procura apenas um chatbot barato ou uma nova ferramenta para a equipa preencher.
              </p>
            </div>
          </div>

          <div className="lp-diag__right" ref={rightRef}>
            <p className="lp-diag__list-title">O que recebem</p>
            <ul className="lp-diag__list">
              {DELIVERABLES.map((d, i) => (
                <li key={i} className="lp-diag__list-item">
                  <span className="lp-diag__check">✓</span>
                  {d}
                </li>
              ))}
            </ul>

            <div className="lp-diag__cta-wrap">
              <a href="/diagnostico" className="lp-cta-btn lp-cta-btn--white">
                Pedir Diagnóstico de Fugas de Receita →
              </a>
              <p className="lp-diag__microcopy">
                Após o pedido, confirmamos a elegibilidade e enviamos a opção de marcação. A conversa dura 30 minutos.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
