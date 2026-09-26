export default function CoGuarantee() {
  return (
    <section className="co-section co-section--white">
      <div className="co-container">
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>

          <span className="co-eyebrow" style={{ display: 'block', textAlign: 'center' }}>Garantia</span>
          <h2 className="co-h2" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Começamos pequeno.<br />Medimos.<br />Depois expandimos.
          </h2>

          <div className="co-grid-2" style={{ marginBottom: '32px' }}>
            {[
              {
                title: 'Âmbito definido',
                desc: 'O workflow é construído à volta do seu processo, dos seus dados e das suas regras. Não adaptamos a sua empresa a uma plataforma pré-construída.',
              },
              {
                title: 'Condições de sucesso definidas antes',
                desc: 'Antes de entrar em produção definimos claramente o que o Worker deve executar, quando pede intervenção humana e quais os critérios de sucesso.',
              },
            ].map((c, i) => (
              <div key={i} className="co-card">
                <h3 className="co-h3" style={{ fontSize: '17px', marginBottom: '10px' }}>{c.title}</h3>
                <p className="co-body co-body--sm">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div style={{
            padding: '32px 36px', background: 'var(--co-black)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
            display: 'flex', alignItems: 'flex-start', gap: '24px',
          }}>
            <div style={{
              width: 48, height: 48, flexShrink: 0, background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(37,99,235,0.25)', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10" stroke="#34d399" strokeWidth="2.5"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '11px', fontWeight: 600, color: 'var(--co-blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                O nosso compromisso
              </p>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '16px', fontWeight: 500, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: '0 0 10px 0' }}>
                Se o workflow não cumprir os critérios técnicos e funcionais definidos à partida, corrigimos sem custo adicional.
              </p>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.6 }}>
                Primeiro provamos um processo. Medimos o resultado. Depois expandimos o alcance.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
