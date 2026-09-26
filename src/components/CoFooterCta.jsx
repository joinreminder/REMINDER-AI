export default function CoFooterCta() {
  return (
    <section id="cta-final" style={{
      padding: 'clamp(96px, 12vw, 160px) 0',
      background: 'var(--co-black)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div className="co-container">
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>

          <span className="co-eyebrow co-eyebrow--dim" style={{ display: 'block', textAlign: 'center' }}>O próximo passo</span>

          <h2 style={{
            fontFamily: 'var(--co-font-d)', fontWeight: 800,
            fontSize: 'clamp(36px, 5vw, 64px)', color: 'white',
            letterSpacing: '-0.035em', lineHeight: 1.05, textAlign: 'center',
            marginBottom: '24px',
          }}>
            Quantos projetos conseguiria entregar<br />se a operação deixasse de depender<br />
            <span style={{ color: 'var(--co-blue)' }}>de follow-ups manuais?</span>
          </h2>

          <p style={{
            fontFamily: 'var(--co-font-b)', fontSize: '17px', color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.72, textAlign: 'center', maxWidth: '560px', margin: '0 auto 40px',
          }}>
            A Reminder AI analisa um processo da sua operação, identifica o trabalho que pode ser executado automaticamente e desenha um primeiro AI Workflow para o colocar em produção.
            <br /><br />
            Começamos por um processo. Medimos o resultado. Depois expandimos.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="mailto:hello@reminder.ai" className="co-btn co-btn--primary co-btn--lg">
                Agendar diagnóstico gratuito
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a href="/diagnostico" className="co-btn co-btn--outline">
                Ver diagnóstico gratuito
              </a>
            </div>

            <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '12px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>
              Diagnóstico gratuito · 60 minutos · Sem compromisso
            </span>

          </div>

          {/* Divider */}
          <div style={{ marginTop: '80px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Começamos por um processo', 'Medimos o resultado', 'Depois expandimos'].map((t, i, arr) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>{t}</span>
                {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '10px' }}>·</span>}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
