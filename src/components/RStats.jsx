const stats = [
  {
    value: '60 min',
    label: 'Diagnóstico completo',
    sub: 'Gratuito · Sem compromisso',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#217FF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    value: '14 dias',
    label: 'Implementação standard',
    sub: 'Da aprovação ao sistema activo',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#217FF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    value: '4 / mês',
    label: 'Empresas por ciclo',
    sub: 'Vagas limitadas por design',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#217FF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

export default function RStats() {
  return (
    <div style={{
      background: '#fff',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
    }}>
      <div className="ayl-container">
        <div className="r-stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: 'clamp(28px, 3.5vw, 44px) clamp(20px, 2.5vw, 32px)',
              borderRight: i < stats.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
              display: 'flex', flexDirection: 'column', gap: '8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {s.icon}
                <span style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(22px, 2.5vw, 32px)',
                  color: '#111', letterSpacing: '-0.04em', lineHeight: 1,
                }}>
                  {s.value}
                </span>
              </div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#333', margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
