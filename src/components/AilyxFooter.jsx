import { Link } from 'react-router-dom'

export default function AilyxFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="ayl-footer">
      <div className="ayl-container">

        <div className="ayl-footer__top">
          <span className="ayl-footer__logo-wrap">
            <img src="/logotipo-editado.png" alt="" width={310} height={306} className="ayl-footer__logo-bird" />
            <span className="ayl-footer__logo-mark">
              <span className="ayl-footer__logo-remindr">Reminder</span>
            </span>
          </span>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', marginTop: '16px', fontWeight: 700 }}>
            Reuniões Qualificadas com IA para empresas B2B.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', marginTop: '6px', lineHeight: 1.6 }}>
            Transforme mais oportunidades em reuniões qualificadas.
          </p>
        </div>

        <div className="ayl-footer__nav">
          <div className="ayl-footer__col">
            <div className="ayl-footer__col-title">Começar</div>
            <a href="#como-funciona" className="ayl-footer__link">Como funciona</a>
            <Link to="/roadmap" className="ayl-footer__link">Roadmap Gratuito</Link>
            <a href="mailto:equipa@joinreminder.com" className="ayl-footer__link">Contacto</a>
          </div>
          <div className="ayl-footer__col">
            <div className="ayl-footer__col-title">Empresa</div>
            <a href="#como-funciona" className="ayl-footer__link">Como funciona</a>
            <a href="#para-quem" className="ayl-footer__link">Para quem é</a>
            <a href="#faq" className="ayl-footer__link">FAQ</a>
          </div>
          <div className="ayl-footer__col">
            <div className="ayl-footer__col-title">Legal</div>
            <Link to="/privacidade" className="ayl-footer__link">Política de Privacidade</Link>
            <Link to="/cookies" className="ayl-footer__link">Política de Cookies</Link>
          </div>
        </div>

        <div className="ayl-footer__bottom">
          <span className="ayl-footer__copy">Reminder · {year}</span>
        </div>

      </div>
    </footer>
  )
}
