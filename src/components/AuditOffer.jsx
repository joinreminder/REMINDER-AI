import { useState } from 'react'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/meebdjwa'

function AuditForm() {
  const [data, setData] = useState({ nome: '', telemovel: '', email: '' })
  const [status, setStatus] = useState('idle')

  const set = (k, v) => setData(d => ({ ...d, [k]: v }))

  const submit = async e => {
    e.preventDefault()
    if (!data.nome.trim() || !data.telemovel.trim() || !data.email.trim()) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[Reminder] AUDITORIA €497 — ${data.nome}`,
          nome: data.nome,
          telemovel: data.telemovel,
          email: data.email,
          pedido: 'Auditoria de Recuperação €497',
        }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>✓</div>
        <p style={{ fontWeight: 700, color: 'white', margin: '0 0 8px' }}>Pedido recebido, {data.nome.split(' ')[0]}.</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Entramos em contacto em menos de 24h úteis.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <input
        className="dw__input"
        type="text"
        placeholder="O seu nome *"
        value={data.nome}
        onChange={e => set('nome', e.target.value)}
        disabled={status === 'sending'}
      />
      <input
        className="dw__input"
        type="tel"
        placeholder="Telemóvel *"
        value={data.telemovel}
        onChange={e => set('telemovel', e.target.value)}
        disabled={status === 'sending'}
      />
      <input
        className="dw__input"
        type="email"
        placeholder="Email profissional *"
        value={data.email}
        onChange={e => set('email', e.target.value)}
        disabled={status === 'sending'}
      />
      {status === 'error' && (
        <p style={{ fontSize: 12, color: '#fca5a5', margin: 0 }}>
          Preencha todos os campos ou contacte <a href="mailto:hello@remindr-ai.com" style={{ color: '#fde68a' }}>hello@remindr-ai.com</a>
        </p>
      )}
      <button className="dw__btn-submit" type="submit" disabled={status === 'sending'} style={{ width: '100%', marginTop: 4 }}>
        {status === 'sending' ? 'A enviar…' : 'Reservar a Auditoria — €497 →'}
      </button>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textAlign: 'center', margin: 0 }}>
        Sem compromisso · respondemos em 24h úteis
      </p>
    </form>
  )
}

const DELIVERABLES = [
  {
    num: '01',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Relatório de Receita Perdida — em euros',
    desc: 'Analisamos o percurso do paciente da sua clínica e quantificamos em euros cada ponto de fuga de receita. Não opinião. Números reais.',
    highlight: 'Relatório completo entregue em 72h',
  },
  {
    num: '02',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: '3 automações ativas em 72h',
    desc: 'Confirmação automática de consultas por WhatsApp, lembrete inteligente 24h antes, e follow-up pós-consulta. Resultados visíveis antes do fim da semana.',
    highlight: '1 falta evitada já paga a Auditoria',
  },
  {
    num: '03',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Plano de Recuperação — €50k+ anuais',
    desc: 'Mapeamos os próximos passos prioritários para recuperar €50.000–€150.000/ano em receita perdida. Por ordem de impacto. Com ROI calculado.',
    highlight: 'Caminho claro para o crescimento',
  },
  {
    num: '04',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Call de Estratégia 1:1 (45 min)',
    desc: 'Apresentamos os resultados, as automações ativas e o plano em conjunto. Respondemos a todas as questões e definimos o próximo passo — sem pressão.',
    highlight: '45 minutos com a nossa equipa',
  },
]

const PATH = [
  { step: 'Diagnóstico', price: 'Grátis', sub: '15 minutos', active: false },
  { step: 'Auditoria', price: '€497', sub: 'Resultados em 72h', active: true },
  { step: 'Sistema completo', price: 'Sob consulta', sub: 'Crescimento contínuo', active: false },
]

export default function AuditOffer() {
  return (
    <section className="section section--alt" id="audit">
      <div className="container">

        <div className="section-head">
          <span className="label">Auditoria de Recuperação</span>
          <h2 className="h2">
            A sua clínica perde receita todos os dias.<br />
            <mark>Saiba quanto. Corrija em 72h.</mark>
          </h2>
          <p className="body-md" style={{ marginTop: 12, maxWidth: 620, margin: '12px auto 0' }}>
            Faltas sem aviso. Tratamentos propostos que ficam esquecidos. Pacientes que não voltam.
            A Auditoria quantifica em euros cada ponto de fuga — e implementa três correções automáticas
            antes do fim da semana.
          </p>
        </div>

        <div style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: 0,
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '1.5px solid var(--border-dark)',
          background: 'var(--bg)',
        }}>
          {/* Left — deliverables */}
          <div style={{ padding: '48px 44px', borderRight: '1px solid var(--border-dark)' }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 28 }}>
              O que está incluído
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {DELIVERABLES.map(d => (
                <div key={d.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: 'var(--purple-light)', color: 'var(--purple)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {d.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', margin: '0 0 5px', letterSpacing: '-0.01em' }}>
                      {d.title}
                    </p>
                    <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.65, margin: '0 0 8px' }}>
                      {d.desc}
                    </p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 700, color: 'var(--success)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {d.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — price + CTA */}
          <div style={{ padding: '48px 36px', background: 'var(--bg-dark)', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Pain anchor */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 16px' }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>
                Uma clínica com €300k/ano de faturação perde tipicamente{' '}
                <strong style={{ color: 'white' }}>€4.000–€8.000/mês</strong>{' '}
                em receita que nunca contabilizou.
              </p>
            </div>

            {/* Price with math anchor */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>
                Auditoria de Recuperação
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>€497</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>pagamento único</span>
              </div>
              <p style={{ fontSize: 12, color: '#9B93F5', margin: 0, fontWeight: 600 }}>
                1 falta evitada (€150–€300) já paga. O resto é lucro.
              </p>
            </div>

            {/* Deliverables */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                'Relatório de receita perdida em euros',
                '3 automações ativas em 72h',
                'Plano de recuperação €50k+',
                'Call de estratégia 1:1 (45 min)',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9B93F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <AuditForm />

            {/* Guarantee */}
            <div style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B93F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'white', margin: '0 0 3px' }}>Garantia de 30 dias</p>
                <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>
                  Se não recuperar €497 em receita nos primeiros 30 dias, reembolsamos 100%. Sem perguntas.
                </p>
              </div>
            </div>

            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center', margin: 0 }}>
              O seu esforço: 45 minutos numa call. O resto é connosco.
            </p>
          </div>
        </div>

        {/* Path */}
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
          {PATH.map((p, i) => (
            <div key={p.step} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                padding: '16px 28px', borderRadius: 12, textAlign: 'center',
                background: p.active ? 'var(--purple)' : 'var(--bg)',
                border: `1.5px solid ${p.active ? 'var(--purple)' : 'var(--border-dark)'}`,
              }}>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: p.active ? 'rgba(255,255,255,0.7)' : 'var(--text-3)', margin: '0 0 4px' }}>
                  {p.step}
                </p>
                <p style={{ fontSize: 18, fontWeight: 900, color: p.active ? 'white' : 'var(--text)', margin: '0 0 2px', letterSpacing: '-0.02em' }}>
                  {p.price}
                </p>
                <p style={{ fontSize: 11, color: p.active ? 'rgba(255,255,255,0.55)' : 'var(--text-3)', margin: 0 }}>
                  {p.sub}
                </p>
              </div>
              {i < PATH.length - 1 && (
                <div style={{ padding: '0 12px', color: 'var(--text-3)', fontSize: 18, fontWeight: 300 }}>→</div>
              )}
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', marginTop: 14 }}>
          O Diagnóstico mostra o problema. A Auditoria começa a resolver. O Sistema resolve para sempre.
        </p>

      </div>
    </section>
  )
}
