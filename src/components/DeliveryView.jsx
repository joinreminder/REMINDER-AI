import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const PHASES = [
  { id: 'onboarding',    label: 'Onboarding',       color: '#6366f1', bg: '#eef2ff' },
  { id: 'qw_build',      label: 'Quick Win Build',   color: '#f59e0b', bg: '#fffbeb' },
  { id: 'qw_live',       label: 'Quick Win Live',    color: '#0ea5e9', bg: '#f0f9ff' },
  { id: 'sistema_build', label: 'Sistema Build',     color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 'sistema_live',  label: 'Sistema Live',      color: '#217FF1', bg: '#eff6ff' },
  { id: 'manutencao',    label: 'Manutenção',        color: '#10b981', bg: '#ecfdf5' },
]

function phaseMeta(id) {
  return PHASES.find(p => p.id === id) || PHASES[0]
}

function Label({ children }) {
  return (
    <div style={{ fontSize: '11px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
      {children}
    </div>
  )
}

/* ── Checklist ── */
function Checklist({ tasks, onChange }) {
  const [newText, setNewText] = useState('')

  const add = () => {
    if (!newText.trim()) return
    const item = { id: crypto.randomUUID(), text: newText.trim(), done: false, created_at: new Date().toISOString() }
    onChange([...tasks, item])
    setNewText('')
  }

  const toggle = (id) => onChange(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const remove = (id) => onChange(tasks.filter(t => t.id !== id))

  return (
    <div>
      <Label>Checklist</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
        {tasks.length === 0 && (
          <span style={{ fontSize: '12px', color: '#ccc' }}>Sem tarefas</span>
        )}
        {tasks.map(t => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
              style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: '#217FF1' }}
            />
            <span style={{
              flex: 1, fontSize: '13px', color: t.done ? '#bbb' : '#333',
              textDecoration: t.done ? 'line-through' : 'none',
            }}>
              {t.text}
            </span>
            <button
              onClick={() => remove(t.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ddd', fontSize: '14px', padding: '0 2px' }}
              title="Remover"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        <input
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Nova tarefa…"
          style={{
            flex: 1, padding: '7px 10px', border: '1.5px solid #e8edf5',
            borderRadius: '8px', fontSize: '13px', outline: 'none',
          }}
        />
        <button
          onClick={add}
          style={{
            padding: '7px 12px', background: '#217FF1', color: 'white',
            border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}

/* ── Delivery card ── */
function DeliveryCard({ lead, delivery, onSave }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(delivery)
  const [saving, setSaving] = useState(false)
  const phase = phaseMeta(form.phase)

  useEffect(() => { setForm(delivery) }, [delivery])

  const save = async () => {
    setSaving(true)
    const payload = {
      lead_id: lead.id,
      phase: form.phase,
      tasks: form.tasks,
      milestone_qw: form.milestone_qw || null,
      milestone_sistema: form.milestone_sistema || null,
      milestone_review: form.milestone_review || null,
      notes: form.notes || '',
    }
    let result
    if (form.id) {
      result = await supabase.from('deliveries').update(payload).eq('id', form.id).select().single()
    } else {
      result = await supabase.from('deliveries').insert(payload).select().single()
    }
    setSaving(false)
    if (result.data) { onSave(result.data); setOpen(false) }
  }

  const done = form.tasks.filter(t => t.done).length
  const total = form.tasks.length

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1.5px solid #f0f4f8', overflow: 'hidden', marginBottom: '12px' }}>
      {/* Header row */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#111' }}>{lead.nome}</div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{lead.clinica || lead.tipo || '—'}</div>
        </div>
        <span style={{
          padding: '4px 12px', borderRadius: '100px',
          background: phase.bg, color: phase.color,
          fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap',
        }}>
          {phase.label}
        </span>
        {total > 0 && (
          <span style={{ fontSize: '11px', color: done === total ? '#10b981' : '#888', fontWeight: 600, whiteSpace: 'nowrap' }}>
            {done}/{total} tarefas
          </span>
        )}
        <span style={{ color: '#ccc', fontSize: '16px' }}>{open ? '▲' : '▼'}</span>
      </div>

      {/* Expanded body */}
      {open && (
        <div style={{ borderTop: '1px solid #f5f5f5', padding: '20px' }}>
          {/* Phase selector */}
          <div style={{ marginBottom: '20px' }}>
            <Label>Fase actual</Label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {PHASES.map(p => (
                <button
                  key={p.id}
                  onClick={() => setForm(f => ({ ...f, phase: p.id }))}
                  style={{
                    padding: '5px 12px', borderRadius: '100px', border: `1.5px solid ${form.phase === p.id ? p.color : '#e8edf5'}`,
                    background: form.phase === p.id ? p.bg : 'white',
                    color: form.phase === p.id ? p.color : '#aaa',
                    fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div style={{ marginBottom: '20px', background: '#F3F6FB', borderRadius: '12px', padding: '16px' }}>
            <Label>Marcos</Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {[
                { key: 'milestone_qw', label: 'Quick Win entregue' },
                { key: 'milestone_sistema', label: 'Sistema live' },
                { key: 'milestone_review', label: 'Revisão 30 dias' },
              ].map(m => (
                <div key={m.key}>
                  <div style={{ fontSize: '10px', color: '#888', fontWeight: 600, marginBottom: '4px' }}>{m.label}</div>
                  <input
                    type="date"
                    value={form[m.key] || ''}
                    onChange={e => setForm(f => ({ ...f, [m.key]: e.target.value }))}
                    style={{
                      width: '100%', padding: '7px 10px', border: '1.5px solid #e8edf5',
                      borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div style={{ marginBottom: '20px' }}>
            <Checklist
              tasks={form.tasks}
              onChange={tasks => setForm(f => ({ ...f, tasks }))}
            />
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '20px' }}>
            <Label>Notas & próximo passo</Label>
            <textarea
              value={form.notes || ''}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Notas, próximos passos, contexto…"
              rows={3}
              style={{
                width: '100%', padding: '10px 12px', border: '1.5px solid #e8edf5',
                borderRadius: '10px', fontSize: '13px', resize: 'vertical',
                boxSizing: 'border-box', outline: 'none', fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>

          <button
            onClick={save}
            disabled={saving}
            style={{
              padding: '10px 24px', background: saving ? '#aaa' : '#217FF1',
              color: 'white', border: 'none', borderRadius: '10px',
              fontSize: '13px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'A guardar…' : 'Guardar'}
          </button>
        </div>
      )}
    </div>
  )
}

/* ── Phase column header (kanban summary) ── */
function PhaseSummaryBar({ deliveries }) {
  return (
    <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '24px', paddingBottom: '4px' }}>
      {PHASES.map(p => {
        const count = deliveries.filter(d => d.phase === p.id).length
        return (
          <div key={p.id} style={{
            flex: '0 0 auto', padding: '10px 16px', borderRadius: '12px',
            background: count > 0 ? p.bg : '#fafafa',
            border: `1.5px solid ${count > 0 ? p.color + '33' : '#f0f0f0'}`,
            textAlign: 'center', minWidth: '110px',
          }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: count > 0 ? p.color : '#ddd' }}>{count}</div>
            <div style={{ fontSize: '10px', color: count > 0 ? p.color : '#ccc', fontWeight: 700, marginTop: '2px' }}>{p.label}</div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Main DeliveryView ── */
export default function DeliveryView() {
  const [clients, setClients] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [phaseFilter, setPhaseFilter] = useState('all')

  const fetch = useCallback(async () => {
    setLoading(true)
    const [{ data: leads }, { data: dels }] = await Promise.all([
      supabase.from('leads').select('id, nome, clinica, tipo, created_at').eq('stage', 'cliente').order('created_at', { ascending: false }),
      supabase.from('deliveries').select('*'),
    ])
    setClients(leads || [])
    setDeliveries(dels || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const getDelivery = (leadId) => {
    const found = deliveries.find(d => d.lead_id === leadId)
    return found || { id: null, lead_id: leadId, phase: 'onboarding', tasks: [], milestone_qw: '', milestone_sistema: '', milestone_review: '', notes: '' }
  }

  const handleSave = (saved) => {
    setDeliveries(ds => {
      const exists = ds.find(d => d.id === saved.id)
      if (exists) return ds.map(d => d.id === saved.id ? saved : d)
      return [...ds, saved]
    })
  }

  const filtered = phaseFilter === 'all'
    ? clients
    : clients.filter(c => getDelivery(c.id).phase === phaseFilter)

  return (
    <div style={{ background: '#F3F6FB', minHeight: '100vh', fontFamily: 'Inter, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Phase summary bar */}
        <PhaseSummaryBar deliveries={deliveries} />

        {/* Filter */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#888', fontWeight: 600 }}>Filtrar:</span>
          <button
            onClick={() => setPhaseFilter('all')}
            style={{
              padding: '5px 12px', borderRadius: '100px', border: 'none',
              background: phaseFilter === 'all' ? '#111' : '#e8edf5',
              color: phaseFilter === 'all' ? 'white' : '#555',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer',
            }}
          >
            Todos ({clients.length})
          </button>
          {PHASES.map(p => {
            const count = clients.filter(c => getDelivery(c.id).phase === p.id).length
            if (count === 0) return null
            return (
              <button
                key={p.id}
                onClick={() => setPhaseFilter(phaseFilter === p.id ? 'all' : p.id)}
                style={{
                  padding: '5px 12px', borderRadius: '100px',
                  border: `1.5px solid ${phaseFilter === p.id ? p.color : 'transparent'}`,
                  background: phaseFilter === p.id ? p.bg : '#e8edf5',
                  color: phaseFilter === p.id ? p.color : '#555',
                  fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                {p.label} ({count})
              </button>
            )
          })}
          <button
            onClick={fetch}
            style={{
              marginLeft: 'auto', padding: '5px 12px', background: 'white',
              border: '1.5px solid #e8edf5', borderRadius: '8px',
              fontSize: '12px', color: '#888', cursor: 'pointer',
            }}
          >
            ↻ Atualizar
          </button>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>A carregar…</div>}

        {!loading && clients.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
              Sem clientes activos
            </h3>
            <p style={{ color: '#888', fontSize: '14px' }}>
              Quando uma lead for movida para "Cliente" no Pipeline, aparece aqui automaticamente.
            </p>
          </div>
        )}

        {!loading && filtered.map(lead => (
          <DeliveryCard
            key={lead.id}
            lead={lead}
            delivery={getDelivery(lead.id)}
            onSave={handleSave}
          />
        ))}

        {!loading && clients.length > 0 && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#aaa', fontSize: '14px' }}>
            Sem clientes nesta fase.
          </div>
        )}
      </div>
    </div>
  )
}
