const METRICS = [
  { label: 'Tempo operacional por cliente', desc: 'Quanto tempo da equipa é consumido pelo processo antes e depois.' },
  { label: 'Intervenções humanas',          desc: 'Quantas ações continuam a exigir intervenção da equipa.' },
  { label: 'Tempo de resposta',             desc: 'Quanto tempo passa entre um evento e a ação necessária.' },
  { label: 'Follow-ups manuais',            desc: 'Quantos contactos precisam de ser feitos manualmente.' },
  { label: 'Clientes por colaborador',      desc: 'Quanto volume de clientes a equipa consegue suportar.' },
  { label: 'Exceções',                      desc: 'Quantas situações precisam realmente de julgamento humano.' },
]

export default function CoProof() {
  return (
    <section className="co-section co-section--white">
      <div className="co-container">

        <div className="co-grid-2i co-grid-stk" style={{ gap: 'clamp(48px, 6vw, 96px)' }}>

          <div>
            <span className="co-eyebrow">Resultados</span>
            <h2 className="co-h2" style={{ marginBottom: '20px' }}>
              Não vendemos "eficiência".{' '}
              <span style={{ color: 'var(--co-blue)' }}>Medimos capacidade.</span>
            </h2>
            <p className="co-body" style={{ marginBottom: '28px' }}>
              Antes de implementar, definimos as métricas. Depois de o workflow estar live, medimos o antes e o depois. O objetivo é simples: retirar trabalho operacional sem retirar controlo à equipa.
            </p>
            <div style={{
              padding: '16px 20px', border: '1px solid var(--co-line)',
              borderLeft: '3px solid var(--co-blue)', borderRadius: '8px',
            }}>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '14px', fontWeight: 500, color: 'var(--co-ink)', margin: '0 0 6px 0' }}>
                O objetivo não é substituir pessoas.
              </p>
              <p style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', color: 'var(--co-muted)', margin: 0, lineHeight: 1.6 }}>
                É aumentar a capacidade de cada pessoa.
              </p>
            </div>
          </div>

          <div style={{ border: '1px solid var(--co-line)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--co-line)', background: 'var(--co-surface)' }}>
              <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '10px', fontWeight: 600, color: 'var(--co-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                O que medimos em cada projeto
              </span>
            </div>
            {METRICS.map((m, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '160px 1fr', gap: '16px',
                padding: '14px 24px', borderBottom: i < METRICS.length - 1 ? '1px solid var(--co-line)' : 'none',
                alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', fontWeight: 600, color: 'var(--co-ink)' }}>{m.label}</span>
                <span style={{ fontFamily: 'var(--co-font-b)', fontSize: '13px', color: 'var(--co-muted)', lineHeight: 1.5 }}>{m.desc}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
