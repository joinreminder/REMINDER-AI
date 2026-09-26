import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'O que é o Revenue & Capacity Map?',
    a: 'É uma sessão de 60 minutos onde analisamos o funcionamento real da sua empresa — receita, pessoas, processos, operações e sistemas. O objetivo não é produzir um relatório. É encontrar as 1–3 oportunidades com maior impacto económico e definir o que faria sentido construir primeiro. É gratuito e sem compromisso.',
  },
  {
    q: 'O que constroem exatamente?',
    a: 'Construímos sistemas. Não vendemos ferramentas individuais nem automações avulsas. O que implementamos são processos comerciais e operacionais que eliminam fugas de receita, tempo e capacidade. Cada sistema tem um problema concreto que resolve e um resultado esperado definido antes de começarmos.',
  },
  {
    q: 'Com que tipo de empresas trabalham?',
    a: 'Empresas de serviços em crescimento, tipicamente entre 10 e 100 colaboradores, que já têm volume de negócio e cuja capacidade de crescer começa a ser limitada por processos manuais ou sistemas desconectados. O critério não é o setor — é a existência de um problema económico real que consigamos resolver.',
  },
  {
    q: 'Quanto custa?',
    a: 'A implementação de cada sistema começa a partir de €1.500. A gestão mensal começa a partir de €500/mês. O valor final depende da complexidade do processo e das integrações necessárias. O Revenue & Capacity Map é sempre gratuito — só depois apresentamos uma proposta com números concretos e o resultado esperado.',
  },
  {
    q: 'Quanto tempo demora a implementação?',
    a: 'O objetivo para implementações standard é 14 dias a partir da aprovação do plano. Nunca colocamos o sistema em produção sem testes — e nunca começamos a cobrar gestão mensal antes do sistema estar funcional.',
  },
  {
    q: 'A minha equipa vai ter de aprender ferramentas novas?',
    a: 'Não é o objetivo. Tratamos de toda a análise, configuração, integrações e testes. A equipa aprende apenas o que precisa de fazer no dia-a-dia — que normalmente é menos do que faz agora, não mais.',
  },
  {
    q: 'O que acontece se não encontrarem nada a melhorar?',
    a: 'Dizemos-lhe honestamente. O diagnóstico é gratuito e sem compromisso. Se não identificarmos uma oportunidade onde o investimento faça sentido, não avançamos — e dizemos-lhe porquê.',
  },
  {
    q: 'Isto é consultoria ou implementação?',
    a: 'Implementação. O diagnóstico ajuda a perceber o problema e a prioridade. O que vem a seguir é a construção do sistema, a configuração, as integrações, os testes e o lançamento. Não entregamos documentos de análise — entregamos sistemas a funcionar.',
  },
  {
    q: 'Que garantia tenho?',
    a: 'Se não conseguirmos entregar os elementos acordados dentro do âmbito definido, continuamos a trabalhar sem custo adicional até concluir. Não prometemos um valor específico de receita recuperada. Prometemos um processo implementado e funcional.',
  },
  {
    q: 'Por que só 4 empresas por mês?',
    a: 'Porque cada implementação requer atenção dedicada. Preferimos trabalhar bem com menos empresas do que entregar algo mediano a muitas. As 4 vagas mensais são reais — não é uma técnica de marketing.',
  },
]

export default function RFaq() {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(open === i ? null : i)
  const headRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 24, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      })
      gsap.from(listRef.current, {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 82%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#F4F7FB', padding: 'clamp(80px, 10vw, 120px) 0' }} id="faq">
      <div className="ayl-container">

        <div className="r-faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'flex-start' }}>

          {/* Left: header */}
          <div ref={headRef} style={{ position: 'sticky', top: '100px' }}>
            <div className="ayl-section-label" style={{ marginBottom: '20px' }}>FAQ</div>
            <h2 className="ayl-h2" style={{ marginBottom: '16px' }}>
              As perguntas que toda a gente faz.
            </h2>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.65 }}>
              Com respostas directas.<br />Sem marketing.
            </p>
          </div>

          {/* Right: accordion */}
          <div ref={listRef} style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            {faqs.map((item, i) => (
              <div key={i} style={{
                borderBottom: i < faqs.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
              }}>
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: '100%', padding: '20px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 600,
                    fontSize: 'clamp(13px, 1.3vw, 15px)', color: '#111',
                    letterSpacing: '-0.02em', lineHeight: 1.4,
                  }}>
                    {item.q}
                  </span>
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: open === i ? '#217FF1' : '#F4F7FB',
                    border: `1px solid ${open === i ? '#217FF1' : 'rgba(0,0,0,0.1)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: '14px', fontWeight: 700,
                    color: open === i ? '#fff' : '#777',
                    transition: 'all 0.2s',
                  }}>
                    {open === i ? '−' : '+'}
                  </span>
                </button>
                {open === i && (
                  <div style={{ padding: '0 24px 20px', paddingLeft: '24px' }}>
                    <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.75, margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
