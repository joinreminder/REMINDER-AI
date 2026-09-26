import { useRef, useState } from 'react'
import {
  ROADMAP_TEMPLATES,
  PROFILE_SUMMARY,
  getProfileLevel,
  DIM_LABELS,
  PRIORITY_LABELS,
} from '../data/roadmapContent'

const ROADMAP_FLOWS = {
  response:      ['Lead entra', 'Notificação imediata', 'Contacto < 5 min', 'Qualificação rápida'],
  followup:      ['Primeiro contacto', 'Follow-up 1 (Dia 2)', 'Follow-up 2 (Dia 5)', 'Follow-up 3 (Dia 9)', 'Último contacto (Dia 14)'],
  qualification: ['Contacto', 'Descoberta', 'Avaliação', 'Qualificado / Não Qualificado', 'Reunião'],
  leadToMeeting: ['Lead qualificado', 'Proposta de reunião', 'Agendamento online', 'Confirmação + Lembrete', 'Reunião'],
}

const BLUE = '#217FF1'

/* ── Shared section card ── */
function Card({ children, style }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px', padding: '28px', marginBottom: '24px', ...style,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
      letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px',
    }}>
      {children}
    </p>
  )
}

/* ── PDF-ready version (hidden, white bg) ── */
function PdfContent({ template, profile, scoring, empresa }) {
  const flow = ROADMAP_FLOWS[scoring.roadmapKey]
  const level = getProfileLevel(scoring.total)

  const h = (text, size = 18) => ({ fontFamily: 'Sora, Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: `${size}px`, color: '#0a1c42', margin: '0 0 8px', lineHeight: 1.3 })
  const p = { fontSize: '13px', color: '#444', lineHeight: 1.65, margin: '0 0 6px' }
  const label = { fontSize: '10px', fontWeight: 700, color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px' }

  return (
    <div style={{ width: '700px', padding: '48px 44px', background: '#fff', fontFamily: 'Helvetica, Arial, sans-serif', color: '#1a1a1a' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', paddingBottom: '20px', borderBottom: '2px solid #217FF1' }}>
        <div>
          <p style={{ ...h('', 22), color: BLUE, margin: '0 0 4px' }}>Roadmap de Conversão</p>
          <p style={{ ...h('', 16), fontWeight: 400, color: '#666' }}>{empresa}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ ...h('', 14), color: BLUE, margin: 0 }}>Reminder AI</p>
          <p style={{ fontSize: '11px', color: '#999', margin: '2px 0 0' }}>{new Date().toLocaleDateString('pt-PT')}</p>
        </div>
      </div>

      {/* 01 — Perfil de Conversão */}
      <div style={{ marginBottom: '28px' }}>
        <p style={label}>01 — Perfil de Conversão</p>
        <p style={p}>{PROFILE_SUMMARY[level]}</p>
        <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 20px' }}>
          {profile.map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontSize: '12px', color: '#888' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#333' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 02 — Principal Gargalo */}
      <div style={{ marginBottom: '28px', background: '#f0f6ff', borderRadius: '12px', padding: '20px 24px', border: '1px solid #d4e5ff' }}>
        <p style={label}>02 — Principal Gargalo</p>
        <p style={{ ...h(template.title, 18) }}>{template.title}</p>
        <p style={p}>{template.problem}</p>
        <div style={{ marginTop: '12px', background: '#fff', borderRadius: '8px', padding: '14px 16px', border: '1px solid #e0edff' }}>
          <p style={{ fontSize: '28px', fontWeight: 800, color: BLUE, margin: '0 0 4px', fontFamily: 'Sora, Helvetica, Arial, sans-serif' }}>{template.insight.stat}</p>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.5, margin: 0 }}>{template.insight.text}</p>
          <p style={{ fontSize: '10px', color: '#aaa', margin: '4px 0 0', fontStyle: 'italic' }}>Fonte: {template.insight.source}</p>
        </div>
      </div>

      {/* 03 — Prioridades */}
      <div style={{ marginBottom: '28px' }}>
        <p style={label}>03 — Prioridades</p>
        {scoring.priorities.map((key, i) => (
          <div key={key} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: i === 0 ? BLUE : '#eee', color: i === 0 ? '#fff' : '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
              {i + 1}
            </span>
            <span style={{ fontSize: '13px', color: i === 0 ? '#0a1c42' : '#555', fontWeight: i === 0 ? 700 : 400 }}>
              {PRIORITY_LABELS[key]}
            </span>
          </div>
        ))}
      </div>

      {/* 04 — Roadmap de Conversão */}
      <div style={{ marginBottom: '28px' }}>
        <p style={label}>04 — Roadmap de Conversão</p>
        <p style={{ ...h('Processo Recomendado', 15), marginBottom: '14px' }}>{template.subtitle}</p>

        {/* Flow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {flow.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                background: i === 0 || i === flow.length - 1 ? BLUE : '#f0f0f0',
                color: i === 0 || i === flow.length - 1 ? '#fff' : '#333',
              }}>
                {step}
              </span>
              {i < flow.length - 1 && <span style={{ color: '#ccc', fontSize: '14px' }}>{'\u2192'}</span>}
            </div>
          ))}
        </div>

        {/* Actions */}
        <p style={{ ...h('Ações Recomendadas', 14), marginBottom: '12px' }}>Ações Recomendadas</p>
        {template.actions.map((action, i) => (
          <div key={i} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: `3px solid ${i === 0 ? BLUE : '#e0e0e0'}` }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#0a1c42', margin: '0 0 2px' }}>{action.title}</p>
            <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.5, margin: 0 }}>{action.desc}</p>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div style={{ marginBottom: '28px' }}>
        <p style={label}>Métricas-Alvo</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '8px 0', color: '#888', fontWeight: 600 }}>Métrica</th>
              <th style={{ textAlign: 'center', padding: '8px 0', color: '#888', fontWeight: 600 }}>Estimativa Atual</th>
              <th style={{ textAlign: 'center', padding: '8px 0', color: BLUE, fontWeight: 700 }}>Objetivo</th>
            </tr>
          </thead>
          <tbody>
            {template.metrics.map((m, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px 0', color: '#333' }}>{m.label}</td>
                <td style={{ padding: '8px 0', textAlign: 'center', color: '#999' }}>{m.current}</td>
                <td style={{ padding: '8px 0', textAlign: 'center', fontWeight: 700, color: BLUE }}>{m.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 05 — Próximo Passo */}
      <div style={{ background: '#f0f6ff', borderRadius: '12px', padding: '20px 24px', border: '1px solid #d4e5ff' }}>
        <p style={label}>05 — Próximo Passo</p>
        <p style={{ ...h('', 15) }}>Testar este processo com leads reais durante 30 dias.</p>
        <p style={p}>O Roadmap mostra o que melhorar. O 30-Day Pilot implementa e testa com a sua equipa e os seus leads reais, sem risco.</p>
        <p style={{ fontSize: '13px', color: BLUE, fontWeight: 700, margin: '8px 0 0' }}>
          {'\u2192'} joinreminder.com
        </p>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '11px', color: '#aaa', margin: 0 }}>Reminder AI {'\u00B7'} Conversão de Leads</p>
        <p style={{ fontSize: '11px', color: '#aaa', margin: 0 }}>equipa@joinreminder.com</p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   Main Results Component
   ══════════════════════════════════════ */
export default function RoadmapResult({ scoring, profile, empresa, values }) {
  const pdfRef = useRef(null)
  const [downloading, setDownloading] = useState(false)

  const template = ROADMAP_TEMPLATES[scoring.roadmapKey]
  const flow = ROADMAP_FLOWS[scoring.roadmapKey]
  const level = getProfileLevel(scoring.total)

  const downloadPDF = async () => {
    setDownloading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      await html2pdf().set({
        margin: [10, 10, 10, 10],
        filename: `Roadmap-Conversao-${empresa.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      }).from(pdfRef.current).save()
    } catch (err) {
      console.error('PDF error:', err)
    }
    setDownloading(false)
  }

  return (
    <div className="raudit" style={{ background: '#06102a', minHeight: '100vh' }}>

      {/* Hidden PDF content */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div ref={pdfRef}>
          <PdfContent template={template} profile={profile} scoring={scoring} empresa={empresa} />
        </div>
      </div>

      {/* ── Header ── */}
      <div className="raudit__header" style={{ paddingTop: 'calc(var(--nav-h, 72px) + 40px)' }}>
        <div className="r-container" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)',
            borderRadius: '100px', padding: '5px 16px', marginBottom: '20px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'hero-pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#4ade80', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Roadmap pronto
            </span>
          </div>
          <h2 className="r-h2" style={{ color: '#fff', marginBottom: '8px' }}>
            O seu Roadmap de Conversão está pronto.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.55 }}>
            Enviámos o Roadmap completo em PDF para o seu email. Verifique a caixa de entrada (e spam).
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', maxWidth: '440px', margin: '8px auto 0', lineHeight: 1.55 }}>
            {empresa} {'\u00B7'} {new Date().toLocaleDateString('pt-PT')}
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="raudit__body" style={{ paddingBottom: '80px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 20px' }}>

          {/* Download PDF button */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <button
              onClick={downloadPDF}
              disabled={downloading}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.08)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '13px',
                padding: '12px 24px', borderRadius: '10px', cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { if (!downloading) { e.currentTarget.style.background = 'rgba(255,255,255,0.14)' } }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v10M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {downloading ? 'A gerar PDF...' : 'Download PDF do Roadmap'}
            </button>
          </div>

          {/* 01 — Perfil de Conversão */}
          <Card>
            <SectionLabel>01 — Perfil de Conversão</SectionLabel>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: '0 0 16px' }}>
              {PROFILE_SUMMARY[level]}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {profile.map(([label, value], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < profile.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Sora, sans-serif' }}>{label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontFamily: 'Sora, sans-serif' }}>{value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 02 — Principal Gargalo */}
          <Card style={{ background: 'rgba(33,127,241,0.1)', border: '1.5px solid rgba(33,127,241,0.25)' }}>
            <SectionLabel>02 — Principal Gargalo</SectionLabel>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '24px', color: '#5aabff', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              {template.title}
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: '0 0 20px' }}>
              {template.problem}
            </p>
            {/* Insight stat */}
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '20px 24px', border: '1px solid rgba(33,127,241,0.2)' }}>
              <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '36px', color: '#5aabff', margin: '0 0 6px' }}>
                {template.insight.stat}
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, margin: '0 0 6px' }}>
                {template.insight.text}
              </p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0, fontStyle: 'italic' }}>
                Fonte: {template.insight.source}
              </p>
            </div>
          </Card>

          {/* 03 — Prioridades */}
          <Card>
            <SectionLabel>03 — Prioridades</SectionLabel>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: '0 0 16px', lineHeight: 1.5 }}>
              Com base nas suas respostas, estas são as áreas a melhorar por ordem de impacto.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {scoring.priorities.map((key, i) => (
                <div key={key} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <span style={{
                    width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                    background: i === 0 ? 'rgba(33,127,241,0.2)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${i === 0 ? 'rgba(33,127,241,0.35)' : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700, color: i === 0 ? '#5aabff' : 'rgba(255,255,255,0.5)',
                    fontFamily: 'Sora, sans-serif',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '14px', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.65)', fontWeight: i === 0 ? 700 : 400, lineHeight: 1.5 }}>
                    {PRIORITY_LABELS[key]}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* 04 — Roadmap de Conversão */}
          <Card>
            <SectionLabel>04 — Roadmap de Conversão</SectionLabel>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, margin: '0 0 20px' }}>
              {template.subtitle}
            </p>

            {/* Recommended flow */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '20px', marginBottom: '24px',
            }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 14px' }}>
                Processo Recomendado
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                {flow.map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div style={{
                      padding: '10px 24px', width: '100%', textAlign: 'center',
                      background: i === 0 || i === flow.length - 1 ? 'rgba(33,127,241,0.2)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${i === 0 || i === flow.length - 1 ? 'rgba(33,127,241,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '10px',
                    }}>
                      <span style={{
                        fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '14px',
                        color: i === 0 || i === flow.length - 1 ? '#5aabff' : 'rgba(255,255,255,0.7)',
                      }}>
                        {s}
                      </span>
                    </div>
                    {i < flow.length - 1 && (
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" style={{ margin: '4px 0' }}>
                        <path d="M6 0v16M2 12l4 4 4-4" stroke="rgba(33,127,241,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Specific actions */}
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 14px' }}>
              Ações Recomendadas
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {template.actions.map((action, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                    background: i === 0 ? 'rgba(33,127,241,0.2)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${i === 0 ? 'rgba(33,127,241,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700, color: i === 0 ? '#5aabff' : 'rgba(255,255,255,0.5)',
                    fontFamily: 'Sora, sans-serif',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', margin: '0 0 4px' }}>
                      {action.title}
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, margin: 0 }}>
                      {action.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Metrics */}
          <Card>
            <SectionLabel>Métricas-Alvo</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0 20px', padding: '0 0 8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)' }}>Métrica</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textAlign: 'center', minWidth: '80px' }}>Est. Atual</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#5aabff', textAlign: 'center', minWidth: '80px' }}>Objetivo</span>
              </div>
              {template.metrics.map((m, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0 20px', padding: '12px 0', borderBottom: i < template.metrics.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{m.label}</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', textAlign: 'center', minWidth: '80px' }}>{m.current}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#5aabff', textAlign: 'center', minWidth: '80px' }}>{m.target}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 05 — Próximo Passo */}
          <Card style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <SectionLabel>05 — Próximo Passo</SectionLabel>
            <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', margin: '0 0 8px' }}>
              Testar este processo com leads reais durante 30 dias.
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>
              O Roadmap mostra <em>o que</em> melhorar. O 30-Day Pilot implementa e testa com a sua equipa e os seus leads reais, sem risco.
            </p>
          </Card>

          {/* CTA — 30-Day Pilot */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <a
              href="https://calendly.com/remindr/diagnostico"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: BLUE, color: '#fff',
                fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '16px',
                padding: '18px 40px', borderRadius: '14px', textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(33,127,241,0.45)',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(33,127,241,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(33,127,241,0.45)' }}
            >
              CANDIDATAR-ME AO 30-DAY PILOT {'\u2192'}
            </a>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '12px' }}>
              Conversa de 15 min {'\u00B7'} Sem compromisso
            </p>
          </div>

          {/* Download PDF again */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <button
              onClick={downloadPDF}
              disabled={downloading}
              style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                fontSize: '13px', cursor: 'pointer', fontFamily: 'Sora, sans-serif',
                textDecoration: 'underline', textUnderlineOffset: '3px',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              {downloading ? 'A gerar...' : 'Guardar Roadmap em PDF'}
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="/" style={{
              fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
              fontFamily: 'Sora, sans-serif', transition: 'color 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              {'\u2190'} Voltar ao início
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
