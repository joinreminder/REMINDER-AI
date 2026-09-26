import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import KpiView from '../components/KpiView'
import DeliveryView from '../components/DeliveryView'
import OutboundView from '../components/OutboundView'
import CoachView from '../components/CoachView'
import DiscoveryView from '../components/DiscoveryView'

const CRM_PASSWORD = import.meta.env.VITE_CRM_PASSWORD || 'remindr2024'
const CALENDLY_BASE = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/remindr/diagnostico'

const STAGES = [
  { id: 'nova',      label: 'Lead Nova',          color: '#6366f1', bg: '#eef2ff' },
  { id: 'contactar', label: 'Outreach Enviado',   color: '#f59e0b', bg: '#fffbeb' },
  { id: 'reuniao',   label: 'Audit Agendado',     color: '#217FF1', bg: '#eff6ff' },
  { id: 'proposta',  label: 'Proposta Enviada',   color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 'cliente',   label: 'Cliente',            color: '#10b981', bg: '#ecfdf5' },
  { id: 'perdida',   label: 'Perdida',            color: '#ef4444', bg: '#fef2f2' },
]

const SECTORS = [
  'Serviços B2B',
  'Construção / AVAC / Engenharia',
  'Saúde / Clínicas',
  'Imobiliário',
  'E-commerce / Retalho',
  'Serviços Profissionais (Jurídico, Contabilidade)',
  'Tecnologia / SaaS',
  'Indústria / Manufactura',
  'Outro',
]

const EMPTY_LEAD = {
  nome: '', clinica: '', whatsapp: '', email: '',
  tipo: '', consultas: '', faturacao: '', dor: '',
  stage: 'nova', notes: '', meeting_date: '', meeting_link: '',
}

/* ── Field component ── */
function Field({ label, value, onChange, type = 'text', placeholder = '', required = false }) {
  return (
    <div>
      <label style={{ fontSize: '11px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '5px' }}>
        {label}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%', padding: '10px 13px', border: '1.5px solid #e8edf5',
          borderRadius: '10px', fontSize: '14px', color: '#111',
          boxSizing: 'border-box', outline: 'none',
        }}
      />
    </div>
  )
}

/* ── Select field component ── */
function SelectField({ label, value, onChange, options, required = false }) {
  return (
    <div>
      <label style={{ fontSize: '11px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '5px' }}>
        {label}
      </label>
      <select
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        required={required}
        style={{
          width: '100%', padding: '10px 13px', border: '1.5px solid #e8edf5',
          borderRadius: '10px', fontSize: '14px', color: value ? '#111' : '#aaa',
          boxSizing: 'border-box', outline: 'none', cursor: 'pointer',
          background: 'white',
        }}
      >
        <option value="">Seleccionar…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

/* ── Password gate ── */
function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  const attempt = (e) => {
    e.preventDefault()
    if (pw === CRM_PASSWORD) { onAuth() }
    else { setErr(true); setPw('') }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F6FB' }}>
      <form onSubmit={attempt} style={{
        background: 'white', borderRadius: '24px', padding: '48px 40px',
        boxShadow: '0 4px 40px rgba(33,127,241,0.12)',
        textAlign: 'center', width: '100%', maxWidth: '380px',
      }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔐</div>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
          Reminder CRM
        </h2>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '28px' }}>Acesso restrito à equipa interna</p>
        <input
          type="password"
          placeholder="Palavra-passe"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false) }}
          autoFocus
          style={{
            width: '100%', padding: '14px 18px',
            border: `1.5px solid ${err ? '#ef4444' : '#e8edf5'}`,
            borderRadius: '12px', fontSize: '16px', outline: 'none',
            boxSizing: 'border-box', marginBottom: err ? '8px' : '16px',
          }}
        />
        {err && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>Palavra-passe incorreta</p>}
        <button type="submit" style={{
          width: '100%', padding: '14px', background: '#217FF1', color: 'white',
          border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 700, cursor: 'pointer',
        }}>
          Entrar →
        </button>
      </form>
    </div>
  )
}

