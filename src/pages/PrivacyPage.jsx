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
}

export default function PrivacyPage() {
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
        <h1 style={S.h1}>Política de Privacidade</h1>
        <p style={S.date}>Última actualização: Setembro de 2026</p>

        <p style={S.p}>
          A Reminder AI (doravante "Reminder", "nós" ou "nossa") compromete-se a proteger a privacidade dos utilizadores do website <strong style={{ color: 'rgba(255,255,255,0.85)' }}>joinreminder.com</strong>. Esta Política de Privacidade explica como recolhemos, utilizamos e protegemos os seus dados pessoais, em conformidade com o Regulamento Geral de Proteção de Dados (RGPD — Regulamento UE 2016/679).
        </p>

        <hr style={S.divider} />

        <h2 style={S.h2}>1. Responsável pelo Tratamento</h2>
        <p style={S.p}>
          Reminder AI<br />
          Email: <a href="mailto:equipa@joinreminder.com" style={S.a}>equipa@joinreminder.com</a><br />
          Website: joinreminder.com
        </p>

        <h2 style={S.h2}>2. Dados que Recolhemos</h2>
        <p style={S.p}>Recolhemos os seguintes dados pessoais:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Dados de contacto:</strong> nome, endereço de e-mail, número de telefone e empresa, quando preenche o nosso formulário de diagnóstico ou nos contacta directamente.</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Dados do negócio:</strong> sector de actividade, volume de leads, processo comercial — informações partilhadas voluntariamente no formulário de diagnóstico.</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Dados de navegação:</strong> endereço IP, tipo de browser, páginas visitadas e tempo de permanência, recolhidos automaticamente para fins de análise e melhoria do website.</li>
        </ul>

        <h2 style={S.h2}>3. Finalidade e Base Legal</h2>
        <p style={S.p}>Utilizamos os seus dados para:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Responder ao pedido de diagnóstico</strong> — base legal: execução de pré-contrato (Art. 6.º, n.º 1, al. b) do RGPD).</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Enviar comunicações comerciais relevantes</strong> — base legal: interesse legítimo ou consentimento (Art. 6.º, n.º 1, al. f) e al. a)).</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Melhorar o website e os nossos serviços</strong> — base legal: interesse legítimo (Art. 6.º, n.º 1, al. f)).</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Cumprir obrigações legais</strong> — base legal: cumprimento de obrigação jurídica (Art. 6.º, n.º 1, al. c)).</li>
        </ul>

        <h2 style={S.h2}>4. Partilha de Dados</h2>
        <p style={S.p}>
          Os seus dados podem ser partilhados com prestadores de serviços que nos apoiam operacionalmente (CRM, ferramentas de email, análise web), todos vinculados por contratos de sub-processamento conformes com o RGPD. Não vendemos nem cedemos os seus dados a terceiros para fins de marketing.
        </p>
        <p style={S.p}>
          As ferramentas que utilizamos incluem: HubSpot (CRM), Apollo.io (prospeção), e ferramentas de análise de tráfego. Todos os dados são tratados dentro do Espaço Económico Europeu ou com garantias adequadas de transferência.
        </p>

        <h2 style={S.h2}>5. Conservação dos Dados</h2>
        <p style={S.p}>
          Conservamos os seus dados pelo tempo necessário para as finalidades descritas, ou pelo prazo legalmente exigido:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>Dados de leads e contactos: até 3 anos após o último contacto.</li>
          <li style={S.li}>Dados de clientes: até 10 anos após o fim da relação contratual (obrigação fiscal).</li>
          <li style={S.li}>Dados de navegação: até 13 meses.</li>
        </ul>

        <h2 style={S.h2}>6. Os Seus Direitos</h2>
        <p style={S.p}>Ao abrigo do RGPD, tem os seguintes direitos:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Acesso</strong> — solicitar uma cópia dos dados que temos sobre si.</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Rectificação</strong> — corrigir dados incorrectos ou incompletos.</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Apagamento</strong> — solicitar a eliminação dos seus dados ("direito ao esquecimento").</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Limitação</strong> — restringir o tratamento em determinadas circunstâncias.</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Portabilidade</strong> — receber os seus dados num formato estruturado e legível por máquina.</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Oposição</strong> — opor-se ao tratamento baseado em interesse legítimo.</li>
          <li style={S.li}><strong style={{ color: 'rgba(255,255,255,0.85)' }}>Retirar consentimento</strong> — a qualquer momento, sem efeito retroactivo.</li>
        </ul>
        <p style={S.p}>
          Para exercer qualquer destes direitos, contacte-nos em <a href="mailto:equipa@joinreminder.com" style={S.a}>equipa@joinreminder.com</a>. Tem ainda o direito de apresentar reclamação à autoridade de controlo competente: <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" style={S.a}>CNPD — Comissão Nacional de Proteção de Dados</a>.
        </p>

        <h2 style={S.h2}>7. Segurança</h2>
        <p style={S.p}>
          Adoptamos medidas técnicas e organizacionais adequadas para proteger os seus dados contra acesso não autorizado, alteração, divulgação ou destruição, incluindo encriptação em trânsito (HTTPS) e controlos de acesso restritos.
        </p>

        <h2 style={S.h2}>8. Cookies</h2>
        <p style={S.p}>
          Utilizamos cookies para melhorar a experiência de navegação. Para mais informações, consulte a nossa <Link to="/cookies" style={S.a}>Política de Cookies</Link>.
        </p>

        <h2 style={S.h2}>9. Alterações a Esta Política</h2>
        <p style={S.p}>
          Podemos actualizar esta Política de Privacidade periodicamente. A data de última actualização será sempre indicada no topo do documento. Alterações significativas serão comunicadas por e-mail aos utilizadores registados.
        </p>

        <h2 style={S.h2}>10. Contacto</h2>
        <p style={S.p}>
          Para qualquer questão sobre privacidade ou proteção de dados, contacte-nos em <a href="mailto:equipa@joinreminder.com" style={S.a}>equipa@joinreminder.com</a>.
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
