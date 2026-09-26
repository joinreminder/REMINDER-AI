import { useEffect, useRef, useState } from 'react'

const METHODOLOGY = [
  {
    num: '01',
    title: 'Diagnóstico de Receita',
    text: 'Diagnóstico gratuito que mapeia o percurso do paciente, quantifica a receita perdida em euros e calcula o ROI antes de qualquer implementação. Sem compromisso.',
  },
  {
    num: '02',
    title: 'Sistema de Recuperação',
    text: 'Implementação completa — do percurso do paciente à automatização. Feita pela nossa equipa, sem interromper a clínica. Primeiros resultados em 4–6 semanas.',
  },
  {
    num: '03',
    title: 'Gestão Mensal',
    text: 'Acompanhamento mensal contínuo. Receita recuperada, faltas evitadas, pacientes reativados — medidos e reportados ao dono da clínica todos os meses.',
  },
]

export default function Guarantee() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="guarantee2" id="guarantee" ref={sectionRef}>
      <div className="guarantee2__watermark" aria-hidden="true">™</div>

      <div className="container">
        <div className="guarantee2__inner">

          <div className={`guarantee2__left${visible ? ' guarantee2--in' : ''}`}>
            <div className="guarantee2__badge">
              <span className="guarantee2__badge-dot" />
              Clinic Growth Partner · Reminder
            </div>

            <h2 className="guarantee2__title">
              Não vendemos software.<br />
              <span className="guarantee2__title-accent">Vendemos crescimento.</span>
            </h2>

            <p className="guarantee2__sub">
              A diferença entre nós e uma agência ou consultora é simples: definimos objetivos
              claros antes do projeto e continuamos a trabalhar até os resultados acordados
              serem atingidos. Sem desculpas, sem relatórios vazios.
            </p>

            <div className="guarantee2__seal">
              <div className="guarantee2__seal-ring" />
              <div className="guarantee2__seal-inner">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
            </div>

            <a href="#final-cta" className="guarantee2__cta">
              Marcar o Diagnóstico
              <span>→</span>
            </a>
          </div>

          <div className="guarantee2__right">
            {METHODOLOGY.map((c, i) => (
              <div
                key={c.num}
                className={`guarantee2__item${visible ? ' guarantee2__item--in' : ''}`}
                style={{ transitionDelay: `${0.15 + i * 0.12}s` }}
              >
                <div className="guarantee2__item-num">{c.num}</div>
                <div className="guarantee2__item-body">
                  <p className="guarantee2__item-title">{c.title}</p>
                  <p className="guarantee2__item-text">{c.text}</p>
                </div>
                <div className="guarantee2__item-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            ))}

            <div className={`guarantee2__fine${visible ? ' guarantee2--in' : ''}`} style={{ transitionDelay: '0.55s' }}>
              Se após o Diagnóstico o retorno projetado não justificar o investimento,
              dizemos isso antes de avançar. Sem compromisso, sem custo. Sem pressão.
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