/* ── Lead card ── */
function LeadCard({ lead, onClick }) {
  const daysAgo = Math.floor((Date.now() - new Date(lead.created_at).getTime()) / 86400000)

  return (
    <div
      onClick={onClick}
      style={{
        background: 'white', borderRadius: '14px', padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer',
        border: '1.5px solid #f0f4f8', marginBottom: '10px',
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(33,127,241,0.14)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#111' }}>{lead.nome || '—'}</div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{[lead.clinica, lead.tipo].filter(Boolean).join(' · ') || '—'}</div>
        </div>
        <span style={{ fontSize: '11px', color: '#ccc', whiteSpace: 'nowrap', marginLeft: '8px' }}>
          {daysAgo === 0 ? 'hoje' : `${daysAgo}d atrás`}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {lead.faturacao && (
          <span style={{ padding: '3px 9px', background: '#F3F6FB', borderRadius: '6px', fontSize: '11px', color: '#217FF1', fontWeight: 600 }}>
            {lead.faturacao}
          </span>
        )}
        {lead.consultas && (
          <span style={{ padding: '3px 9px', background: '#F3F6FB', borderRadius: '6px', fontSize: '11px', color: '#555', fontWeight: 500 }}>
            {lead.consultas} colaboradores
          </span>
        )}
      </div>
      {lead.meeting_date && (
        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#217FF1', fontWeight: 600 }}>
          <span>📅</span>
          <span>{new Date(lead.meeting_date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      )}
      {lead.notes && (
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#888', lineHeight: 1.4, borderTop: '1px solid #f5f5f5', paddingTop: '8px' }}>
          {lead.notes.slice(0, 70)}{lead.notes.length > 70 ? '…' : ''}
        </div>
      )}
    </div>
  )
}

/* ── Lead detail modal ── */
function LeadDetailModal({ lead, onClose, onUpdate, onDelete }) {
  const [form, setForm] = useState({ ...lead })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const save = () => { onUpdate(form); onClose() }
  const waPre = form.whatsapp ? `https://wa.me/${form.whatsapp.replace(/\D/g, '')}` : null

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, padding: '20px',
      }}
    >
      <div style={{
        background: 'white', borderRadius: '24px',
        width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', padding: '32px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
              {lead.nome || 'Lead sem nome'}
            </h3>
            <p style={{ color: '#888', fontSize: '13px' }}>
              {[lead.clinica, lead.tipo, lead.faturacao].filter(Boolean).join(' · ') || 'Sem empresa registada'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a href={`/crm/diagnostico?lead=${lead.id}`} style={{
              padding: '8px 14px', background: '#217FF1', color: 'white',
              borderRadius: '10px', fontSize: '13px', fontWeight: 700, textDecoration: 'none',
            }}>
              🎯 Iniciar Diagnóstico
            </a>
            {waPre && (
              <a href={waPre} target="_blank" rel="noreferrer" style={{
                padding: '8px 14px', background: '#25D366', color: 'white',
                borderRadius: '10px', fontSize: '13px', fontWeight: 700, textDecoration: 'none',
              }}>
                💬 WhatsApp
              </a>
            )}
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#bbb' }}>✕</button>
          </div>
        </div>

        {/* Stage pills */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
            Fase do funil
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {STAGES.map(s => (
              <button
                key={s.id}
                onClick={() => set('stage', s.id)}
                style={{
                  padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 700,
                  cursor: 'pointer', border: `1.5px solid ${form.stage === s.id ? s.color : '#e8edf5'}`,
                  background: form.stage === s.id ? s.bg : 'white',
                  color: form.stage === s.id ? s.color : '#aaa',
                  transition: 'all 0.12s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <Field label="Nome" value={form.nome} onChange={v => set('nome', v)} />
          <Field label="WhatsApp" value={form.whatsapp} onChange={v => set('whatsapp', v)} type="tel" />
          <Field label="Email" value={form.email} onChange={v => set('email', v)} type="email" />
          <Field label="Empresa" value={form.clinica} onChange={v => set('clinica', v)} />
          <SelectField label="Sector" value={form.tipo} onChange={v => set('tipo', v)} options={SECTORS} />
          <Field label="Nº de colaboradores" value={form.consultas} onChange={v => set('consultas', v)} placeholder="Ex: 10-30" />
          <Field label="Faturação anual" value={form.faturacao} onChange={v => set('faturacao', v)} placeholder="Ex: €500k–1M" />
          <Field label="Principal dor / problema" value={form.dor} onChange={v => set('dor', v)} placeholder="Ex: follow-ups manuais" />
        </div>

        {/* Meeting */}
        <div style={{ background: '#F3F6FB', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#217FF1', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
            📅 Reunião
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <Field label="Data e hora" value={form.meeting_date ? form.meeting_date.slice(0, 16) : ''} onChange={v => set('meeting_date', v)} type="datetime-local" />
            <Field label="Link (Zoom/Meet)" value={form.meeting_link} onChange={v => set('meeting_link', v)} type="url" placeholder="https://…" />
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href={CALENDLY_BASE} target="_blank" rel="noreferrer" style={{
              padding: '8px 16px', background: '#217FF1', color: 'white',
              borderRadius: '10px', fontSize: '13px', fontWeight: 700, textDecoration: 'none',
            }}>
              Enviar link Calendly →
            </a>
            {form.meeting_link && (
              <a href={form.meeting_link} target="_blank" rel="noreferrer" style={{
                padding: '8px 16px', background: 'white', color: '#217FF1',
                border: '1.5px solid #217FF1', borderRadius: '10px',
                fontSize: '13px', fontWeight: 700, textDecoration: 'none',
              }}>
                Entrar na reunião →
              </a>
            )}
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
            Notas e próximos passos
          </label>
          <textarea
            value={form.notes || ''}
            onChange={e => set('notes', e.target.value)}
            placeholder="Notas da reunião, objeções, próximos passos…"
            rows={4}
            style={{
              width: '100%', padding: '12px 14px', border: '1.5px solid #e8edf5',
              borderRadius: '12px', fontSize: '14px', resize: 'vertical',
              boxSizing: 'border-box', outline: 'none', color: '#111', lineHeight: 1.6,
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </div>

        <p style={{ fontSize: '11px', color: '#ccc', marginBottom: '16px' }}>
          Criado: {new Date(lead.created_at).toLocaleString('pt-PT')}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => { if (window.confirm('Eliminar esta lead?')) { onDelete(lead.id); onClose() } }}
            style={{
              padding: '12px 20px', background: 'white', color: '#ef4444',
              border: '1.5px solid #fee2e2', borderRadius: '12px',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Eliminar
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onClose} style={{
              padding: '12px 20px', background: '#F3F6FB', color: '#555',
              border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            }}>
              Cancelar
            </button>
            <button onClick={save} style={{
              padding: '12px 28px', background: '#217FF1', color: 'white',
              border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
            }}>
              Guardar →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Add lead manually ── */
function AddLeadModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ ...EMPTY_LEAD })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const save = async (e) => {
    e.preventDefault()
    await onAdd(form)
    onClose()
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, padding: '20px',
      }}
    >
      <form onSubmit={save} style={{
        background: 'white', borderRadius: '24px',
        width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '32px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#111' }}>
            Adicionar Lead Manualmente
          </h3>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#bbb' }}>✕</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <Field label="Nome *" value={form.nome} onChange={v => set('nome', v)} required />
          <Field label="WhatsApp *" value={form.whatsapp} onChange={v => set('whatsapp', v)} type="tel" required />
          <Field label="Email" value={form.email} onChange={v => set('email', v)} type="email" />
          <Field label="Empresa" value={form.clinica} onChange={v => set('clinica', v)} />
          <SelectField label="Sector" value={form.tipo} onChange={v => set('tipo', v)} options={SECTORS} />
          <Field label="Faturação anual" value={form.faturacao} onChange={v => set('faturacao', v)} placeholder="Ex: €500k–1M" />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
            Fase
          </label>
          <select
            value={form.stage}
            onChange={e => set('stage', e.target.value)}
            style={{
              width: '100%', padding: '10px 13px', border: '1.5px solid #e8edf5',
              borderRadius: '10px', fontSize: '14px', outline: 'none', cursor: 'pointer',
            }}
          >
            {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <button type="submit" style={{
          width: '100%', padding: '14px', background: '#217FF1', color: 'white',
          border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
        }}>
          Adicionar Lead →
        </button>
      </form>
    </div>
  )
}

/* ── Main CRM ── */
export default function CrmPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('crm_auth') === '1')
  const [tab, setTab] = useState('pipeline')
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [stageFilter, setStageFilter] = useState('all')
  const [search, setSearch] = useState('')

  const auth = () => { sessionStorage.setItem('crm_auth', '1'); setAuthed(true) }

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    setLeads(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authed) fetchLeads()
  }, [authed, fetchLeads])

  const addLead = async (form) => {
    const { data } = await supabase.from('leads').insert(form).select().single()
    if (data) setLeads(ls => [data, ...ls])
  }

  const updateLead = async (updated) => {
    const { meeting_date, ...rest } = updated
    const patch = {
      ...rest,
      meeting_date: meeting_date || null,
    }
    await supabase.from('leads').update(patch).eq('id', updated.id)
    setLeads(ls => ls.map(l => l.id === updated.id ? { ...l, ...patch } : l))
  }

  const deleteLead = async (id) => {
    await supabase.from('leads').delete().eq('id', id)
    setLeads(ls => ls.filter(l => l.id !== id))
  }

  if (!authed) return <PasswordGate onAuth={auth} />

  const filtered = leads
    .filter(l => stageFilter === 'all' || l.stage === stageFilter)
    .filter(l => {
      if (!search) return true
      const q = search.toLowerCase()
      return (l.nome + l.clinica + l.tipo + l.whatsapp + l.email).toLowerCase().includes(q)
    })

  const statsPerStage = STAGES.map(s => ({ ...s, count: leads.filter(l => l.stage === s.id).length }))
  const visibleStages = stageFilter === 'all' ? STAGES : STAGES.filter(s => s.id === stageFilter)

  return (
    <div style={{ minHeight: '100vh', background: '#F3F6FB', fontFamily: 'Inter, sans-serif' }}>

      {/* Top header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e8edf5' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '18px', color: '#217FF1' }}>Reminder</span>
              <span style={{ fontSize: '13px', color: '#bbb' }}>/ CRM</span>
            </div>
            {/* Tab switcher */}
            <div style={{ display: 'flex', gap: '2px', background: '#F3F6FB', borderRadius: '10px', padding: '3px' }}>
              {[
                { id: 'pipeline', label: 'Pipeline' },
                { id: 'delivery', label: 'Delivery' },
                { id: 'outbound', label: 'Outbound' },
                { id: 'kpis', label: 'KPIs Semanais' },
                { id: 'coach', label: '✦ Coach IA' },
                { id: 'discovery', label: 'Discovery' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    fontSize: '13px', fontWeight: 700,
                    background: tab === t.id ? 'white' : 'transparent',
                    color: tab === t.id ? '#111' : '#999',
                    boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.12s',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          {tab === 'pipeline' && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Pesquisar lead…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: '8px 14px', border: '1.5px solid #e8edf5', borderRadius: '10px',
                  fontSize: '14px', outline: 'none', width: '200px',
                }}
              />
              <button
                onClick={fetchLeads}
                style={{
                  padding: '8px 14px', background: '#F3F6FB', color: '#555',
                  border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                }}
              >
                ↻ Atualizar
              </button>
              <button
                onClick={() => setShowAdd(true)}
                style={{
                  padding: '8px 18px', background: '#217FF1', color: 'white',
                  border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                + Nova Lead
              </button>
            </div>
          )}
        </div>
      </div>

      {/* KPIs tab */}
      {tab === 'kpis' && <KpiView />}

      {/* Delivery tab */}
      {tab === 'delivery' && <DeliveryView />}

      {/* Outbound tab */}
      {tab === 'outbound' && <OutboundView onLeadCreated={lead => setLeads(ls => [lead, ...ls])} />}

      {/* Coach tab */}
      {tab === 'coach' && <CoachView leads={leads} />}

      {/* Discovery tab */}
      {tab === 'discovery' && <DiscoveryView leads={leads} />}

      {/* Pipeline tab content */}
      {tab === 'pipeline' && <>

      {/* Stats / filter bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #e8edf5', overflowX: 'auto' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '0', alignItems: 'stretch' }}>
          <button
            onClick={() => setStageFilter('all')}
            style={{
              padding: '16px 20px', border: 'none', background: 'none', cursor: 'pointer',
              borderBottom: stageFilter === 'all' ? '2px solid #111' : '2px solid transparent',
              display: 'flex', flexDirection: 'column', gap: '2px', whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#111' }}>{leads.length}</span>
            <span style={{ fontSize: '11px', color: '#888' }}>Todas</span>
          </button>
          {statsPerStage.map(s => (
            <button
              key={s.id}
              onClick={() => setStageFilter(stageFilter === s.id ? 'all' : s.id)}
              style={{
                padding: '16px 20px', border: 'none', background: 'none', cursor: 'pointer',
                borderBottom: stageFilter === s.id ? `2px solid ${s.color}` : '2px solid transparent',
                display: 'flex', flexDirection: 'column', gap: '2px', whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '20px', fontWeight: 700, color: stageFilter === s.id ? s.color : '#111' }}>
                {s.count}
              </span>
              <span style={{ fontSize: '11px', color: '#888' }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>A carregar leads…</div>
      )}

      {/* Kanban board */}
      {!loading && (
        <div style={{ padding: '24px', overflowX: 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: stageFilter === 'all' ? 'repeat(6, minmax(250px, 1fr))' : '1fr',
            gap: '16px',
            minWidth: stageFilter === 'all' ? '1500px' : undefined,
          }}>
            {visibleStages.map(stage => {
              const stageLeads = filtered.filter(l => l.stage === stage.id)
              return (
                <div key={stage.id}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', background: stage.bg, borderRadius: '12px', marginBottom: '12px',
                  }}>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: stage.color }}>{stage.label}</span>
                    <span style={{
                      background: stage.color, color: 'white',
                      borderRadius: '100px', padding: '2px 9px', fontSize: '11px', fontWeight: 700,
                    }}>
                      {stageLeads.length}
                    </span>
                  </div>
                  {stageLeads.length === 0 && (
                    <div style={{
                      padding: '28px 16px', textAlign: 'center',
                      border: '1.5px dashed #e0e7f0', borderRadius: '12px',
                      fontSize: '13px', color: '#ccc',
                    }}>
                      Sem leads
                    </div>
                  )}
                  {stageLeads.map(lead => (
                    <LeadCard key={lead.id} lead={lead} onClick={() => setSelected(lead)} />
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && leads.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
            Nenhuma lead ainda
          </h3>
          <p style={{ color: '#888', fontSize: '15px', marginBottom: '24px' }}>
            As leads do formulário aparecem aqui automaticamente.
          </p>
          <button onClick={() => setShowAdd(true)} style={{
            padding: '14px 28px', background: '#217FF1', color: 'white',
            border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
          }}>
            + Adicionar primeira lead
          </button>
        </div>
      )}

      {/* End pipeline tab */}
      </>}

      {/* Modals */}
      {selected && (
        <LeadDetailModal
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdate={updated => { updateLead(updated); setSelected(null) }}
          onDelete={deleteLead}
        />
      )}
      {showAdd && (
        <AddLeadModal onClose={() => setShowAdd(false)} onAdd={addLead} />
      )}
    </div>
  )
}
