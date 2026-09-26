import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const DAY_NAMES = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

function daysSince(dateStr) {
  if (!dateStr) return 9999
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
}

function fmtDate(isoStr) {
  if (!isoStr) return null
  return new Date(isoStr).toLocaleString('pt-PT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function computeAlerts(leads, deliveries, callsToday, prospectsCount) {
  const alerts = []
  const now = new Date()

  for (const lead of leads) {
    const days = daysSince(lead.updated_at)
    if (lead.stage === 'nova' && days > 2) {
      alerts.push({ level: 'red', text: `Contactar ${lead.nome || 'lead sem nome'} — nova há ${days}d` })
    } else if (lead.stage === 'contactar' && days > 3) {
      alerts.push({ level: 'red', text: `Follow-up urgente: ${lead.nome || '—'} (${days}d sem acção)` })
    } else if (lead.stage === 'reuniao' && lead.meeting_date && new Date(lead.meeting_date) < now) {
      alerts.push({ level: 'red', text: `Reunião passou — actualizar stage: ${lead.nome || '—'}` })
    } else if (lead.stage === 'proposta' && days > 7) {
      alerts.push({ level: 'orange', text: `Follow-up proposta: ${lead.nome || '—'} (${days}d sem resposta)` })
    }
  }

  for (const d of deliveries) {
    const days = daysSince(d.updated_at || d.created_at)
    if (days > 7 && d.lead_nome) {
      alerts.push({ level: 'orange', text: `Sem update: ${d.lead_nome} (${days}d — fase ${d.phase || '?'})` })
    }
  }

  if (callsToday === 0) {
    alerts.push({ level: 'yellow', text: 'Ainda sem chamadas hoje' })
  }

  if (prospectsCount > 5) {
    alerts.push({ level: 'yellow', text: `Tens ${prospectsCount} prospects por contactar` })
  }

  const order = { red: 0, orange: 1, yellow: 2 }
  return alerts.sort((a, b) => order[a.level] - order[b.level])
}

const LEVEL_STYLES = {
  red:    { bg: '#fef2f2', border: '#fca5a5', dot: '#ef4444', text: '#991b1b' },
  orange: { bg: '#fffbeb', border: '#fcd34d', dot: '#f59e0b', text: '#92400e' },
  yellow: { bg: '#fefce8', border: '#fde68a', dot: '#eab308', text: '#713f12' },
}

const CHAT_SUGGESTIONS = [
  'O que dizer a uma lead em silêncio há 5 dias?',
  'Como fechar uma proposta de €5.000?',
  'Script para qualificar uma nova lead por WhatsApp',
  'Como responder a "não temos orçamento agora"?',
]

export default function CoachView({ leads = [] }) {
  const [deliveries, setDeliveries] = useState([])
  const [callsToday, setCallsToday] = useState(null)
  const [prospectsCount, setProspectsCount] = useState(0)
  const [weeklyKpi, setWeeklyKpi] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)

  // Briefing
  const [briefingResult, setBriefingResult] = useState(null)
  const [briefingAt, setBriefingAt] = useState(null)
  const [briefingLoading, setBriefingLoading] = useState(false)

  // Chat
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef(null)

  // Weekly
  const [weeklyResult, setWeeklyResult] = useState(null)
  const [weeklyAt, setWeeklyAt] = useState(null)
  const [weeklyLoading, setWeeklyLoading] = useState(false)

  useEffect(() => { fetchAll() }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  async function fetchAll() {
    setDataLoading(true)
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const [deliveriesRes, callsRes, prospectsRes, kpisRes, chatRes, briefingRes, weeklyRes] = await Promise.all([
      supabase.from('deliveries').select('id, lead_id, phase, updated_at, created_at'),
      supabase.from('call_logs').select('id', { count: 'exact', head: true }).gte('called_at', todayStart.toISOString()),
      supabase.from('outbound_prospects').select('id', { count: 'exact', head: true }).eq('status', 'por_contactar'),
      supabase.from('weekly_kpis').select('*').order('week_start', { ascending: false }).limit(1),
      supabase.from('coach_messages').select('role, content, created_at').eq('section', 'chat').order('created_at', { ascending: true }),
      supabase.from('coach_messages').select('content, created_at').eq('section', 'briefing').eq('role', 'assistant').order('created_at', { ascending: false }).limit(1).maybeSingle(),
      supabase.from('coach_messages').select('content, created_at').eq('section', 'weekly').eq('role', 'assistant').order('created_at', { ascending: false }).limit(1).maybeSingle(),
    ])

    // Enrich deliveries
    const rawDeliveries = deliveriesRes.data || []
    setDeliveries(rawDeliveries.map(d => ({ ...d, lead_nome: leads.find(l => l.id === d.lead_id)?.nome || null })))

    setCallsToday(callsRes.count ?? 0)
    setProspectsCount(prospectsRes.count ?? 0)
    setWeeklyKpi(kpisRes.data?.[0] || null)

    // Restore chat
    if (chatRes.data?.length) {
      setChatMessages(chatRes.data.map(m => ({ role: m.role, content: m.content })))
    }

    // Restore last briefing
    if (briefingRes.data) {
      setBriefingResult(briefingRes.data.content)
      setBriefingAt(briefingRes.data.created_at)
    }

    // Restore last weekly
    if (weeklyRes.data) {
      setWeeklyResult(weeklyRes.data.content)
      setWeeklyAt(weeklyRes.data.created_at)
    }

    setDataLoading(false)
  }

  function buildContext() {
    const now = new Date()
    const pipeline = {}
    for (const stage of ['nova', 'contactar', 'reuniao', 'proposta', 'cliente', 'perdida']) {
      pipeline[stage] = leads.filter(l => l.stage === stage).length
    }
    const stagnantLeads = leads
      .filter(l => {
        const days = daysSince(l.updated_at)
        if (l.stage === 'nova' && days > 2) return true
        if (l.stage === 'contactar' && days > 3) return true
        if (l.stage === 'proposta' && days > 7) return true
        if (l.stage === 'reuniao' && l.meeting_date && new Date(l.meeting_date) < now) return true
        return false
      })
      .map(l => ({ nome: l.nome, stage: l.stage, daysStuck: daysSince(l.updated_at), whatsapp: l.whatsapp }))

    const deliveryAlerts = deliveries
      .filter(d => daysSince(d.updated_at || d.created_at) > 7 && d.lead_nome)
      .map(d => ({ nome: d.lead_nome, phase: d.phase, daysSinceUpdate: daysSince(d.updated_at || d.created_at) }))

    return {
      date: now.toISOString().slice(0, 10),
      dayOfWeek: DAY_NAMES[now.getDay()],
      pipeline,
      stagnantLeads,
      activeClients: pipeline.cliente || 0,
      deliveryAlerts,
      outboundWeek: { calls: callsToday ?? 0, prospects: prospectsCount },
      kpis: {
        mrr: weeklyKpi?.mrr || 0,
        closes: weeklyKpi?.closes || 0,
        prospects: weeklyKpi?.prospects || 0,
        mrrTarget: 10000,
      },
    }
  }

  async function callCoach(payload) {
    const res = await fetch('/api/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Erro desconhecido')
    return data.content
  }

  async function saveMessage(role, content, section) {
    await supabase.from('coach_messages').insert({ role, content, section })
  }

  async function handleBriefing() {
    setBriefingLoading(true)
    try {
      const content = await callCoach({ type: 'briefing', context: buildContext() })
      setBriefingResult(content)
      const now = new Date().toISOString()
      setBriefingAt(now)
      await saveMessage('assistant', content, 'briefing')
    } catch (err) {
      setBriefingResult(`Erro: ${err.message}`)
    }
    setBriefingLoading(false)
  }

  async function handleChat(text) {
    if (!text.trim() || chatLoading) return
    const userMsg = { role: 'user', content: text.trim() }
    const updated = [...chatMessages, userMsg]
    setChatMessages(updated)
    setChatInput('')
    setChatLoading(true)

    // Save user message to DB (fire and forget)
    saveMessage('user', text.trim(), 'chat')

    try {
      const content = await callCoach({ type: 'chat', messages: updated, context: buildContext() })
      setChatMessages(prev => [...prev, { role: 'assistant', content }])
      saveMessage('assistant', content, 'chat')
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: `Erro: ${err.message}` }])
    }
    setChatLoading(false)
  }

  async function handleClearChat() {
    if (!window.confirm('Limpar toda a conversa com o coach?')) return
    await supabase.from('coach_messages').delete().eq('section', 'chat')
    setChatMessages([])
  }

  async function handleWeekly() {
    setWeeklyLoading(true)
    try {
      const content = await callCoach({ type: 'weekly', context: buildContext() })
      setWeeklyResult(content)
      const now = new Date().toISOString()
      setWeeklyAt(now)
      await saveMessage('assistant', content, 'weekly')
    } catch (err) {
      setWeeklyResult(`Erro: ${err.message}`)
    }
    setWeeklyLoading(false)
  }

  const alerts = computeAlerts(leads, deliveries, callsToday ?? 0, prospectsCount)

  /* ── Styles ── */
  const card = {
    background: 'white', borderRadius: '20px', padding: '28px 32px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1.5px solid #f0f4f8',
    marginBottom: '20px',
  }
  const sectionTitle = {
    fontFamily: 'Sora, sans-serif', fontSize: '17px', fontWeight: 700,
    color: '#111', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px',
  }
  const btn = (variant = 'primary', disabled = false) => ({
    padding: '10px 22px', borderRadius: '10px', border: 'none', cursor: disabled ? 'default' : 'pointer',
    fontSize: '13px', fontWeight: 700, transition: 'opacity 0.15s',
    opacity: disabled ? 0.6 : 1,
    ...(variant === 'primary'
      ? { background: '#217FF1', color: 'white' }
      : { background: '#F3F6FB', color: '#555', border: '1.5px solid #e8edf5' }),
  })

  const lastGenBadge = (isoStr) => isoStr ? (
    <span style={{
      marginLeft: 'auto', fontSize: '12px', fontWeight: 500, color: '#888',
      background: '#F3F6FB', padding: '4px 12px', borderRadius: '100px', flexShrink: 0,
    }}>
      Guardado: {fmtDate(isoStr)}
    </span>
  ) : null

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '28px 24px' }}>

      {/* ── A) BRIEFING DIÁRIO ── */}
      <div style={card}>
        <div style={sectionTitle}>
          <span style={{ fontSize: '22px' }}>⚡</span>
          Briefing Diário
          {briefingAt
            ? lastGenBadge(briefingAt)
            : (
              <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 500, color: '#888', background: '#F3F6FB', padding: '4px 12px', borderRadius: '100px' }}>
                {new Date().toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            )
          }
        </div>

        {/* Alerts */}
        {dataLoading ? (
          <div style={{ padding: '20px 0', color: '#aaa', fontSize: '14px' }}>A carregar dados…</div>
        ) : alerts.length === 0 ? (
          <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '12px', border: '1.5px solid #bbf7d0', color: '#15803d', fontSize: '14px', fontWeight: 600 }}>
            Sem alertas críticos. Pipeline em ordem.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {alerts.map((alert, i) => {
              const s = LEVEL_STYLES[alert.level]
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '10px', background: s.bg, border: `1.5px solid ${s.border}` }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: s.text }}>{alert.text}</span>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={handleBriefing} disabled={briefingLoading || dataLoading} style={btn('primary', briefingLoading || dataLoading)}>
            {briefingLoading ? 'A gerar…' : '✦ Gerar análise IA'}
          </button>
          {!dataLoading && (
            <span style={{ fontSize: '12px', color: '#bbb' }}>
              {alerts.length} alerta{alerts.length !== 1 ? 's' : ''} · {leads.filter(l => l.stage === 'cliente').length} clientes · MRR €{weeklyKpi?.mrr || 0}
            </span>
          )}
        </div>

        {briefingResult && (
          <div style={{ marginTop: '20px', padding: '20px 24px', background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)', borderRadius: '14px', border: '1.5px solid #bfdbfe' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#217FF1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              Análise do Coach
            </div>
            <pre style={{ fontSize: '13px', color: '#1e3a5f', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif', margin: 0 }}>
              {briefingResult}
            </pre>
          </div>
        )}
      </div>

      {/* ── B) CHAT COM COACH ── */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={sectionTitle}>
            <span style={{ fontSize: '22px' }}>💬</span>
            Chat com Coach
            {chatMessages.length > 0 && (
              <span style={{ fontSize: '12px', color: '#bbb', fontWeight: 500 }}>
                {chatMessages.length} mensagem{chatMessages.length !== 1 ? 's' : ''} guardadas
              </span>
            )}
          </div>
          {chatMessages.length > 0 && (
            <button onClick={handleClearChat} style={{ ...btn('secondary'), padding: '6px 14px', fontSize: '12px', marginTop: '2px' }}>
              Limpar conversa
            </button>
          )}
        </div>

        {/* Suggestions — only when empty */}
        {chatMessages.length === 0 && !dataLoading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {CHAT_SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => handleChat(s)}
                style={{ padding: '8px 14px', background: '#F3F6FB', border: '1.5px solid #e8edf5', borderRadius: '100px', fontSize: '12px', color: '#555', cursor: 'pointer', fontWeight: 500, transition: 'all 0.12s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.borderColor = '#93c5fd' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F3F6FB'; e.currentTarget.style.borderColor = '#e8edf5' }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        {chatMessages.length > 0 && (
          <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px', padding: '4px 0' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '75%', padding: '12px 16px', borderRadius: '14px', fontSize: '13px', lineHeight: 1.7,
                  ...(msg.role === 'user'
                    ? { background: '#217FF1', color: 'white', borderBottomRightRadius: '4px' }
                    : { background: '#F3F6FB', color: '#1e293b', borderBottomLeftRadius: '4px', whiteSpace: 'pre-wrap' }),
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '12px 18px', background: '#F3F6FB', borderRadius: '14px', borderBottomLeftRadius: '4px', color: '#aaa', fontSize: '13px' }}>
                  A pensar…
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Input */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleChat(chatInput)}
            placeholder="Pergunta ao coach… (Enter para enviar)"
            disabled={chatLoading}
            style={{ flex: 1, padding: '12px 16px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '14px', outline: 'none', color: '#111', background: 'white' }}
            onFocus={e => e.target.style.borderColor = '#217FF1'}
            onBlur={e => e.target.style.borderColor = '#e8edf5'}
          />
          <button onClick={() => handleChat(chatInput)} disabled={!chatInput.trim() || chatLoading} style={btn('primary', !chatInput.trim() || chatLoading)}>
            Enviar →
          </button>
        </div>
      </div>

      {/* ── C) ANÁLISE SEMANAL ── */}
      <div style={card}>
        <div style={sectionTitle}>
          <span style={{ fontSize: '22px' }}>📊</span>
          Análise Semanal
          {lastGenBadge(weeklyAt)}
        </div>

        <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px', lineHeight: 1.6 }}>
          Análise do pipeline, outbound e delivery desta semana — o que correu bem, o que melhorar e o foco para a próxima.
        </p>

        <button onClick={handleWeekly} disabled={weeklyLoading} style={btn('primary', weeklyLoading)}>
          {weeklyLoading ? 'A gerar…' : '✦ Gerar análise da semana'}
        </button>

        {weeklyResult && (
          <div style={{ marginTop: '20px', padding: '24px', background: 'linear-gradient(135deg, #f8faff 0%, #f0f9ff 100%)', borderRadius: '14px', border: '1.5px solid #c7d9f8' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#217FF1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Análise Semanal — Coach IA
            </div>
            <pre style={{ fontSize: '13px', color: '#1e3a5f', lineHeight: 1.9, whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif', margin: 0 }}>
              {weeklyResult}
            </pre>
          </div>
        )}
      </div>

    </div>
  )
}
