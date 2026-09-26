/* Shared robot panel — used in AilyxHero and LPMecanismo */

function WaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
function IgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#E1306C">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}
function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#C084FC">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  )
}
function CalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

const CHANNEL_CARDS = [
  {
    pos: { top: '2%', left: '0%' },
    delay: '0s',
    accentColor: '#25D366',
    border: 'rgba(37,211,102,0.45)',
    header: { icon: <WaIcon />, label: 'WhatsApp', badge: 'Recebido', badgeColor: '#25D366' },
    body: '"Quero orçamento urgente para AVAC"',
    footer: { dot: true, text: 'A processar pedido...' },
  },
  {
    pos: { top: '2%', right: '0%' },
    delay: '0.65s',
    accentColor: '#E1306C',
    border: 'rgba(225,48,108,0.45)',
    header: { icon: <IgIcon />, label: 'Instagram DM', badge: 'Recebido', badgeColor: '#E1306C' },
    body: '"Olá João! Enviámos a proposta."',
    footer: { dot: false, text: '✓ Respondido automaticamente' },
  },
  {
    pos: { top: '40%', left: '0%' },
    delay: '1.3s',
    accentColor: '#60A5FA',
    border: 'rgba(96,165,250,0.45)',
    header: { icon: <EmailIcon />, label: 'Lead qualificado', badge: 'Alta prioridade', badgeColor: '#60A5FA' },
    body: 'AVAC industrial · Lisboa · urgente',
    footer: { dot: false, text: '✓ Adicionado ao pipeline' },
  },
  {
    pos: { bottom: '2%', left: '2%' },
    delay: '1.95s',
    accentColor: '#C084FC',
    border: 'rgba(192,132,252,0.45)',
    header: { icon: <PhoneIcon />, label: 'Chamada perdida', badge: 'Pendente', badgeColor: '#C084FC' },
    body: '"Ligamos em breve. Ref: #3291"',
    footer: { dot: false, text: '✓ Recuperação automática activada' },
  },
  {
    pos: { top: '40%', right: '0%' },
    delay: '2.6s',
    accentColor: '#34D399',
    border: 'rgba(52,211,153,0.45)',
    header: { icon: <CalIcon />, label: 'Follow-up agendado', badge: 'Amanhã 10h', badgeColor: '#34D399' },
    body: 'João Silva · Fecho do orçamento',
    footer: { dot: false, text: '✓ Acompanhamento activo' },
  },
]

function ChannelCard({ card }) {
  return (
    <div
      className="ayl-robot__card"
      style={{ ...card.pos, borderColor: card.border, '--card-delay': card.delay }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 12, right: 12, height: '2px',
        background: `linear-gradient(90deg, transparent, ${card.accentColor}88, transparent)`,
      }} />
      <div className="ayl-robot__card-header">
        <span className="ayl-robot__card-icon" style={{ background: `${card.accentColor}22` }}>
          {card.header.icon}
        </span>
        <span className="ayl-robot__card-name">{card.header.label}</span>
        <span style={{
          marginLeft: 'auto', fontSize: '9px', fontWeight: 700,
          color: card.header.badgeColor, letterSpacing: '0.04em',
          background: `${card.header.badgeColor}1a`,
          padding: '2px 7px', borderRadius: '100px', whiteSpace: 'nowrap',
        }}>
          {card.header.badge}
        </span>
      </div>
      <div className="ayl-robot__card-msg">{card.body}</div>
      <div className="ayl-robot__card-reply">
        {card.footer.dot
          ? <span className="ayl-robot__card-dot" style={{ background: card.accentColor }} />
          : <span style={{ color: card.accentColor, fontSize: '10px' }}>●</span>
        }
        <span style={{ color: card.footer.dot ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.85)', fontSize: '11px' }}>
          {card.footer.text}
        </span>
      </div>
    </div>
  )
}

