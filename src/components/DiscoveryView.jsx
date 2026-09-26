import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

/* ── Gargalos predefinidos ── */
const GARGALOS = [
  'Follow-ups esquecidos / perdidos',
  'Entrada manual de dados (CRM, relatórios)',
  'Orçamentos e propostas lentos',
  'Qualificação de leads manual',
  'Agendamento manual de reuniões',
  'Onboarding de clientes manual',
  'Relatórios e reporting manual',
  'Facturação / processos admin lentos',
  'Comunicação interna dispersa (email/WA)',
  'Gestão de fornecedores / subcontratados manual',
  'Atendimento ao cliente lento / reactivo',
  'Coordenação de equipas sem sistema',
  'Aprovações internas ou com cliente lentas',
  'Dados dispersos em múltiplas ferramentas',
]

/* ── Framework de discovery ── */
const QUESTIONS = [
  {
    key: 'situacao',
    label: 'Situação',
    color: '#6366f1',
    prompt: '"Como funciona o vosso processo de [X] hoje, do início ao fim? Quem está envolvido? Quanto tempo leva por semana, a estimar?"',
    placeholder: 'Descreve o processo actual da empresa — fluxo, pessoas envolvidas, frequência…',
  },
  {
    key: 'problema',
    label: 'Problema',
    color: '#f59e0b',
    prompt: '"O que está a impedir de crescer mais rápido? Quanto está a custar isso — em tempo, em dinheiro, em oportunidades que escapam?"',
    placeholder: 'Qual a dor principal e o seu custo concreto — horas/semana, receita perdida, oportunidades…',
  },
  {
    key: 'implicacao',
    label: 'Implicação',
    color: '#ef4444',
    prompt: '"Se nada mudar nos próximos 6 meses, o que acontece? Já tentaram resolver isto antes? O que correu mal?"',
    placeholder: 'O que acontece se ficarem na mesma — o problema piora, agrava, bloqueia o crescimento?',
  },
  {
    key: 'dream_outcome',
    label: 'Dream Outcome',
    color: '#10b981',
    prompt: '"Se conseguíssemos resolver isto completamente, o que mudaria para a empresa? Quanto vale isso para si, em termos concretos?"',
    placeholder: 'O que realmente querem atingir, e qual o valor concreto disso para eles…',
  },
]

