import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const FAQS = [
  { q: 'Preciso de trocar o meu CRM ou PSA?', a: 'Não. A Reminder AI foi desenhada para trabalhar sobre os sistemas que já utiliza, sempre que existam integrações adequadas.' },
  { q: 'Isto substitui a minha equipa?', a: 'Não. O objetivo é retirar trabalho operacional repetitivo e permitir que a equipa se concentre em decisões, relacionamento com clientes e trabalho de maior valor.' },
  { q: 'A IA pode enviar emails aos meus clientes?', a: 'Sim. Podemos configurar comunicações automáticas de acordo com regras, contexto e aprovação definidos no workflow.' },
  { q: 'E se o cliente não responder?', a: 'O Worker identifica a pendência, executa os follow-ups definidos e, quando necessário, encaminha a situação para a pessoa responsável.' },
  { q: 'E se cada cliente tiver necessidades diferentes?', a: 'O sistema pode trabalhar com regras, condições e caminhos diferentes. O objetivo não é assumir que todos os clientes são iguais, mas automatizar o caminho normal e encaminhar exceções.' },
  { q: 'A IA pode tomar decisões sozinha?', a: 'Apenas dentro das regras e permissões definidas. Decisões que exigem julgamento humano são encaminhadas para a equipa.' },
  { q: 'Que sistemas podem integrar?', a: 'Depende do processo. Normalmente trabalhamos com CRM, PSA, project management, email, calendário, Slack/Teams, documentação e outros sistemas relevantes.' },
  { q: 'Tenho de ter um processo perfeitamente definido?', a: 'Não. Parte da implementação consiste precisamente em mapear o processo atual, identificar inconsistências e definir o workflow que deve ser automatizado.' },
  { q: 'Posso começar por outro processo que não o onboarding?', a: 'Sim. O onboarding é um excelente primeiro workflow, mas podemos começar por qualquer processo operacional repetitivo onde exista volume, regras e um resultado mensurável.' },
  { q: 'Quanto custa?', a: 'O investimento depende do processo, número de sistemas e complexidade das integrações. O diagnóstico inicial serve precisamente para determinar o âmbito e o investimento necessário.' },
]

function FaqItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      gsap.set(el, { height: 'auto', opacity: 1 })
      const h = el.offsetHeight
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.28, ease: 'power2.out' })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.2, ease: 'power2.in' })
    }
  }, [isOpen])

  return (
    <div className="co-faq-item">
      <button className="co-faq-btn" onClick={onToggle}>
        <span className="co-faq-q">{item.q}</span>
        <span className="co-faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="co-faq-body" ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p className="co-faq-a">{item.a}</p>
      </div>
    </div>
  )
}

export default function CoFaq() {
  const [open, setOpen] = useState(0)
  const toggle = i => setOpen(open === i ? -1 : i)

  return (
    <section className="co-section co-section--white" id="faq">
      <div className="co-container">

        <div className="co-grid-2i co-grid-stk" style={{ gap: 'clamp(48px, 6vw, 96px)' }}>

          <div>
            <span className="co-eyebrow">FAQ</span>
            <h2 className="co-h2" style={{ marginBottom: '16px' }}>
              As perguntas<br />que está<br />a fazer.
            </h2>
            <p className="co-body co-body--sm">Respostas directas, sem promessas vagas.</p>
          </div>

          <div style={{ borderTop: '1px solid var(--co-line)' }}>
            {FAQS.map((item, i) => (
              <FaqItem key={i} item={item} isOpen={open === i} onToggle={() => toggle(i)} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
