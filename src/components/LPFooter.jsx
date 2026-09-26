const LINKS_PAGE = [
  { label: 'O problema',     href: '#services' },
  { label: 'Como funciona',  href: '#process' },
  { label: 'O diagnóstico',  href: '#diagnostico' },
  { label: 'A garantia',     href: '#guarantee' },
  { label: 'FAQ',            href: '#faq' },
]

export default function LPFooter() {
  return (
    <footer className="lp-footer">
      <div className="r-container">

        {/* Top */}
        <div className="lp-footer__top">
          <div className="lp-footer__brand">
            <a href="/" className="lp-footer__logo">Reminder</a>
            <p className="lp-footer__tagline">
              Sistema de Resposta e Follow-up<br />para Empresas de Serviços Técnicos.
            </p>
            <a href="/diagnostico" className="lp-footer__cta">
              Pedir Diagnóstico de Fugas de Receita →
            </a>
          </div>

          <div className="lp-footer__col">
            <p className="lp-footer__col-title">A landing</p>
            <ul className="lp-footer__col-links">
              {LINKS_PAGE.map((l, i) => (
                <li key={i}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="lp-footer__col">
            <p className="lp-footer__col-title">Diagnóstico</p>
            <ul className="lp-footer__col-links">
              <li><a href="/diagnostico">Pedir diagnóstico</a></li>
              <li><a href="/obrigado">Confirmação</a></li>
            </ul>
            <p className="lp-footer__col-title" style={{ marginTop: '28px' }}>Legal</p>
            <ul className="lp-footer__col-links">
              <li><a href="/privacidade">Política de Privacidade</a></li>
              <li><a href="/termos">Termos de Utilização</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="lp-footer__bottom">
          <p className="lp-footer__copy">
            © {new Date().getFullYear()} Reminder. Todos os direitos reservados.
          </p>
          <p className="lp-footer__disclaimer">
            Os dados partilhados no diagnóstico são tratados com confidencialidade e utilizados exclusivamente para preparar a análise.
          </p>
        </div>

      </div>
    </footer>
  )
}
