import { Link } from 'react-router-dom'

const S = {
  page: {
    minHeight: '100vh', background: '#06102a',
    padding: '96px 24px 80px',
  },
  wrap: { maxWidth: '720px', margin: '0 auto' },
  back: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    fontSize: '13px', color: 'rgba(255,255,255,0.4)',
    textDecoration: 'none', fontFamily: 'Sora, sans-serif',
    marginBottom: '40px', transition: 'color 0.15s',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(33,127,241,0.12)', border: '1px solid rgba(33,127,241,0.3)',
    borderRadius: '100px', padding: '4px 14px', marginBottom: '20px',
    fontSize: '11px', fontWeight: 700, color: '#5aabff',
    letterSpacing: '0.1em', textTransform: 'uppercase',
  },
  h1: {
    fontFamily: 'Sora, sans-serif', fontWeight: 800,
    fontSize: 'clamp(26px, 4vw, 40px)', color: '#fff',
    letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 12px',
  },
  date: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: '0 0 48px' },
  h2: {
    fontFamily: 'Sora, sans-serif', fontWeight: 700,
    fontSize: '17px', color: '#fff',
    margin: '40px 0 12px', letterSpacing: '-0.02em',
  },
  p: { fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: '0 0 16px' },
  ul: { paddingLeft: '20px', margin: '0 0 16px' },
  li: { fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '6px' },
  divider: { border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '40px 0' },
  a: { color: '#5aabff', textDecoration: 'none' },
  table: {
    width: '100%', borderCollapse: 'collapse',
    margin: '0 0 24px', fontSize: '14px',
  },
  th: {
    textAlign: 'left', padding: '10px 14px',
    background: 'rgba(255,255,255,0.04)',
    color: 'rgba(255,255,255,0.5)', fontWeight: 600,
    fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  td: {
    padding: '10px 14px',
    color: 'rgba(255,255,255,0.6)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    verticalAlign: 'top',
  },
}

export default function CookiesPage() {
  return (
    <div style={S.page}>
      <div style={S.wrap}>

        <Link to="/" style={S.back}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          ← Voltar ao início
        </Link>

        <div style={S.badge}>Legal</div>
        <h1 style={S.h1}>Política de Cookies</h1>
        <p style={S.date}>Última actualização: Setembro de 2026</p>

        <p style={S.p}>
          Este website, <strong style={{ color: 'rgba(255,255,255,0.85)' }}>joinreminder.com</strong>, utiliza cookies e tecnologias semelhantes. Esta política explica o que são, como os utilizamos e como pode controlá-los.
        </p>

        <hr style={S.divider} />

        <h2 style={S.h2}>1. O que são Cookies?</h2>
        <p style={S.p}>
          Cookies são pequenos ficheiros de texto guardados no seu dispositivo quando visita um website. Permitem que o site reconheça o seu browser em visitas futuras, melhorando a experiência de navegação e fornecendo informação sobre como o site é utilizado.
        </p>

        <h2 style={S.h2}>2. Que Cookies Utilizamos</h2>

        <p style={{ ...S.p, marginBottom: '8px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
          Cookies Estritamente Necessários
        </p>
        <p style={S.p}>
          Estes cookies são essenciais para o funcionamento do website e não podem ser desactivados. Incluem cookies de sessão e preferências básicas do utilizador.
        </p>

        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Nome</th>
              <th style={S.th}>Finalidade</th>
              <th style={S.th}>Duração</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={S.td}><code style={{ color: '#5aabff', fontSize: '12px' }}>cookie_consent</code></td>
              <td style={S.td}>Regista a sua preferência de cookies para não repetir o aviso.</td>
              <td style={S.td}>1 ano</td>
            </tr>
            <tr>
              <td style={S.td}><code style={{ color: '#5aabff', fontSize: '12px' }}>ann-bar</code></td>
              <td style={S.td}>Regista o fecho da barra de anúncio para não a mostrar novamente na sessão.</td>
              <td style={S.td}>Sessão</td>
            </tr>
          </tbody>
        </table>

        <p style={{ ...S.p, marginBottom: '8px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
          Cookies de Análise (apenas com consentimento)
        </p>
        <p style={S.p}>
          Se aceitar os cookies de análise, podemos recolher dados anónimos sobre como os visitantes utilizam o website (páginas vistas, tempo de permanência, origem do tráfego). Esta informação ajuda-nos a melhorar o conteúdo e a experiência do utilizador.
        </p>

        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Nome</th>
              <th style={S.th}>Fornecedor</th>
              <th style={S.th}>Finalidade</th>
              <th style={S.th}>Duração</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={S.td}><code style={{ color: '#5aabff', fontSize: '12px' }}>_ga</code></td>
              <td style={S.td}>Google Analytics</td>
              <td style={S.td}>Distingue utilizadores únicos.</td>
              <td style={S.td}>2 anos</td>
            </tr>
            <tr>
              <td style={S.td}><code style={{ color: '#5aabff', fontSize: '12px' }}>_ga_*</code></td>
              <td style={S.td}>Google Analytics</td>
              <td style={S.td}>Mantém o estado da sessão de análise.</td>
              <td style={S.td}>2 anos</td>
            </tr>
          </tbody>
        </table>

        <h2 style={S.h2}>3. Como Gerir os Cookies</h2>
        <p style={S.p}>
          Pode gerir as suas preferências de cookies a qualquer momento através do banner de cookies que aparece na primeira visita ao nosso website. Também pode configurar o seu browser para bloquear ou eliminar cookies:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Chrome:</strong>{' '}
            Definições → Privacidade e segurança → Cookies e outros dados de sites
          </li>
          <li style={S.li}>
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Safari:</strong>{' '}
            Preferências → Privacidade
          </li>
          <li style={S.li}>
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Firefox:</strong>{' '}
            Definições → Privacidade e segurança
          </li>
          <li style={S.li}>
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Edge:</strong>{' '}
            Definições → Privacidade, pesquisa e serviços
          </li>
        </ul>
        <p style={S.p}>
          Note que desactivar certos cookies pode afectar o funcionamento do website.
        </p>

        <h2 style={S.h2}>4. Cookies de Terceiros</h2>
        <p style={S.p}>
          Alguns cookies são colocados por serviços de terceiros que utilizamos. Não controlamos esses cookies. Para mais informação, consulte as políticas de privacidade dos respectivos fornecedores (ex: Google, HubSpot).
        </p>

        <h2 style={S.h2}>5. Alterações a Esta Política</h2>
        <p style={S.p}>
          Podemos actualizar esta Política de Cookies periodicamente. A data de última actualização está indicada no topo do documento.
        </p>

        <h2 style={S.h2}>6. Contacto</h2>
        <p style={S.p}>
          Para qualquer dúvida sobre o uso de cookies neste website, contacte-nos em{' '}
          <a href="mailto:equipa@joinreminder.com" style={S.a}>equipa@joinreminder.com</a>.
        </p>
        <p style={S.p}>
          Para mais informação sobre como tratamos os seus dados pessoais, consulte a nossa{' '}
          <Link to="/privacidade" style={S.a}>Política de Privacidade</Link>.
        </p>

        <hr style={S.divider} />

        <Link to="/" style={S.back}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          ← Voltar ao início
        </Link>

      </div>
    </div>
  )
}
