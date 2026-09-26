const STEPS = [
  {
    num: '01',
    title: 'Capturar',
    desc: 'Os pedidos relevantes de canais prioritários entram num processo único, com contexto e origem registados. Nenhum fica escondido num telemóvel ou perdido entre caixas de entrada.',
  },
  {
    num: '02',
    title: 'Responder e encaminhar',
    desc: 'Cada novo pedido recebe uma resposta adequada, é qualificado e fica atribuído a uma pessoa. O tipo de serviço, urgência e localização ficam registados antes de ocupar a equipa.',
  },
  {
    num: '03',
    title: 'Acompanhar até ao resultado',
    desc: 'Orçamentos, contactos e oportunidades paradas ganham próximo passo, data e visibilidade. O sistema acompanha até existir um resultado: fechado, perdido ou a aguardar.',
  },
]

export default function LPMechanism() {
  return (
    <section className="lp-mech">
      <div className="r-container">

        <div className="lp-mech__top">
          <p className="lp-section-label">Como funciona</p>
          <h2 className="lp-h2">
            Não é mais um CRM. É um processo que acontece sem depender da memória.
          </h2>
          <p className="lp-mech__intro">
            A Reminder liga os canais e regras que a empresa já usa. A automação trata tarefas repetitivas; a equipa entra quando precisa de contexto, julgamento técnico e relação comercial.
          </p>
        </div>

        <div className="lp-mech__steps">
          {STEPS.map((s, i) => (
            <div key={i} className="lp-mech__step">
              <div className="lp-mech__step-num">{s.num}</div>
              <h3 className="lp-mech__step-title">{s.title}</h3>
              <p className="lp-mech__step-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="lp-mech__control">
          A equipa mantém controlo sobre mensagens, regras de escalonamento e decisões de fecho. A Reminder não substitui técnicos nem vendedores.
        </div>

      </div>
    </section>
  )
}