const labelSt = { fontSize: '11px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }
const inputSt = { width: '100%', padding: '9px 12px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', background: 'white', color: '#111' }

/* ── Modal de sessão (usado durante a reunião) ── */
function SessionModal({ session, leads, onClose, onSave }) {
  const empty = { lead_id: '', empresa: '', sector: '', situacao: '', problema: '', implicacao: '', dream_outcome: '', gargalos: [], micro_confirmacao: null, score: null, notes: '' }
  const [form, setForm] = useState(session ? { ...session, gargalos: session.gargalos || [] } : empty)
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const toggleGargalo = (g) => setForm(f => ({
    ...f,
    gargalos: f.gargalos.includes(g) ? f.gargalos.filter(x => x !== g) : [...f.gargalos, g],
  }))

  const handleLeadChange = (leadId) => {
    const lead = leads.find(l => l.id === leadId)
    setForm(f => ({
      ...f,
      lead_id: leadId,
      empresa: f.empresa || lead?.clinica || lead?.nome || '',
      sector: f.sector || lead?.tipo || '',
    }))
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      lead_id: form.lead_id || null,
      empresa: form.empresa,
      sector: form.sector || null,
      situacao: form.situacao || null,
      problema: form.problema || null,
      implicacao: form.implicacao || null,
      dream_outcome: form.dream_outcome || null,
      gargalos: form.gargalos,
      micro_confirmacao: form.micro_confirmacao ?? false,
      score: form.score || null,
      notes: form.notes || null,
    }
    let result
    if (form.id) {
      result = await supabase.from('discovery_sessions').update(payload).eq('id', form.id).select().single()
    } else {
      result = await supabase.from('discovery_sessions').insert(payload).select().single()
    }
    setSaving(false)
    if (result.data) onSave(result.data)
    onClose()
  }

  const auditLeads = leads.filter(l => ['reuniao', 'proposta', 'contactar'].includes(l.stage))

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 9999, padding: '20px', overflowY: 'auto' }}
    >
      <form onSubmit={save} style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '780px', padding: '36px', marginTop: '16px', marginBottom: '24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
              {form.id ? 'Editar Discovery' : 'AI Growth Audit — Discovery'}
            </h3>
            <p style={{ color: '#888', fontSize: '13px' }}>Usa durante a reunião. Segue as perguntas em ordem.</p>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#bbb', flexShrink: 0 }}>✕</button>
        </div>

        {/* Empresa / Lead */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '28px', padding: '18px 20px', background: '#F3F6FB', borderRadius: '14px' }}>
          <div>
            <label style={labelSt}>Lead associada</label>
            <select value={form.lead_id} onChange={e => handleLeadChange(e.target.value)} style={{ ...inputSt, cursor: 'pointer', color: form.lead_id ? '#111' : '#aaa' }}>
              <option value="">Sem lead do pipeline</option>
              {auditLeads.map(l => <option key={l.id} value={l.id}>{l.nome} — {l.clinica || l.tipo || '?'}</option>)}
            </select>
          </div>
          <div>
            <label style={labelSt}>Empresa *</label>
            <input value={form.empresa} onChange={e => set('empresa', e.target.value)} required placeholder="Nome da empresa" style={inputSt} />
          </div>
          <div>
            <label style={labelSt}>Sector</label>
            <input value={form.sector || ''} onChange={e => set('sector', e.target.value)} placeholder="Ex: Construção B2B" style={inputSt} />
          </div>
        </div>

        {/* 4 perguntas de discovery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '28px' }}>
          {QUESTIONS.map(q => (
            <div key={q.key} style={{ borderLeft: `3px solid ${q.color}`, paddingLeft: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: q.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{q.label}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', lineHeight: 1.6, fontStyle: 'italic' }}>{q.prompt}</p>
              <textarea
                value={form[q.key] || ''}
                onChange={e => set(q.key, e.target.value)}
                rows={3}
                placeholder={q.placeholder}
                style={{ width: '100%', padding: '10px 13px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '13px', resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.65, color: '#333' }}
                onFocus={e => e.target.style.borderColor = q.color}
                onBlur={e => e.target.style.borderColor = '#e8edf5'}
              />
            </div>
          ))}
        </div>

        {/* Gargalos */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ ...labelSt, marginBottom: '12px' }}>
            Gargalos identificados
            {form.gargalos.length > 0 && <span style={{ marginLeft: '8px', color: '#217FF1', fontWeight: 700 }}>({form.gargalos.length})</span>}
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {GARGALOS.map(g => {
              const active = form.gargalos.includes(g)
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggleGargalo(g)}
                  style={{
                    padding: '6px 13px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                    border: `1.5px solid ${active ? '#217FF1' : '#e8edf5'}`,
                    background: active ? '#eff6ff' : 'white',
                    color: active ? '#217FF1' : '#999',
                    transition: 'all 0.12s',
                  }}
                >
                  {active ? '✓ ' : ''}{g}
                </button>
              )
            })}
          </div>
        </div>

        {/* Micro-confirmação + Score */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', padding: '18px 20px', background: '#F3F6FB', borderRadius: '14px' }}>
          <div>
            <label style={{ ...labelSt, marginBottom: '10px' }}>Micro-confirmação obtida?</label>
            <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '10px', lineHeight: 1.5 }}>
              "Se fizer sentido no final, vemos como implementar — ok?"
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[{ v: true, label: '✓ Sim', active: '#10b981', bg: '#ecfdf5' }, { v: false, label: '✗ Não / Não perguntei', active: '#ef4444', bg: '#fef2f2' }].map(({ v, label, active, bg }) => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => set('micro_confirmacao', v)}
                  style={{
                    padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                    border: `1.5px solid ${form.micro_confirmacao === v ? active : '#e8edf5'}`,
                    background: form.micro_confirmacao === v ? bg : 'white',
                    color: form.micro_confirmacao === v ? active : '#aaa',
                    transition: 'all 0.12s',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ ...labelSt, marginBottom: '10px' }}>Score da lead (fit ICP)</label>
            <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '10px', lineHeight: 1.5 }}>
              1 = fraco fit &nbsp;·&nbsp; 5 = ICP perfeito
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => set('score', form.score === n ? null : n)}
                  style={{
                    width: '38px', height: '38px', borderRadius: '8px', fontSize: '18px', cursor: 'pointer',
                    border: `1.5px solid ${form.score >= n ? '#f59e0b' : '#e8edf5'}`,
                    background: form.score >= n ? '#fffbeb' : 'white',
                    color: form.score >= n ? '#f59e0b' : '#ddd',
                    transition: 'all 0.1s',
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '28px' }}>
          <label style={labelSt}>Notas da sessão / próximo passo acordado</label>
          <textarea
            value={form.notes || ''}
            onChange={e => set('notes', e.target.value)}
            rows={2}
            placeholder="Observações, contexto extra, próximo passo acordado com o cliente…"
            style={{ width: '100%', padding: '10px 13px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '13px', resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.6, color: '#333' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="button" onClick={onClose} style={{ padding: '12px 20px', background: '#F3F6FB', color: '#555', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            Cancelar
          </button>
          <button type="submit" disabled={saving} style={{ padding: '12px 32px', background: saving ? '#aaa' : '#217FF1', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? 'A guardar…' : 'Guardar sessão →'}
          </button>
        </div>
      </form>
    </div>
  )
}

/* ── Padrões ICP (análise agregada) ── */
function PatternView({ sessions }) {
  const gargaloCount = {}
  sessions.forEach(s => (s.gargalos || []).forEach(g => { gargaloCount[g] = (gargaloCount[g] || 0) + 1 }))
  const topGargalos = Object.entries(gargaloCount).sort((a, b) => b[1] - a[1]).slice(0, 10)

  const sectorCount = {}
  sessions.forEach(s => { if (s.sector) sectorCount[s.sector] = (sectorCount[s.sector] || 0) + 1 })
  const topSectors = Object.entries(sectorCount).sort((a, b) => b[1] - a[1])

  const scored = sessions.filter(s => s.score)
  const avgScore = scored.length ? (scored.reduce((a, s) => a + s.score, 0) / scored.length).toFixed(1) : null
  const withMicro = sessions.filter(s => s.micro_confirmacao).length
  const microRate = sessions.length ? Math.round(withMicro / sessions.length * 100) : null

  if (sessions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 24px', color: '#aaa' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#bbb', marginBottom: '8px' }}>Sem sessões ainda</p>
        <p style={{ fontSize: '13px' }}>Regista 3+ sessões de discovery para os padrões aparecerem.</p>
      </div>
    )
  }

  return (
    <div>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Sessões', value: sessions.length, color: '#217FF1' },
          { label: 'Score médio', value: avgScore ? `${avgScore}/5` : '—', color: '#f59e0b' },
          { label: 'Micro-confirmação', value: microRate !== null ? `${microRate}%` : '—', color: '#10b981' },
          { label: 'Gargalos distintos', value: Object.keys(gargaloCount).length, color: '#8b5cf6' },
        ].map(k => (
          <div key={k.label} style={{ background: 'white', borderRadius: '14px', padding: '16px 20px', border: '1px solid #f0f4f8' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>{k.label}</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: k.color, fontFamily: 'Sora, sans-serif' }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        {/* Top gargalos */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #f0f4f8' }}>
          <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '20px' }}>
            Top Gargalos identificados
            <span style={{ marginLeft: '8px', fontSize: '12px', fontWeight: 500, color: '#aaa' }}>— o que a oferta deve resolver primeiro</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topGargalos.map(([g, count], i) => {
              const pct = Math.round(count / topGargalos[0][1] * 100)
              return (
                <div key={g}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', color: '#333', fontWeight: i < 3 ? 700 : 500 }}>{i === 0 ? '🔥 ' : ''}{g}</span>
                    <span style={{ fontSize: '12px', color: '#217FF1', fontWeight: 700, minWidth: '30px', textAlign: 'right' }}>{count}×</span>
                  </div>
                  <div style={{ height: '6px', background: '#f0f4f8', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: i === 0 ? '#217FF1' : i < 3 ? '#93c5fd' : '#dbeafe', borderRadius: '3px', width: `${pct}%`, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Sectores */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8' }}>
            <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '14px' }}>
              Sectores com mais sessões
            </h4>
            {topSectors.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#ccc' }}>Sem dados</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {topSectors.map(([s, count], i) => (
                  <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#555', fontWeight: i === 0 ? 700 : 400 }}>{s}</span>
                    <span style={{ padding: '2px 9px', background: '#eff6ff', color: '#217FF1', borderRadius: '100px', fontSize: '11px', fontWeight: 700 }}>{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ICP Signal */}
          <div style={{ background: 'linear-gradient(135deg, #eff6ff, #f0f9ff)', borderRadius: '16px', padding: '18px 20px', border: '1.5px solid #bfdbfe' }}>
            <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 700, color: '#217FF1', marginBottom: '10px' }}>
              ICP Signal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {topGargalos[0] && (
                <p style={{ fontSize: '12px', color: '#1e3a5f', lineHeight: 1.6 }}>
                  Gargalo nº1: <strong>"{topGargalos[0][0]}"</strong> — aparece em {topGargalos[0][1]} de {sessions.length} sessões.
                </p>
              )}
              {topSectors[0] && (
                <p style={{ fontSize: '12px', color: '#1e3a5f', lineHeight: 1.6 }}>
                  Sector mais comum: <strong>{topSectors[0][0]}</strong> ({topSectors[0][1]} sessões).
                </p>
              )}
              {microRate !== null && (
                <p style={{ fontSize: '12px', lineHeight: 1.6, color: microRate >= 60 ? '#15803d' : microRate >= 30 ? '#92400e' : '#991b1b', fontWeight: 600 }}>
                  {microRate >= 60 ? '✓ Taxa de micro-confirmação forte — oferta está a ressoar.' : microRate >= 30 ? '⚠ Taxa de micro-confirmação média — rever proposta de valor.' : '✗ Taxa de micro-confirmação baixa — rever abertura e discovery.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Lista de sessões ── */
function SessionsList({ sessions, leads, onNew, onEdit, onDelete }) {
  const scoreStars = (n) => n ? '★'.repeat(n) + '☆'.repeat(5 - n) : '—'

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={onNew}
          style={{ padding: '9px 20px', background: '#217FF1', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
        >
          + Nova sessão de discovery
        </button>
      </div>

      {sessions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: '#aaa', background: 'white', borderRadius: '16px', border: '1px solid #f0f4f8' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#bbb', marginBottom: '8px' }}>Nenhuma sessão ainda</p>
          <p style={{ fontSize: '13px' }}>Usa o botão acima para iniciar o teu primeiro AI Growth Audit.</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f4f8', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F3F6FB' }}>
                {['Empresa', 'Sector', 'Gargalos', 'Score', 'Micro-conf.', 'Data', ''].map(h => (
                  <th key={h} style={{ padding: '10px 14px', fontSize: '10px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'left', borderBottom: '1px solid #e8edf5', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr
                  key={s.id}
                  style={{ background: i % 2 === 0 ? 'white' : '#fafcff', cursor: 'pointer' }}
                  onClick={() => onEdit(s)}
                >
                  <td style={{ padding: '12px 14px', fontSize: '14px', fontWeight: 700, color: '#111' }}>{s.empresa}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: '#888' }}>{s.sector || '—'}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '260px' }}>
                      {(s.gargalos || []).slice(0, 3).map(g => (
                        <span key={g} style={{ padding: '2px 8px', background: '#eff6ff', color: '#217FF1', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                          {g.length > 30 ? g.slice(0, 28) + '…' : g}
                        </span>
                      ))}
                      {(s.gargalos || []).length > 3 && (
                        <span style={{ padding: '2px 8px', background: '#F3F6FB', color: '#888', borderRadius: '6px', fontSize: '11px' }}>
                          +{s.gargalos.length - 3}
                        </span>
                      )}
                      {!(s.gargalos || []).length && <span style={{ fontSize: '12px', color: '#ccc' }}>—</span>}
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '14px', color: '#f59e0b', letterSpacing: '1px' }}>
                    {scoreStars(s.score)}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 700,
                      ...(s.micro_confirmacao
                        ? { background: '#ecfdf5', color: '#10b981' }
                        : { background: '#fef2f2', color: '#ef4444' }),
                    }}>
                      {s.micro_confirmacao ? '✓ Sim' : '✗ Não'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: '#aaa', whiteSpace: 'nowrap' }}>
                    {new Date(s.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                  <td style={{ padding: '12px 14px' }} onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => { if (window.confirm('Eliminar esta sessão?')) onDelete(s.id) }}
                      style={{ padding: '4px 10px', background: '#fef2f2', border: 'none', borderRadius: '7px', fontSize: '12px', color: '#ef4444', cursor: 'pointer', fontWeight: 600 }}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ── Main DiscoveryView ── */
export default function DiscoveryView({ leads = [] }) {
  const [sub, setSub] = useState('sessoes')
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'new' | session obj

  const fetchSessions = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('discovery_sessions')
      .select('*')
      .order('created_at', { ascending: false })
    setSessions((data || []).map(s => ({ ...s, gargalos: Array.isArray(s.gargalos) ? s.gargalos : [] })))
    setLoading(false)
  }, [])

  useEffect(() => { fetchSessions() }, [fetchSessions])

  const handleSave = (saved) => {
    const s = { ...saved, gargalos: Array.isArray(saved.gargalos) ? saved.gargalos : [] }
    setSessions(prev => {
      const exists = prev.find(x => x.id === s.id)
      return exists ? prev.map(x => x.id === s.id ? s : x) : [s, ...prev]
    })
  }

  const handleDelete = async (id) => {
    await supabase.from('discovery_sessions').delete().eq('id', id)
    setSessions(prev => prev.filter(s => s.id !== id))
  }

  const SUB_TABS = [
    { id: 'sessoes', label: 'Sessões' },
    { id: 'padroes', label: 'Padrões ICP' },
  ]

  return (
    <div style={{ background: '#F3F6FB', minHeight: '100vh', fontFamily: 'Inter, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Sub-tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '2px', background: 'white', borderRadius: '12px', padding: '4px', border: '1px solid #f0f4f8' }}>
            {SUB_TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setSub(t.id)}
                style={{
                  padding: '7px 20px', borderRadius: '9px', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 700,
                  background: sub === t.id ? '#217FF1' : 'transparent',
                  color: sub === t.id ? 'white' : '#888',
                  transition: 'all 0.12s',
                }}
              >
                {t.label}
                {t.id === 'sessoes' && sessions.length > 0 && (
                  <span style={{ marginLeft: '6px', fontSize: '11px', opacity: 0.8 }}>({sessions.length})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>A carregar sessões…</div>
        ) : (
          <>
            {sub === 'sessoes' && (
              <SessionsList
                sessions={sessions}
                leads={leads}
                onNew={() => setModal('new')}
                onEdit={(s) => setModal(s)}
                onDelete={handleDelete}
              />
            )}
            {sub === 'padroes' && <PatternView sessions={sessions} />}
          </>
        )}
      </div>

      {modal && (
        <SessionModal
          session={modal === 'new' ? null : modal}
          leads={leads}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
