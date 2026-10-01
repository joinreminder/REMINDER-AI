import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const FAQS = [
  {
    q: 'O que faz exactamente a Reminder?',
    a: 'A Reminder constrói e opera o motor de outbound da sua empresa: identifica os decisores certos dentro do seu ICP, faz research, executa o contacto multicanal, acompanha com follow-up, qualifica os prospects e agenda reuniões directamente no calendário da equipa comercial.\n\nO resultado é uma operação de outbound done-for-you — sem que a sua equipa tenha de tratar de prospeção, listas ou follow-up.',
  },
  {
    q: 'A Reminder substitui a equipa comercial?',
    a: 'Não.\n\nA Reminder trata do trabalho que acontece antes da reunião. A equipa comercial entra quando existe uma oportunidade qualificada para explorar.\n\nO objectivo é que os seus vendedores passem mais tempo a fechar — não a prospectar.',
  },
  {
    q: 'Trabalham apenas com outbound?',
    a: 'O nosso foco principal é outbound B2B — prospeção activa, contacto multicanal e qualificação de prospects.\n\nEm alguns casos, dependendo da operação do cliente, também podemos trabalhar com leads inbound existentes ou reactivar oportunidades que ficaram paradas no CRM.',
  },
  {
    q: 'Tenho de mudar o meu CRM ou ferramentas?',
    a: 'Não.\n\nTrabalhamos com as ferramentas que a sua empresa já utiliza. Se tiver HubSpot, Salesforce, Pipedrive ou outro CRM, integramos o processo sem obrigar a mudar nada.',
  },
  {
    q: 'Como definem o que é uma reunião qualificada?',
    a: 'Antes de começar, definimos consigo os critérios que uma reunião tem de cumprir para ser considerada qualificada — perfil da empresa, cargo do decisor, interesse identificado e outros requisitos relevantes para o seu negócio.\n\nNão entregamos simples confirmações de calendário. Entregamos oportunidades que cumprem os critérios acordados.',
  },
  {
    q: 'Como funciona o Roadmap gratuito?',
    a: 'O Roadmap é um diagnóstico gratuito do seu processo comercial.\n\nResponde a 11 perguntas sobre a sua operação actual e recebe uma análise personalizada: onde está a perder oportunidades, qual é o principal gargalo e um conjunto de acções concretas para melhorar.\n\nSem compromisso. Sem chamada de vendas obrigatória.',
  },
  {
    q: 'Quanto custa?',
    a: 'O investimento depende da dimensão da operação, mercado, canais e volume de prospects.\n\nComeçamos sempre por perceber o processo comercial e definir o sistema adequado. O Roadmap gratuito é o primeiro passo.',
  },
  {
    q: 'O que acontece depois do Roadmap?',
    a: 'Depois de receber o Roadmap, se fizer sentido, fazemos uma chamada de 30 minutos para perceber se existe fit.\n\nSe avançarmos, construímos a operação de outbound, definimos os critérios de qualificação e começamos a gerar reuniões qualificadas para a sua equipa.',
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
