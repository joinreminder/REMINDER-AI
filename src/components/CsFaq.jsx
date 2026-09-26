import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const FAQS = [
  { q: 'Quanto custa o Roadmap?', a: 'Nada. O Roadmap é gratuito.' },
  { q: 'Quanto tempo demora?', a: 'Menos de 60 segundos para responder às 14 perguntas.' },
  { q: 'Preciso de marcar uma reunião?', a: 'Não. Pode receber o seu Roadmap sem falar com a nossa equipa.' },
  { q: 'Preciso de dar acesso ao meu CRM?', a: 'Não. O diagnóstico inicial é feito através das respostas do formulário.' },
  { q: 'O Roadmap é realmente personalizado?', a: 'Sim. O resultado é baseado nas respostas que fornece sobre o seu negócio e processo atual.' },
  { q: 'O que acontece depois?', a: 'Pode simplesmente utilizar o Roadmap. Se identificar uma oportunidade que queira explorar, poderá candidatar-se ao nosso 30-Day Pilot.' },
  { q: 'O Pilot é obrigatório?', a: 'Não. O Roadmap é uma oferta gratuita e independente.' },
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
        <span className="cs-faq__icon">{isOpen ? '−' : '+'}</span>
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
    <section className="cs-faq">
      <div className="ayl-container">
        <div className="cs-faq__layout">
          <div className="cs-faq__head" id="faq">
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
