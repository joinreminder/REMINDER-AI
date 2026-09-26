const NAV_LINKS = [
  { label: 'Início', href: '#' },
  { label: 'O Problema', href: '#problem' },
  { label: 'Resultados', href: '#social-proof' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'O Sistema', href: '#process' },
  { label: 'FAQ', href: '#objections' },
  { label: 'Marcar o Diagnóstico', href: '#final-cta' },
]

const PRODUCT_LINKS = [
  { label: 'Diagnóstico de Receita', href: '#final-cta' },
  { label: 'Sistema de Recuperação', href: '#process' },
  { label: 'Gestão Mensal', href: '#process' },
]

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@remindr-ai.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="footer2">
      <div className="container">
        <div className="footer2__card">

          <div className="footer2__grid">

            <div className="footer2__brand">
              <a href="#" className="footer2__logo" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                <img src="/logotipo-editado.png" alt="" style={{ height: 28, width: 'auto' }} />
                <span style={{ fontSize: 16, fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>remindr</span>
              </a>
              <p className="footer2__tagline">
                Clinic Growth Partner<br />
                para clínicas privadas portuguesas.
              </p>
              <div className="footer2__socials">
                {SOCIAL.map(s => (
                  <a key={s.label} href={s.href} className="footer2__social" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer2__col">
              <p className="footer2__col-title">Navegação</p>
              <ul className="footer2__links">
                {NAV_LINKS.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="footer2__link">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer2__col">
              <p className="footer2__col-title">Metodologia</p>
              <ul className="footer2__links">
                {PRODUCT_LINKS.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="footer2__link">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer2__col">
              <p className="footer2__col-title">Contacto</p>
              <a href="mailto:hello@remindr-ai.com" className="footer2__contact-email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                hello@remindr-ai.com
              </a>
              <p className="footer2__contact-note">
                Respondemos em menos de 24h úteis.
              </p>
            </div>

          </div>

          <div className="footer2__divider" />

          <div className="footer2__bottom">
            <p className="footer2__copy">
              © 2026 Reminder · Todos os direitos reservados · RGPD compliant
            </p>
            <div className="footer2__legal">
              <a href="/privacy.html" className="footer2__legal-link" target="_blank">Política de Privacidade</a>
              <span className="footer2__legal-dot">·</span>
              <a href="/terms.html" className="footer2__legal-link" target="_blank">Termos e Condições</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