/* idPrefix avoids SVG gradient ID collisions when rendered twice on the same page */
function RobotCore({ idPrefix = '' }) {
  const hg = `${idPrefix}hg`
  const glw = `${idPrefix}glw`
  const vg = `${idPrefix}visorGlow`
  return (
    <div className="ayl-robot__center">
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <svg width="152" height="198" viewBox="0 0 152 198" fill="none">
          <defs>
            <linearGradient id={hg} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d3f7a" />
              <stop offset="100%" stopColor="#0c1d50" />
            </linearGradient>
            <radialGradient id={glw} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(33,127,241,0.55)" />
              <stop offset="100%" stopColor="rgba(33,127,241,0)" />
            </radialGradient>
            <radialGradient id={vg} cx="50%" cy="20%" r="80%">
              <stop offset="0%" stopColor="rgba(33,127,241,0.22)" />
              <stop offset="100%" stopColor="rgba(33,127,241,0)" />
            </radialGradient>
          </defs>
          <ellipse cx="76" cy="105" rx="70" ry="76" fill={`url(#${glw})`} />
          <circle cx="76" cy="105" r="66" stroke="rgba(33,127,241,0.35)" strokeWidth="1.2" strokeDasharray="4 8" className="ayl-robot__pulse" />
          <circle cx="76" cy="105" r="50" stroke="rgba(144,200,255,0.12)" strokeWidth="1" />
          <rect x="73" y="10" width="6" height="28" rx="3" fill="rgba(255,255,255,0.55)" />
          <circle cx="76" cy="8" r="8" fill="rgba(33,127,241,0.45)" className="ayl-robot__blink" />
          <circle cx="76" cy="8" r="5" fill="#90c8ff" className="ayl-robot__blink" style={{ animationDelay: '0.1s' }} />
          <rect x="10" y="38" width="132" height="108" rx="22" fill={`url(#${hg})`} stroke="rgba(100,160,255,0.4)" strokeWidth="1.5" />
          <rect x="10" y="38" width="132" height="28" rx="20" fill="rgba(255,255,255,0.07)" />
          <rect x="0"   y="70" width="12" height="5" rx="2.5" fill="#217FF1" opacity="0.9" />
          <rect x="0"   y="80" width="8"  height="3" rx="1.5" fill="#217FF1" opacity="0.5" />
          <rect x="140" y="70" width="12" height="5" rx="2.5" fill="#217FF1" opacity="0.9" />
          <rect x="144" y="80" width="8"  height="3" rx="1.5" fill="#217FF1" opacity="0.5" />
          <rect x="20" y="48" width="112" height="88" rx="14" fill="#000c1e" stroke="rgba(33,127,241,0.65)" strokeWidth="1.5" />
          <rect x="20" y="48" width="112" height="44" rx="12" fill={`url(#${vg})`} />
          <rect x="20" y="80" width="112" height="1.5" fill="rgba(33,127,241,0.55)" className="ayl-robot__scan" />
          <rect x="30" y="124" width="92" height="5" rx="2.5" fill="rgba(33,127,241,0.18)" />
          <rect x="30" y="124" width="68" height="5" rx="2.5" fill="rgba(33,127,241,0.75)" className="ayl-robot__progress" />
          <circle cx="44" cy="135" r="3" fill="#25D366" className="ayl-robot__dot" style={{ animationDelay: '0s' }} />
          <circle cx="56" cy="135" r="3" fill="#25D366" className="ayl-robot__dot" style={{ animationDelay: '0.3s' }} />
          <circle cx="68" cy="135" r="3" fill="#25D366" className="ayl-robot__dot" style={{ animationDelay: '0.6s' }} />
          <rect x="16" y="154" width="120" height="36" rx="14" fill="#0d1e4a" stroke="rgba(100,160,255,0.22)" strokeWidth="1.5" />
          <rect x="26" y="163" width="100" height="3" rx="1.5" fill="rgba(33,127,241,0.18)" />
          <rect x="26" y="163" width="78"  height="3" rx="1.5" fill="rgba(33,127,241,0.65)" />
          <rect x="36" y="172" width="80"  height="3" rx="1.5" fill="rgba(33,127,241,0.12)" />
          <rect x="36" y="172" width="52"  height="3" rx="1.5" fill="rgba(33,127,241,0.45)" />
          <rect x="46" y="181" width="60"  height="3" rx="1.5" fill="rgba(33,127,241,0.08)" />
          <rect x="46" y="181" width="34"  height="3" rx="1.5" fill="rgba(33,127,241,0.3)" />
          <rect x="16"  y="154" width="10" height="10" rx="3" fill="#217FF1" opacity="0.55" />
          <rect x="126" y="154" width="10" height="10" rx="3" fill="#217FF1" opacity="0.55" />
        </svg>
        <div style={{
          position: 'absolute', top: '44%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
          pointerEvents: 'none',
        }}>
          <img
            src="/logotipo-editado.png"
            alt="Reminder"
            style={{ width: '44px', height: '44px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
          />
        </div>
      </div>
    </div>
  )
}

export { RobotCore }

export default function RobotPanel({ idPrefix = '' }) {
  return (
    <div className="ayl-robot">
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <ellipse cx="50" cy="50" rx="46" ry="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.4" strokeDasharray="2 6" />
        <ellipse cx="50" cy="50" rx="36" ry="36" fill="none" stroke="rgba(33,127,241,0.1)"  strokeWidth="0.3" />
      </svg>
      <svg className="ayl-robot__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="50" y1="50" x2="16" y2="14" stroke="rgba(37,211,102,0.55)"  strokeWidth="1.0" strokeDasharray="3 4" className="ayl-robot__line" style={{ animationDelay: '0s' }} />
        <line x1="50" y1="50" x2="84" y2="14" stroke="rgba(225,48,108,0.55)"  strokeWidth="1.0" strokeDasharray="3 4" className="ayl-robot__line" style={{ animationDelay: '0.65s' }} />
        <line x1="50" y1="50" x2="8"  y2="50" stroke="rgba(96,165,250,0.55)"  strokeWidth="1.0" strokeDasharray="3 4" className="ayl-robot__line" style={{ animationDelay: '1.3s' }} />
        <line x1="50" y1="50" x2="18" y2="86" stroke="rgba(192,132,252,0.55)" strokeWidth="1.0" strokeDasharray="3 4" className="ayl-robot__line" style={{ animationDelay: '1.95s' }} />
        <line x1="50" y1="50" x2="92" y2="50" stroke="rgba(52,211,153,0.55)"  strokeWidth="1.0" strokeDasharray="3 4" className="ayl-robot__line" style={{ animationDelay: '2.6s' }} />
      </svg>
      <RobotCore idPrefix={idPrefix} />
      {CHANNEL_CARDS.map((card, i) => <ChannelCard key={i} card={card} />)}
    </div>
  )
}
