export default function CoFooter() {
  return (
    <footer style={{
      background: '#070707', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '36px 0',
    }}>
      <div className="co-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <img src="/logotipo-editado.png" alt="" style={{ width: 18, filter: 'brightness(10)', opacity: 0.5 }} />
              <span style={{ fontFamily: 'var(--co-font-d)', fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.02em' }}>
                Reminder AI
              </span>
            </div>
            <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>
              Não vendemos IA. Construímos capacidade.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Começar</span>
              {[{ href: '#cta-final', label: 'Diagnóstico gratuito' }, { href: 'mailto:hello@reminder.ai', label: 'Falar com a equipa' }].map(l => (
                <a key={l.href} href={l.href} style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{l.label}</a>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Produto</span>
              {[{ href: '#mecanismo', label: 'Como funciona' }, { href: '#o-que-executamos', label: 'AI Workers' }, { href: '#oferta', label: 'Implementação' }, { href: '#faq', label: 'FAQ' }].map(l => (
                <a key={l.href} href={l.href} style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{l.label}</a>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Legal</span>
              {[{ href: '/privacy', label: 'Política de Privacidade' }, { href: '/terms', label: 'Termos e Condições' }].map(l => (
                <a key={l.href} href={l.href} style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{l.label}</a>
              ))}
            </div>
          </div>

          <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '12px', color: 'rgba(255,255,255,0.15)' }}>
            © {new Date().getFullYear()} Reminder AI
          </span>

        </div>
      </div>
    </footer>
  )
}
