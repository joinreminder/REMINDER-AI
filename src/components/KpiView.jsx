import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

/* ── Helpers ── */
function getMonday(date = new Date()) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function fmtWeek(monday) {
  const sun = new Date(monday)
  sun.setDate(monday.getDate() + 6)
  const o = { day: '2-digit', month: 'short' }
  return `${monday.toLocaleDateString('pt-PT', o)} – ${sun.toLocaleDateString('pt-PT', o)}`
}

function toIso(d) { return d.toISOString().slice(0, 10) }

function pct(num, den) {
  if (!den || den === 0) return null
  return Math.round((num / den) * 1000) / 10
}

function fmtPct(v) { return v === null ? '—' : `${v}%` }
function fmtEuro(v) { return (!v && v !== 0) ? '—' : `€${Number(v).toLocaleString('pt-PT')}` }
function fmtDays(v) { return (!v && v !== 0) ? '—' : `${v}d` }
function fmtN(v) { return (!v && v !== 0) ? '—' : Number(v).toLocaleString('pt-PT') }

const EMPTY = {
  prospects: '', replies: '', positive_replies: '',
  audits_booked: '', shows: '', proposals: '', closes: '',
  avg_deal: '', mrr: '', cac: '', sales_cycle: '',
  time_to_launch: '', gross_margin: '', expansion: '',
  nps: '', active_clients: '', churn_count: '',
  pipeline_value: '', forecast_month: '', mrr_accumulated: '',
}

