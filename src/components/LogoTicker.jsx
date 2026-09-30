const LOGOS = [
  { src: '/logo_rdpower.png',        alt: 'RD Power Nutrition' },
  { src: '/logo_nrtechsolucion.png', alt: 'NR Techsolución' },
  { src: '/logo_jpcrodrigues.png',   alt: 'JPC Rodrigues' },
  { src: '/logo_jj_bespoke.png',     alt: 'J&J Bespoke Travel' },
]

export default function LogoTicker() {
  const items = [...LOGOS, ...LOGOS, ...LOGOS]
  return (
    <div className="logo-ticker">
      <p className="logo-ticker__label">Empresas que já confiam na Reminder</p>
      <div className="logo-ticker__track-wrap">
        <div className="logo-ticker__track">
          {items.map((l, i) => (
            <div key={i} className="logo-ticker__item">
              <img src={l.src} alt={l.alt} loading="lazy" decoding="async" className="logo-ticker__img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
