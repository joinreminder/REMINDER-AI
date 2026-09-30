import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const FAQS = [
  {
    q: 'O que é que a Reminder faz exactamente?',
    a: 'Construímos e operamos sistemas comerciais que encontram, contactam, acompanham e qualificam prospects e leads até à reunião.\n\nPodemos trabalhar outbound, inbound ou reactivar oportunidades que ficaram paradas no CRM.',
  },
  {
    q: 'A IA substitui os meus vendedores?',
    a: 'Não.\n\nA Reminder foi criada para retirar trabalho operacional da equipa comercial — não para substituir a parte humana da venda.\n\nA IA trata da execução. Os vendedores tratam das oportunidades e do fecho.',
  },
  {
    q: 'Preciso de mudar o meu CRM ou ferramentas?',
    a: 'Não.\n\nTrabalhamos com as ferramentas que a sua empresa já utiliza e integramos o sistema no processo comercial existente sempre que possível.',
  },
  {
    q: 'Garantem reuniões ou receita?',
    a: 'Definimos previamente o que é uma reunião qualificada e os critérios que uma oportunidade deve cumprir.\n\nTrabalhamos para atingir os objectivos acordados, mas não garantimos receita, porque o resultado final depende também da oferta, do mercado e da capacidade comercial da empresa.',
  },
  {
    q: 'Tenho de configurar tudo sozinho?',
    a: 'Não.\n\nNós construímos, configuramos, operamos e optimizamos o sistema.\n\nA sua equipa não precisa de aprender a construir automações ou agentes de IA.',
  },
  {
    q: 'Como funciona o diagnóstico gratuito?',
    a: 'Analisamos o seu processo comercial, identificamos onde existem oportunidades de melhoria e mostramos onde pode existir potencial para gerar ou recuperar mais reuniões.\n\nRecebe um roadmap personalizado, sem compromisso.',
  },
  {
    q: 'E se a IA não souber responder a alguma coisa?',
    a: 'Definimos regras para identificar situações que exigem intervenção humana.\n\nQuando uma conversa ultrapassa os critérios definidos, a oportunidade pode ser encaminhada para a equipa comercial.',
  },
  {
    q: 'Quanto custa?',
    a: 'O investimento depende do volume, mercado, canais e complexidade da operação.\n\nComeçamos sempre por perceber o processo comercial e definir o sistema adequado à sua empresa.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      gsap.set(el, { height: 'auto', opacity: 1 })
      const h = el.offsetHeight
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
    }
  }, [isOpen])

  return (
    <div className={`cs-faq__item${isOpen ? ' cs-faq__item--open' : ''}`}>
      <button className="cs-faq__question" onClick={onToggle}>
        <span>{item.q}</span>
        <span className="cs-faq__icon">{isOpen ? '\u2212' : '+'}</span>
      </button>
      <div className="cs-faq__body" ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p className="cs-faq__answer">{item.a}</p>
      </div>
    </div>
  )
}

export default function CsFaq() {
  const [openIndex, setOpenIndex] = useState(0)
  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i)

  return (
    <section className="cs-faq" id="faq">
      <div className="ayl-container">
        <div className="cs-faq__layout">
          <div className="cs-faq__head">
            <div className="ayl-services__pill" style={{ marginBottom: 0 }}>FAQ</div>
          </div>
          <div className="cs-faq__content">
            <h2 className="ayl-h2 cs-faq__h2" style={{ color: '#0a1c42' }}>
              Perguntas frequentes
            </h2>
            <div className="cs-faq__list">
              {FAQS.map((item, i) => (
                <FaqItem key={i} item={item} isOpen={openIndex === i} onToggle={() => toggle(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