/* ── Sub-components ── */
function NumInput({ label, value, onChange, prefix, suffix, placeholder = '0' }) {
  return (
    <div>
      <label style={{
        display: 'block', fontSize: '11px', fontWeight: 700,
        color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px',
      }}>
        {label}
      </label>
      <div style={{
        display: 'flex', alignItems: 'center',
        border: '1.5px solid #e8edf5', borderRadius: '10px',
        background: 'white', overflow: 'hidden', transition: 'border-color 0.12s',
      }}
        onFocusCapture={e => e.currentTarget.style.borderColor = '#217FF1'}
        onBlurCapture={e => e.currentTarget.style.borderColor = '#e8edf5'}
      >
        {prefix && (
          <span style={{ padding: '0 10px', fontSize: '13px', color: '#aaa', borderRight: '1px solid #f0f0f0', lineHeight: '38px' }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1, padding: '9px 11px', border: 'none', outline: 'none',
            fontSize: '15px', fontWeight: 600, color: '#111',
            fontFamily: 'Inter, sans-serif', background: 'transparent',
            minWidth: 0,
          }}
        />
        {suffix && (
          <span style={{ padding: '0 10px', fontSize: '12px', color: '#aaa', lineHeight: '38px' }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function KpiCard({ label, value, sub, color = '#217FF1', big = false, prevValue }) {
  const isEmpty = value === '—' || value === null || value === undefined

  let diffEl = null
  if (!isEmpty && prevValue !== undefined && prevValue !== null && prevValue !== '—') {
    const cur = parseFloat(String(value).replace(/[^0-9.-]/g, ''))
    const prev = parseFloat(String(prevValue).replace(/[^0-9.-]/g, ''))
    if (!isNaN(cur) && !isNaN(prev) && prev !== 0) {
      const pct = Math.round(((cur - prev) / Math.abs(prev)) * 100)
      const up = pct >= 0
      diffEl = (
        <span style={{ fontSize: '10px', fontWeight: 700, color: up ? '#10b981' : '#ef4444', marginLeft: '4px' }}>
          {up ? '↑' : '↓'}{Math.abs(pct)}%
        </span>
      )
    }
  }

  return (
    <div style={{
      background: isEmpty ? '#fafafa' : 'white',
      border: `1.5px solid ${isEmpty ? '#f0f0f0' : '#e8edf5'}`,
      borderRadius: '12px', padding: big ? '16px 18px' : '12px 14px',
      display: 'flex', flexDirection: 'column', gap: '4px',
    }}>
      <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: big ? '28px' : '22px', fontWeight: 800,
          color: isEmpty ? '#ddd' : color,
          fontFamily: 'Sora, sans-serif', lineHeight: 1.1,
        }}>
          {isEmpty ? '—' : value}
        </span>
        {diffEl}
      </div>
      {sub && <span style={{ fontSize: '11px', color: '#bbb' }}>{sub}</span>}
    </div>
  )
}

function SectionHeader({ label, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
      <div style={{ width: '3px', height: '16px', borderRadius: '2px', background: color }} />
      <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '12px', fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </span>
    </div>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: '#f0f4f8', margin: '4px 0' }} />
}

/* ── History sparkline (SVG bars) ── */
function Spark({ values, color = '#217FF1' }) {
  if (!values || values.length === 0) return <span style={{ color: '#ddd', fontSize: '11px' }}>sem dados</span>
  const max = Math.max(...values, 1)
  const w = 6, gap = 3, h = 28
  return (
    <svg width={values.length * (w + gap)} height={h} style={{ display: 'block' }}>
      {values.map((v, i) => {
        const barH = Math.max(2, (v / max) * h)
        return (
          <rect
            key={i}
            x={i * (w + gap)}
            y={h - barH}
            width={w}
            height={barH}
            rx={2}
            fill={i === values.length - 1 ? color : '#dde6f7'}
          />
        )
      })}
    </svg>
  )
}

/* ── History table ── */
function HistoryTable({ rows }) {
  if (!rows || rows.length === 0) return null

  const cols = [
    { label: 'Semana', key: 'week_start', fmt: v => new Date(v + 'T00:00:00').toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }) },
    { label: 'Prospects', key: 'prospects' },
    { label: 'Reply %', key: null, fmt: (_, r) => fmtPct(pct(r.replies, r.prospects)) },
    { label: '+Reply %', key: null, fmt: (_, r) => fmtPct(pct(r.positive_replies, r.replies)) },
    { label: 'Audit %', key: null, fmt: (_, r) => fmtPct(pct(r.audits_booked, r.positive_replies)) },
    { label: 'Show %', key: null, fmt: (_, r) => fmtPct(pct(r.shows, r.audits_booked)) },
    { label: 'Proposta %', key: null, fmt: (_, r) => fmtPct(pct(r.proposals, r.shows)) },
    { label: 'Close %', key: null, fmt: (_, r) => fmtPct(pct(r.closes, r.proposals)) },
    { label: 'Closes', key: 'closes' },
    { label: 'MRR', key: 'mrr', fmt: v => fmtEuro(v) },
  ]

  const th = {
    padding: '8px 12px', fontSize: '10px', fontWeight: 700, color: '#aaa',
    textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left',
    background: '#F3F6FB', borderBottom: '1px solid #e8edf5', whiteSpace: 'nowrap',
  }
  const td = {
    padding: '10px 12px', fontSize: '13px', color: '#444',
    borderBottom: '1px solid #f5f7fa', whiteSpace: 'nowrap',
  }

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f4f8', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 700, color: '#111' }}>
          Historico — ultimas {rows.length} semanas
        </span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {cols.map(c => <th key={c.label} style={th}>{c.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.week_start} style={{ background: i % 2 === 0 ? 'white' : '#fafcff' }}>
                {cols.map(c => {
                  const raw = c.key ? row[c.key] : null
                  const val = c.fmt ? c.fmt(raw, row) : (raw ?? '—')
                  const isGood = typeof val === 'string' && val.includes('%') && parseFloat(val) > 0
                  return (
                    <td key={c.label} style={{ ...td, fontWeight: c.label === 'Semana' ? 700 : 400, color: c.label === 'Semana' ? '#111' : '#666' }}>
                      {val ?? '—'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── Main KpiView ── */
export default function KpiView() {
  const [monday, setMonday] = useState(getMonday())
  const [data, setData] = useState({ ...EMPTY })
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const weekKey = toIso(monday)
  const isCurrentWeek = weekKey === toIso(getMonday())

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 2500)
  }

  const fetchHistory = useCallback(async () => {
    const { data: rows } = await supabase
      .from('weekly_kpis')
      .select('*')
      .order('week_start', { ascending: false })
      .limit(12)
    if (rows) setHistory(rows)
  }, [])

  const fetchWeek = useCallback(async (key) => {
    setLoading(true)
    const { data: row } = await supabase
      .from('weekly_kpis')
      .select('*')
      .eq('week_start', key)
      .maybeSingle()
    if (row) {
      setData({
        prospects: row.prospects ?? '',
        replies: row.replies ?? '',
        positive_replies: row.positive_replies ?? '',
        audits_booked: row.audits_booked ?? '',
        shows: row.shows ?? '',
        proposals: row.proposals ?? '',
        closes: row.closes ?? '',
        avg_deal: row.avg_deal ?? '',
        mrr: row.mrr ?? '',
        cac: row.cac ?? '',
        sales_cycle: row.sales_cycle ?? '',
        time_to_launch: row.time_to_launch ?? '',
        gross_margin: row.gross_margin ?? '',
        expansion: row.expansion ?? '',
        nps: row.nps ?? '',
        active_clients: row.active_clients ?? '',
        churn_count: row.churn_count ?? '',
        pipeline_value: row.pipeline_value ?? '',
        forecast_month: row.forecast_month ?? '',
        mrr_accumulated: row.mrr_accumulated ?? '',
      })
    } else {
      setData({ ...EMPTY })
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchWeek(weekKey) }, [weekKey, fetchWeek])
  useEffect(() => { fetchHistory() }, [fetchHistory])

  const prevWeek = () => { const d = new Date(monday); d.setDate(d.getDate() - 7); setMonday(d) }
  const nextWeek = () => { const d = new Date(monday); d.setDate(d.getDate() + 7); setMonday(d) }

  const set = (k, v) => setData(d => ({ ...d, [k]: v }))
  const n = k => data[k] === '' ? 0 : Number(data[k])

  const save = async () => {
    setSaving(true)
    const payload = {
      week_start: weekKey,
      prospects: n('prospects') || null,
      replies: n('replies') || null,
      positive_replies: n('positive_replies') || null,
      audits_booked: n('audits_booked') || null,
      shows: n('shows') || null,
      proposals: n('proposals') || null,
      closes: n('closes') || null,
      avg_deal: n('avg_deal') || null,
      mrr: n('mrr') || null,
      cac: n('cac') || null,
      sales_cycle: n('sales_cycle') || null,
      time_to_launch: n('time_to_launch') || null,
      gross_margin: n('gross_margin') || null,
      expansion: n('expansion') || null,
      nps: n('nps') || null,
      active_clients: n('active_clients') || null,
      churn_count: n('churn_count') || null,
      pipeline_value: n('pipeline_value') || null,
      forecast_month: n('forecast_month') || null,
      mrr_accumulated: n('mrr_accumulated') || null,
    }
    const { error } = await supabase.from('weekly_kpis').upsert(payload, { onConflict: 'week_start' })
    setSaving(false)
    if (error) { showToast('Erro ao guardar', false) }
    else { showToast('Guardado!', true); fetchHistory() }
  }

  /* Previous week data for comparison */
  const prevWeekData = (() => {
    const prevKey = toIso((() => { const d = new Date(monday); d.setDate(d.getDate() - 7); return d })())
    return history.find(r => r.week_start === prevKey) || null
  })()
  const prev = (key) => prevWeekData ? (prevWeekData[key] ?? null) : null
  const prevFmt = (key, fmt) => {
    const v = prev(key)
    return v !== null ? fmt(v) : null
  }

  /* Derived KPIs */
  const replyRate      = pct(n('replies'),          n('prospects'))
  const posReplyRate   = pct(n('positive_replies'), n('replies'))
  const auditRate      = pct(n('audits_booked'),    n('positive_replies'))
  const showRate       = pct(n('shows'),            n('audits_booked'))
  const proposalRate   = pct(n('proposals'),        n('shows'))
  const closeRate      = pct(n('closes'),           n('proposals'))

  /* Spark data from history */
  const sparkOf = key => [...history].reverse().map(r => r[key] ?? 0)
  const sparkPct = (num, den) => [...history].reverse().map(r => pct(r[num] ?? 0, r[den] ?? 0) ?? 0)

  /* Funnel pipeline */
  const pipeline = [
    { label: 'Prospects', value: n('prospects'), color: '#6b7280' },
    { label: 'Replies', value: n('replies'), color: '#f59e0b' },
    { label: '+Replies', value: n('positive_replies'), color: '#8b5cf6' },
    { label: 'Audits', value: n('audits_booked'), color: '#217FF1' },
    { label: 'Shows', value: n('shows'), color: '#0ea5e9' },
    { label: 'Propostas', value: n('proposals'), color: '#10b981' },
    { label: 'Closes', value: n('closes'), color: '#059669' },
  ]
  const pipelineMax = Math.max(...pipeline.map(p => p.value), 1)

  return (
    <div style={{ background: '#F3F6FB', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', right: '24px', zIndex: 9999,
          background: toast.ok ? '#10b981' : '#ef4444',
          color: 'white', padding: '12px 20px', borderRadius: '12px',
          fontSize: '14px', fontWeight: 700,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          animation: 'fadeIn 0.2s ease',
        }}>
          {toast.ok ? '✓' : '✕'} {toast.msg}
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 24px 48px' }}>

        {/* Week nav header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={prevWeek} style={{
              width: '36px', height: '36px', borderRadius: '10px',
              border: '1.5px solid #e8edf5', background: 'white',
              cursor: 'pointer', fontSize: '16px', color: '#555',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>‹</button>
            <div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '17px', fontWeight: 700, color: '#111' }}>
                {fmtWeek(monday)}
              </div>
              {isCurrentWeek && (
                <div style={{ fontSize: '11px', color: '#217FF1', fontWeight: 700, marginTop: '1px' }}>
                  Semana atual
                </div>
              )}
            </div>
            <button onClick={nextWeek} disabled={isCurrentWeek} style={{
              width: '36px', height: '36px', borderRadius: '10px',
              border: '1.5px solid #e8edf5', background: isCurrentWeek ? '#fafafa' : 'white',
              cursor: isCurrentWeek ? 'not-allowed' : 'pointer', fontSize: '16px',
              color: isCurrentWeek ? '#ddd' : '#555',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>›</button>
          </div>

          <button
            onClick={save}
            disabled={saving}
            style={{
              padding: '10px 24px', background: saving ? '#aaa' : '#217FF1',
              color: 'white', border: 'none', borderRadius: '12px',
              fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}
          >
            {saving ? 'A guardar…' : 'Guardar semana'}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>A carregar…</div>
        ) : (
          <>
            {/* Top 4 summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
              {[
                { label: 'MRR Actual', value: fmtEuro(n('mrr')), color: '#f59e0b', prevValue: prevFmt('mrr', fmtEuro) },
                { label: 'Closes semana', value: fmtN(n('closes')), color: '#10b981', prevValue: prevFmt('closes', fmtN) },
                { label: 'Clientes activos', value: fmtN(n('active_clients')), color: '#217FF1', prevValue: prevFmt('active_clients', fmtN) },
                { label: 'Close Rate', value: fmtPct(closeRate), color: '#8b5cf6', prevValue: prevWeekData ? fmtPct(pct(prevWeekData.closes ?? 0, prevWeekData.proposals ?? 0)) : null },
              ].map(c => (
                <div key={c.label} style={{ background: 'white', borderRadius: '16px', padding: '20px 22px', border: '1px solid #f0f4f8', boxShadow: '0 2px 12px rgba(33,127,241,0.06)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{c.label}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '32px', fontWeight: 800, color: c.value === '—' ? '#ddd' : c.color, fontFamily: 'Sora, sans-serif', lineHeight: 1 }}>
                      {c.value}
                    </span>
                    {c.prevValue && c.value !== '—' && (() => {
                      const cur = parseFloat(String(c.value).replace(/[^0-9.-]/g, ''))
                      const prv = parseFloat(String(c.prevValue).replace(/[^0-9.-]/g, ''))
                      if (!isNaN(cur) && !isNaN(prv) && prv !== 0) {
                        const p = Math.round(((cur - prv) / Math.abs(prv)) * 100)
                        const up = p >= 0
                        return <span style={{ fontSize: '13px', fontWeight: 700, color: up ? '#10b981' : '#ef4444' }}>{up ? '↑' : '↓'}{Math.abs(p)}%</span>
                      }
                      return null
                    })()}
                  </div>
                  {c.prevValue && <div style={{ fontSize: '11px', color: '#ccc', marginTop: '4px' }}>semana ant.: {c.prevValue}</div>}
                </div>
              ))}
            </div>

            {/* Main grid: inputs left + funnel right */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px', marginBottom: '16px' }}>

              {/* LEFT: Input sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                {/* Outbound */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8' }}>
                  <SectionHeader label="Outbound" color="#6366f1" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <NumInput label="Prospects contactados" value={data.prospects} onChange={v => set('prospects', v)} />
                    <NumInput label="Replies" value={data.replies} onChange={v => set('replies', v)} />
                    <NumInput label="Positive Replies" value={data.positive_replies} onChange={v => set('positive_replies', v)} />
                  </div>
                  <Divider />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '12px' }}>
                    <KpiCard label="Reply Rate" value={fmtPct(replyRate)} sub={`${n('replies')} / ${n('prospects')}`} color="#6366f1" prevValue={prevWeekData ? fmtPct(pct(prevWeekData.replies ?? 0, prevWeekData.prospects ?? 0)) : null} />
                    <KpiCard label="Positive Reply Rate" value={fmtPct(posReplyRate)} sub={`${n('positive_replies')} / ${n('replies')}`} color="#8b5cf6" prevValue={prevWeekData ? fmtPct(pct(prevWeekData.positive_replies ?? 0, prevWeekData.replies ?? 0)) : null} />
                    <KpiCard label="Prospects → +Reply" value={fmtPct(pct(n('positive_replies'), n('prospects')))} sub="taxa composta" color="#a78bfa" />
                  </div>
                </div>

                {/* Sales */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8' }}>
                  <SectionHeader label="Sales" color="#217FF1" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <NumInput label="Audits Booked" value={data.audits_booked} onChange={v => set('audits_booked', v)} />
                    <NumInput label="Shows" value={data.shows} onChange={v => set('shows', v)} />
                    <NumInput label="Proposals" value={data.proposals} onChange={v => set('proposals', v)} />
                    <NumInput label="Closes" value={data.closes} onChange={v => set('closes', v)} />
                  </div>
                  <Divider />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginTop: '12px' }}>
                    <KpiCard label="Audit Booked Rate" value={fmtPct(auditRate)} sub={`${n('audits_booked')} / ${n('positive_replies')}`} color="#217FF1" prevValue={prevWeekData ? fmtPct(pct(prevWeekData.audits_booked ?? 0, prevWeekData.positive_replies ?? 0)) : null} />
                    <KpiCard label="Show Rate" value={fmtPct(showRate)} sub={`${n('shows')} / ${n('audits_booked')}`} color="#0ea5e9" prevValue={prevWeekData ? fmtPct(pct(prevWeekData.shows ?? 0, prevWeekData.audits_booked ?? 0)) : null} />
                    <KpiCard label="Proposal Rate" value={fmtPct(proposalRate)} sub={`${n('proposals')} / ${n('shows')}`} color="#10b981" prevValue={prevWeekData ? fmtPct(pct(prevWeekData.proposals ?? 0, prevWeekData.shows ?? 0)) : null} />
                    <KpiCard label="Close Rate" value={fmtPct(closeRate)} sub={`${n('closes')} / ${n('proposals')}`} color="#059669" big prevValue={prevWeekData ? fmtPct(pct(prevWeekData.closes ?? 0, prevWeekData.proposals ?? 0)) : null} />
                  </div>
                </div>

                {/* Economics + Delivery — side by side */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

                  {/* Economics */}
                  <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8' }}>
                    <SectionHeader label="Economics" color="#f59e0b" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <NumInput label="Avg Deal Size" value={data.avg_deal} onChange={v => set('avg_deal', v)} prefix="€" />
                      <NumInput label="MRR atual" value={data.mrr} onChange={v => set('mrr', v)} prefix="€" />
                      <NumInput label="CAC (custo p/ cliente)" value={data.cac} onChange={v => set('cac', v)} prefix="€" />
                      <NumInput label="Sales Cycle (dias)" value={data.sales_cycle} onChange={v => set('sales_cycle', v)} suffix="dias" />
                    </div>
                    <Divider />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                      <KpiCard label="MRR" value={fmtEuro(n('mrr'))} color="#f59e0b" prevValue={prevFmt('mrr', fmtEuro)} />
                      <KpiCard label="Avg Deal" value={fmtEuro(n('avg_deal'))} color="#d97706" prevValue={prevFmt('avg_deal', fmtEuro)} />
                      <KpiCard label="CAC" value={fmtEuro(n('cac'))} color="#92400e" prevValue={prevFmt('cac', fmtEuro)} />
                      <KpiCard label="Sales Cycle" value={fmtDays(n('sales_cycle'))} color="#78716c" prevValue={prevFmt('sales_cycle', fmtDays)} />
                    </div>
                  </div>

                  {/* Delivery */}
                  <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8' }}>
                    <SectionHeader label="Delivery" color="#10b981" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <NumInput label="Time to Launch (dias)" value={data.time_to_launch} onChange={v => set('time_to_launch', v)} suffix="dias" />
                      <NumInput label="Gross Margin" value={data.gross_margin} onChange={v => set('gross_margin', v)} suffix="%" />
                      <NumInput label="Expansion Revenue" value={data.expansion} onChange={v => set('expansion', v)} prefix="€" />
                    </div>
                    <Divider />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                      <KpiCard label="Time to Launch" value={fmtDays(n('time_to_launch'))} color="#10b981" />
                      <KpiCard label="Gross Margin" value={n('gross_margin') ? `${n('gross_margin')}%` : '—'} color="#059669" />
                      <KpiCard label="Expansion" value={fmtEuro(n('expansion'))} color="#047857" />
                      <KpiCard
                        label="LTV / CAC"
                        value={n('cac') && n('avg_deal') ? `${Math.round(n('avg_deal') / n('cac'))}x` : '—'}
                        color="#065f46"
                      />
                    </div>
                  </div>

                </div>

                {/* Delivery Health + Revenue Forecast — side by side */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

                  {/* Delivery Health */}
                  <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8' }}>
                    <SectionHeader label="Delivery Health" color="#10b981" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <NumInput label="NPS (0-10)" value={data.nps} onChange={v => set('nps', v)} placeholder="0" />
                      <NumInput label="Clientes activos" value={data.active_clients} onChange={v => set('active_clients', v)} />
                      <NumInput label="Churn (saídas)" value={data.churn_count} onChange={v => set('churn_count', v)} />
                    </div>
                    <Divider />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '12px' }}>
                      <KpiCard label="NPS" value={n('nps') ? `${n('nps')}/10` : '—'} color={n('nps') >= 8 ? '#10b981' : n('nps') >= 6 ? '#f59e0b' : '#ef4444'} prevValue={prev('nps') !== null ? `${prev('nps')}/10` : null} />
                      <KpiCard label="Activos" value={fmtN(n('active_clients'))} color="#217FF1" prevValue={prevFmt('active_clients', fmtN)} />
                      <KpiCard label="Churn" value={fmtN(n('churn_count'))} color="#ef4444" prevValue={prevFmt('churn_count', fmtN)} />
                    </div>
                  </div>

                  {/* Revenue Forecast */}
                  <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8' }}>
                    <SectionHeader label="Revenue Forecast" color="#f59e0b" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <NumInput label="Pipeline Value total" value={data.pipeline_value} onChange={v => set('pipeline_value', v)} prefix="€" />
                      <NumInput label="Forecast fecho do mês" value={data.forecast_month} onChange={v => set('forecast_month', v)} prefix="€" />
                      <NumInput label="MRR acumulado" value={data.mrr_accumulated} onChange={v => set('mrr_accumulated', v)} prefix="€" />
                    </div>
                    <Divider />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '12px' }}>
                      <KpiCard label="Pipeline" value={fmtEuro(n('pipeline_value'))} color="#f59e0b" prevValue={prevFmt('pipeline_value', fmtEuro)} />
                      <KpiCard label="Forecast mês" value={fmtEuro(n('forecast_month'))} color="#d97706" prevValue={prevFmt('forecast_month', fmtEuro)} />
                      <KpiCard label="MRR Acumulado" value={fmtEuro(n('mrr_accumulated'))} color="#92400e" prevValue={prevFmt('mrr_accumulated', fmtEuro)} />
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT: Funnel visual */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                {/* Funnel bars */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8' }}>
                  <SectionHeader label="Funil esta semana" color="#217FF1" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pipeline.map((p, i) => {
                      const width = pipelineMax > 0 ? Math.max(4, (p.value / pipelineMax) * 100) : 4
                      const convRate = i > 0 ? pct(p.value, pipeline[i-1].value) : null
                      return (
                        <div key={p.label}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              {p.label}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                              {convRate !== null && (
                                <span style={{ fontSize: '10px', color: '#ccc' }}>{fmtPct(convRate)}</span>
                              )}
                              <span style={{ fontSize: '15px', fontWeight: 800, color: p.value > 0 ? p.color : '#e0e0e0' }}>
                                {p.value || 0}
                              </span>
                            </div>
                          </div>
                          <div style={{ height: '8px', background: '#f0f4f8', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                              height: '100%', width: `${width}%`,
                              background: p.color, borderRadius: '4px',
                              transition: 'width 0.4s ease',
                            }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Weekly summary card */}
                <div style={{ background: '#217FF1', borderRadius: '16px', padding: '20px', color: 'white' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: '12px' }}>
                    Resumo da semana
                  </div>
                  {[
                    { label: 'Total prospects', value: fmtN(n('prospects')) },
                    { label: 'Leads qualificadas', value: fmtN(n('positive_replies')) },
                    { label: 'Calls marcadas', value: fmtN(n('audits_booked')) },
                    { label: 'Fechados', value: fmtN(n('closes')) },
                    { label: 'Receita gerada', value: n('closes') && n('avg_deal') ? fmtEuro(n('closes') * n('avg_deal')) : '—' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                      <span style={{ fontSize: '13px', opacity: 0.85 }}>{item.label}</span>
                      <span style={{ fontSize: '15px', fontWeight: 800 }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Trend sparklines */}
                {history.length > 1 && (
                  <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8' }}>
                    <SectionHeader label="Tendencias" color="#8b5cf6" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { label: 'Prospects/semana', data: sparkOf('prospects'), color: '#6b7280' },
                        { label: 'Reply rate', data: sparkPct('replies', 'prospects'), color: '#6366f1' },
                        { label: 'Close rate', data: sparkPct('closes', 'proposals'), color: '#059669' },
                        { label: 'MRR', data: sparkOf('mrr'), color: '#f59e0b' },
                      ].map(s => (
                        <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', color: '#888', fontWeight: 600 }}>{s.label}</span>
                          <Spark values={s.data} color={s.color} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* History table */}
            <HistoryTable rows={history} />
          </>
        )}
      </div>
    </div>
  )
}
