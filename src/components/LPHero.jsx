export default function LPHero() {
  return (
    <section className="lp-hero">
      <div className="lp-hero__wrap r-container">

        {/* Left — copy */}
        <div className="lp-hero__left">
          <p className="lp-hero__eyebrow">
            Para empresas de AVAC que recebem pedidos de orçamento todos os dias
          </p>

          <h1 className="lp-hero__h1">
            Transforme mais pedidos de orçamento em contratos — sem comprar mais leads.
          </h1>

          <p className="lp-hero__sub">
            A Reminder identifica onde pedidos e propostas ficam esquecidos e, se houver retorno, instala um processo de resposta, qualificação e follow-up para que cada oportunidade tenha responsável e próximo passo.
          </p>

          <div className="lp-hero__cta-wrap">
            <a href="/diagnostico" className="lp-cta-btn">
              Pedir Diagnóstico de Fugas de Receita →
            </a>
            <p className="lp-hero__microcopy">
              Gratuito · 30 minutos · Sem compromisso · Para empresas com volume regular de pedidos
            </p>
          </div>

          <p className="lp-hero__qualify">
            Para empresas AVAC com 20+ pedidos comerciais por mês ou contratos médios acima de 3.000€.
          </p>
        </div>

        {/* Right — flow visual */}
        <div className="lp-hero__right">
          <div className="lp-flow">

            <div className="lp-flow__card lp-flow__card--source">
              <div className="lp-flow__source-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.82.476 3.53 1.308 5.012L2 22l5.618-1.293A9.453 9.453 0 0011.5 21C16.738 21 21 16.738 21 11.5S16.738 2 11.5 2z"/></svg>
                WhatsApp
              </div>
              <p className="lp-flow__message">
                "Preciso de orçamento para manutenção de 3 unidades."
              </p>
            </div>

            <div className="lp-flow__arrow">
              <span className="lp-flow__timing">38 segundos</span>
              <svg width="14" height="24" viewBox="0 0 14 24" fill="none"><path d="M7 0v20M1 14l6 8 6-8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            <div className="lp-flow__card lp-flow__card--data">
              <p className="lp-flow__card-label">Dados recolhidos</p>
              <div className="lp-flow__data-rows">
                <div className="lp-flow__data-row"><span>Serviço</span><strong>Manutenção AVAC</strong></div>
                <div className="lp-flow__data-row"><span>Local</span><strong>Lisboa</strong></div>
                <div className="lp-flow__data-row"><span>Urgência</span><strong>Esta semana</strong></div>
              </div>
            </div>

            <div className="lp-flow__arrow">
              <span className="lp-flow__timing">atribuído a</span>
              <svg width="14" height="24" viewBox="0 0 14 24" fill="none"><path d="M7 0v20M1 14l6 8 6-8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            <div className="lp-flow__card lp-flow__card--owner">
              <div className="lp-flow__owner-row">
                <div className="lp-flow__avatar">M</div>
                <div>
                  <p className="lp-flow__card-label">Responsável</p>
                  <p className="lp-flow__owner-name">Miguel Santos</p>
                </div>
              </div>
              <p className="lp-flow__next-step">Próximo passo: ligar hoje, 14:30</p>
            </div>

            <div className="lp-flow__arrow">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M7 0v12M1 6l6 8 6-8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            <div className="lp-flow__card lp-flow__card--done">
              <div className="lp-flow__done-row">
                <span className="lp-flow__check">✓</span> Orçamento enviado
              </div>
              <div className="lp-flow__done-row">
                <span className="lp-flow__check">✓</span> Follow-up marcado
              </div>
              <div className="lp-flow__done-row">
                <span className="lp-flow__check">✓</span> Resultado registado
              </div>
            </div>

          </div>

          {/* Under-flow bullets */}
          <ul className="lp-hero__bullets">
            <li>Resposta inicial e qualificação estruturada</li>
            <li>Responsável e próxima ação em cada oportunidade</li>
            <li>Seguimento de orçamentos sem depender da memória</li>
          </ul>
        </div>

      </div>
    </section>
  )
}
