export default function AilyxFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="ayl-footer">
      <div className="ayl-container">

        <div className="ayl-footer__top">
          <span className="ayl-footer__logo-wrap">
            <img src="/logotipo-editado.png" alt="" className="ayl-footer__logo-bird" />
            <span className="ayl-footer__logo-mark">
              <span className="ayl-footer__logo-remindr">Reminder</span>
              <span className="ayl-footer__logo-ai"> AI</span>
            </span>
          </span>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', marginTop: '12px' }}>
            Transforme mais leads em oportunidades comerciais.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '6px' }}>
            A sua equipa fecha. Nós fazemos o trabalho antes da reunião.
          </p>
        </div>

        <div className="ayl-footer__nav">
          <div className="ayl-footer__col">
            <div className="ayl-footer__col-title">Começar</div>
            <a href="/diagnostico" className="ayl-footer__link">Roadmap Gratuito</a>
            <a href="/diagnostico" className="ayl-footer__link">Falar com a equipa</a>
          </div>
          <div className="ayl-footer__col">
            <div className="ayl-footer__col-title">O que fazemos</div>
            <a href="#mechanism" className="ayl-footer__link">Como funciona</a>
            <a href="#audit" className="ayl-footer__link">As 5 Dimensões</a>
            <a href="#about" className="ayl-footer__link">Para quem é</a>
            <a href="#faq" className="ayl-footer__link">FAQ</a>
          </div>
          <div className="ayl-footer__col">
            <div className="ayl-footer__col-title">Legal</div>
            <a href="/privacy.html" className="ayl-footer__link">Política de Privacidade</a>
            <a href="/terms.html" className="ayl-footer__link">Termos e Condições</a>
          </div>
        </div>

        <div className="ayl-footer__bottom">
          <span className="ayl-footer__copy">Reminder AI {year}. Todos os direitos reservados.</span>
          <span className="ayl-footer__design">A sua equipa fecha. Nós fazemos o trabalho antes da reunião.</span>
        </div>

      </div>
    </footer>
  )
}
