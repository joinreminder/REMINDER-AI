import { useState } from 'react'

const FAQS = [
  {
    q: 'Já tenho alguém a responder aos pedidos. Porque precisaria disto?',
    a: 'Porque a questão não é apenas quem responde; é garantir que todos os pedidos têm resposta útil, responsável, próximo passo e acompanhamento — incluindo quando a equipa está ocupada, fora de horas ou em obra.',
  },
  {
    q: 'Já tenho CRM.',
    a: 'A Reminder não começa por substituir o CRM. O diagnóstico identifica se existem falhas entre os canais de entrada, a resposta inicial, o registo e o seguimento; a implementação liga-se ao processo atual sempre que fizer sentido.',
  },
  {
    q: 'Os meus clientes não querem falar com IA.',
    a: 'A automação pode recolher o essencial e encaminhar rapidamente. O tom, regras de resposta, limites e momentos de intervenção humana são definidos pela empresa. Não se trata de substituir uma relação comercial por mensagens genéricas.',
  },
  {
    q: 'Quanto custa?',
    a: 'O diagnóstico é gratuito. A implementação só é proposta depois de analisar volume, canais, valor por contrato e impacto provável. O investimento depende do número de canais e workflows prioritários, e inclui setup, formação e acompanhamento inicial.',
  },
  {
    q: 'Tenho poucos pedidos. Faz sentido?',
    a: 'Pode fazer sentido se o valor de um contrato for elevado. No diagnóstico avaliamos volume, ticket e potencial de retorno. Se a economia não justificar, recomendamos não avançar.',
  },
  {
    q: 'Tenho de usar uma nova ferramenta?',
    a: 'O objetivo é reduzir trabalho, não criar mais uma plataforma para preencher. Começamos pelas ferramentas e canais atuais e definimos apenas os pontos necessários para dar visibilidade e garantir acompanhamento.',
  },
]

export default function LPFaq() {
  const [open, setOpen] = useState(null)

  return (
    <section className="lp-faq">
      <div className="r-container">

        {/* Close */}
        <div className="lp-faq__close-block">
          <h2 className="lp-h2">
            Cada pedido sem resposta e cada orçamento sem próxima ação é uma oportunidade que pode não voltar.
          </h2>
          <p className="lp-faq__close-text">
            Em 30 minutos, vemos o processo real, identificamos as falhas mais prováveis e estimamos o valor em risco com base nos seus dados. Se não houver um caso económico credível, dizemos-lhe isso.
          </p>
          <div className="lp-faq__cta-wrap">
            <a href="/diagnostico" className="lp-cta-btn">
              Pedir Diagnóstico de Fugas de Receita →
            </a>
            <p className="lp-faq__microcopy">
              Gratuito · Sem compromisso · Resposta em 24 horas úteis
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="lp-faq__section">
          <p className="lp-section-label" style={{ marginBottom: '32px' }}>Perguntas frequentes</p>
          <div className="lp-faq__list">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className={`lp-faq__item${open === i ? ' is-open' : ''}`}
              >
                <button
                  className="lp-faq__question"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  {f.q}
                  <span className="lp-faq__icon">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && (
                  <div className="lp-faq__answer">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
