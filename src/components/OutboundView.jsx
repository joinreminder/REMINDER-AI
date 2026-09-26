import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

/* ── Constants ── */

// Etapas do Client Acquisition System (IDs compatíveis com a BD existente)
const PROSPECT_STATUSES = [
  { id: 'por_contactar', label: 'Target Identificado', color: '#6b7280', bg: '#f9fafb' },
  { id: 'contactado',    label: 'Outreach Enviado',    color: '#f59e0b', bg: '#fffbeb' },
  { id: 'interessado',   label: 'Respondeu — Interessado', color: '#10b981', bg: '#ecfdf5' },
  { id: 'audit_marcado', label: 'Audit Marcado',       color: '#217FF1', bg: '#eff6ff' },
  { id: 'nao_adequado',  label: 'Não Adequado',        color: '#ef4444', bg: '#fef2f2' },
]

const CALL_RESULTS = [
  { id: 'sem_resposta',       label: 'Sem Resposta',        color: '#9ca3af' },
  { id: 'interessado',        label: 'Interessado',          color: '#10b981' },
  { id: 'nao_interessado',    label: 'Não Interessado',      color: '#ef4444' },
  { id: 'voltar_mais_tarde',  label: 'Voltar Mais Tarde',    color: '#f59e0b' },
  { id: 'marcou_reuniao',     label: 'Audit Marcado',        color: '#217FF1' },
]

const SOURCES = ['linkedin', 'cold-email', 'referencia', 'evento', 'outro']

// Triggers de compra — sinais de pressão operacional
const TRIGGERS = [
  'A contratar pessoal',
  'Em expansão / nova localização',
  'Lançou novo serviço/produto',
  'Crescimento da equipa comercial',
  'Usa múltiplas ferramentas desconectadas',
  'Volume de operação a crescer',
  'Mencionou dificuldades operacionais',
  'Rebranding / mudança de fase',
  'Outro',
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

const DEFAULT_SCRIPT = {
  abertura: `OBJECTIVO: marcar o AI Growth Audit. NÃO vender o serviço.

Abrir com o trigger (o sinal que identificaste):

"Olá [Nome], bom dia. Sou [Seu Nome] da Reminder AI.
Vi que a [Empresa] está a [trigger — ex: contratar para a equipa comercial / abrir nova localização].
Normalmente, quando uma empresa chega a esse ponto, começam a aparecer processos que consomem demasiado tempo da equipa.
É precisamente nessa parte que trabalhamos. Posso mostrar-te em 15 minutos onde normalmente encontramos essas oportunidades?"

→ Se sim → qualificação rápida → marcar Audit
→ Se "não tenho tempo" → "Sem problema. Quando é melhor — amanhã de manhã ou na quinta?"
→ Regra: nunca explicar o serviço. A pergunta é sempre "faz sentido conversar?"`,

  qualificacao: `Objectivo: confirmar fit rápido. 3 perguntas, ouve mais do que falas.

1. OPERAÇÃO:
"Como é que a equipa gere hoje os [processos chave — ex: leads, relatórios, follow-ups]? Tudo manual ou já têm algum sistema?"

2. DOR:
"Se tivessem de me dizer onde perdem mais tempo numa semana — o que seria?"

3. IMPACTO:
"E se conseguissem recuperar esse tempo — quanto representaria isso para a empresa?"

→ Não tentares resolver o problema aqui. Guardar para o Audit.
→ Se fit confirmado: "Faz sentido fazermos um Audit de 30 minutos onde mapeamos isso com detalhe. É gratuito. Quando tens disponibilidade esta semana?"`,

  discovery: `Usado no AI Growth Audit. Objectivo: descobrir o Dream Outcome real.

SITUAÇÃO (entender o estado actual):
"Como funciona o vosso processo de [X], do início ao fim?"
"Quem está envolvido? Quanto tempo leva por semana, estimando?"

PROBLEMA (quantificar a dor):
"O que está a impedir de crescer mais rápido neste momento?"
"Quanto está a custar esse problema — em tempo, em dinheiro, em oportunidades que escapam?"

IMPLICAÇÃO (tornar a dor urgente):
"Se nada mudar nos próximos 6 meses, o que acontece?"
"Já tentaram resolver isto antes? O que correu mal?"

DREAM OUTCOME (o que querem mesmo):
"Se conseguíssemos resolver isto completamente, o que mudaria para a empresa?"
"Quanto vale isso para si — concretamente?"

MICRO-CONFIRMAÇÃO (antes de propor):
"Com base no que me disse, vejo aqui oportunidades claras. Se fizer sentido no final deste Audit, vemos juntos como implementar — faz sentido?" → espera o SIM.`,

  objecoes: `"Já temos um CRM / software"
→ "Óptimo — o nosso trabalho é complementar o que têm, não substituir. Analisamos onde o CRM não chega e onde há tarefas manuais entre ferramentas."

"Não temos orçamento agora"
→ "Faz sentido. É exactamente por isso que começamos com um Audit gratuito — percebemos o que faz sentido antes de qualquer investimento."

"Já tentámos automação e não funcionou"
→ "É o que ouvimos com frequência. Na maioria dos casos foi implementação genérica sem diagnóstico. O nosso processo começa exactamente por aí — a analisar o vosso caso específico."

"Quanto custa?"
→ "Depende do que encontramos no Audit. Mas o Audit em si é gratuito. Faz sentido começar por aí antes de falarmos de investimento?"

"Manda informação por email"
→ "Claro, envio. Mas antes de enviar algo genérico — duas perguntas rápidas para enviar algo relevante para o vosso caso específico?"`,

  fecho: `OBJECTIVO: marcar o próximo passo, não fechar o contrato.

Fechar o Audit:
"Com base no que me disse, faz sentido fazermos um Audit de 30 minutos — gratuito, sem compromisso — onde mapeamos exactamente onde a [Empresa] está a perder capacidade.
Tenho quinta às 10h ou sexta às 15h — qual funciona melhor?"

Micro-confirmação na Discovery:
"Se no final do Audit percebermos que existe uma oportunidade clara, existe alguma razão para não avançarmos?"
→ Não é pressão. É confirmar fit antes de propor.

Fechar a proposta:
"A proposta reflecte exactamente o que falámos — problema, impacto, solução. Se a solução fizer sentido e o investimento estiver dentro do razoável, existe alguma razão para não avançarmos agora?"

→ Confirma nome + email para enviar convite.
→ Se hesitar: "Não há compromisso no Audit — se não fizer sentido, não avançamos."`,
}

const DEFAULT_TEMPLATES = [
  {
    id: '1', titulo: 'LinkedIn — Pedido de conexão (trigger)', canal: 'linkedin',
    corpo: `Olá [Nome],

Vi que a [Empresa] está a [trigger — ex: crescer a equipa / abrir nova localização].

Trabalho com empresas nessa fase a identificar onde os processos manuais começam a travar o crescimento — e a automatizá-los com IA.

Fazia sentido conectar.`,
  },
  {
    id: '2', titulo: 'LinkedIn — Após conexão aceite', canal: 'linkedin',
    corpo: `Olá [Nome], obrigado por aceitar!

Uma pergunta directa: quando a [Empresa] chegou ao ponto onde está hoje, que processo começou a consumir mais tempo da equipa do que devia?

Pergunto porque é exactamente onde costumamos trabalhar — e temos um Audit gratuito de 30 minutos onde mapeamos isso com detalhe.

Faria sentido?`,
  },
  {
    id: '3', titulo: 'Email — Trigger-based (1º contacto)', canal: 'email',
    corpo: `Assunto: [Empresa] + [trigger curto]

Olá [Nome],

Vi que a [Empresa] está a [trigger — ex: contratar para a equipa comercial].

Quando as empresas chegam a esse ponto, é comum aparecerem processos que consomem demasiado tempo da equipa — follow-ups perdidos, relatórios manuais, dados a entrar à mão.

Na Reminder AI identificamos exactamente onde isso acontece e construímos sistemas que o eliminam.

Em 7 dias entregamos um mapa completo das oportunidades de IA na vossa operação — gratuito, sem compromisso.

Teria 20 minutos esta semana para uma chamada?

[Seu Nome]
Reminder AI`,
  },
  {
    id: '4', titulo: 'Email — Follow-up ruptura', canal: 'email',
    corpo: `Assunto: Re: [Empresa]

Olá [Nome],

Fiz seguimento ao meu email anterior.

Uma questão directa: ainda faz sentido conversarmos, ou o timing não é o ideal de momento?

Não há problema se não for agora — só quero perceber para gerir o meu lado.

[Seu Nome]
Reminder AI`,
  },
  {
    id: '5', titulo: 'Email — Fecho de ciclo', canal: 'email',
    corpo: `Assunto: Fico disponível quando fizer sentido

Olá [Nome],

Tentei contactar algumas vezes sem resposta — vou assumir que o timing não é o ideal.

Arquivo por agora e fico disponível quando fizer sentido revisitar.

Se alguma vez quiserem perceber onde a vossa operação pode ganhar capacidade com IA — estou aqui.

[Seu Nome]
Reminder AI`,
  },
  {
    id: '6', titulo: 'WhatsApp — Trigger-based (1º contacto)', canal: 'whatsapp',
    corpo: `Olá [Nome], bom dia.

Sou [Seu Nome] da Reminder AI. Vi que a [Empresa] está a [trigger].

Normalmente quando uma empresa chega a esse ponto, começam a aparecer processos que consomem demasiado tempo da equipa.

É precisamente nessa parte que trabalhamos. Fazia sentido conversar 15 minutos?`,
  },
  {
    id: '7', titulo: 'WhatsApp — Follow-up após sem resposta', canal: 'whatsapp',
    corpo: `Olá [Nome], é [Seu Nome] da Reminder AI.

Deixei uma mensagem há uns dias.

Uma pergunta directa: qual é o processo mais manual que a equipa da [Empresa] faz todas as semanas?

Se a resposta for "há vários" — é exactamente o que o nosso Audit resolve em 30 minutos. Gratuito.`,
  },
  {
    id: '8', titulo: 'WhatsApp — Confirmação do Audit', canal: 'whatsapp',
    corpo: `Olá [Nome]! Excelente conversa.

Confirmo o nosso AI Growth Audit para [data] às [hora].
Link: [link videochamada]

Para aproveitarmos bem os 30 minutos, seria útil vires a pensar em:
— Onde a equipa perde mais tempo por semana
— O que gostariam de resolver primeiro
— O que já tentaram antes e não funcionou

Qualquer dúvida estou aqui. Até [data]!`,
  },
  {
    id: '9', titulo: 'Email — Pedido de referral (Referral Engine)', canal: 'email',
    corpo: `Assunto: Uma pergunta rápida, [Nome]

Olá [Nome],

Espero que os resultados que estamos a construir juntos estejam a aparecer.

Uma pergunta directa: existe alguém na tua rede — um fundador, director de operações, ou alguém com quem trabalhes — que esteja a crescer e a sentir os mesmos desafios operacionais que tu tinhas?

Não precisa de ser um contacto perfeito — basta que estejas confortável a partilhar o teu nome.

Se sim, posso tratar do resto.

[Seu Nome]
Reminder AI`,
  },
]

/* ── Shared helpers ── */
function Label({ children }) {
  return (
    <div style={{ fontSize: '11px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
      {children}
    </div>
  )
}

function statusMeta(id) {
  return PROSPECT_STATUSES.find(s => s.id === id) || PROSPECT_STATUSES[0]
}

function resultMeta(id) {
  return CALL_RESULTS.find(r => r.id === id) || CALL_RESULTS[0]
}

/* ── Prospect modal (add/edit) ── */
function ProspectModal({ prospect, onClose, onSave }) {
  const empty = { nome: '', empresa: '', sector: '', whatsapp: '', email: '', fonte: 'linkedin', status: 'por_contactar', trigger_reason: '', notes: '' }
  const [form, setForm] = useState(prospect || empty)
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    let result
    if (form.id) {
      result = await supabase.from('outbound_prospects').update(form).eq('id', form.id).select().single()
    } else {
      result = await supabase.from('outbound_prospects').insert(form).select().single()
    }
    setSaving(false)
    if (result.data) { onSave(result.data); onClose() }
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}
    >
      <form onSubmit={save} style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#111' }}>
            {form.id ? 'Editar Prospect' : 'Novo Prospect'}
          </h3>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#bbb' }}>✕</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          {[
            { k: 'nome', label: 'Nome *', req: true },
            { k: 'empresa', label: 'Empresa *', req: true },
            { k: 'whatsapp', label: 'WhatsApp', type: 'tel' },
            { k: 'email', label: 'Email', type: 'email' },
          ].map(f => (
            <div key={f.k}>
              <Label>{f.label}</Label>
              <input
                type={f.type || 'text'}
                value={form[f.k] || ''}
                onChange={e => set(f.k, e.target.value)}
                required={f.req}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          ))}
          <div>
            <Label>Sector</Label>
            <select value={form.sector || ''} onChange={e => set('sector', e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '14px', outline: 'none', cursor: 'pointer', color: form.sector ? '#111' : '#aaa' }}>
              <option value="">Seleccionar sector…</option>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <Label>Trigger identificado</Label>
            <select value={form.trigger_reason || ''} onChange={e => set('trigger_reason', e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '14px', outline: 'none', cursor: 'pointer', color: form.trigger_reason ? '#111' : '#aaa' }}>
              <option value="">Seleccionar trigger…</option>
              {TRIGGERS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <Label>Fonte</Label>
            <select value={form.fonte} onChange={e => set('fonte', e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
              {SOURCES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label>Status</Label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {PROSPECT_STATUSES.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => set('status', s.id)}
                style={{
                  padding: '5px 12px', borderRadius: '100px',
                  border: `1.5px solid ${form.status === s.id ? s.color : '#e8edf5'}`,
                  background: form.status === s.id ? s.bg : 'white',
                  color: form.status === s.id ? s.color : '#aaa',
                  fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Label>Notas</Label>
          <textarea
            value={form.notes || ''}
            onChange={e => set('notes', e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '13px', resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        <button type="submit" disabled={saving} style={{ width: '100%', padding: '13px', background: saving ? '#aaa' : '#217FF1', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'A guardar…' : (form.id ? 'Guardar alterações' : 'Adicionar prospect')}
        </button>
      </form>
    </div>
  )
}

/* ── Prospects tab ── */
function ProspectsTab({ onMoveToPipeline }) {
  const [prospects, setProspects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'new' | prospect obj
  const [statusFilter, setStatusFilter] = useState('all')

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('outbound_prospects').select('*').order('created_at', { ascending: false })
    setProspects(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const handleSave = (saved) => {
    setProspects(ps => {
      const exists = ps.find(p => p.id === saved.id)
      return exists ? ps.map(p => p.id === saved.id ? saved : p) : [saved, ...ps]
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Eliminar este prospect?')) return
    await supabase.from('outbound_prospects').delete().eq('id', id)
    setProspects(ps => ps.filter(p => p.id !== id))
  }

  const moveToPipeline = async (prospect) => {
    if (!window.confirm(`Mover "${prospect.nome}" para o Pipeline como nova lead?`)) return
    const { data } = await supabase.from('leads').insert({
      nome: prospect.nome,
      clinica: prospect.empresa,
      tipo: prospect.sector,
      whatsapp: prospect.whatsapp,
      email: prospect.email,
      stage: 'nova',
      notes: `Vindo do Outbound. Fonte: ${prospect.fonte}. Trigger: ${prospect.trigger_reason || 'n/a'}. ${prospect.notes || ''}`.trim(),
    }).select().single()
    if (data) {
      onMoveToPipeline(data)
      alert(`Lead criada! "${prospect.nome}" está agora no Pipeline.`)
    }
  }

  const filtered = statusFilter === 'all' ? prospects : prospects.filter(p => p.status === statusFilter)

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '4px', background: '#F3F6FB', borderRadius: '10px', padding: '3px' }}>
          <button
            onClick={() => setStatusFilter('all')}
            style={{ padding: '5px 12px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700, background: statusFilter === 'all' ? 'white' : 'transparent', color: statusFilter === 'all' ? '#111' : '#888' }}
          >
            Todos ({prospects.length})
          </button>
          {PROSPECT_STATUSES.map(s => {
            const count = prospects.filter(p => p.status === s.id).length
            return (
              <button
                key={s.id}
                onClick={() => setStatusFilter(s.id)}
                style={{ padding: '5px 12px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700, background: statusFilter === s.id ? 'white' : 'transparent', color: statusFilter === s.id ? s.color : '#888' }}
              >
                {s.label} ({count})
              </button>
            )
          })}
        </div>
        <button
          onClick={() => setModal('new')}
          style={{ marginLeft: 'auto', padding: '8px 16px', background: '#217FF1', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
        >
          + Novo Prospect
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '40px', color: '#aaa' }}>A carregar…</div>}

      {/* Table */}
      {!loading && (
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f4f8', overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#aaa' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
              Sem prospects {statusFilter !== 'all' ? 'com este status' : 'ainda'}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F3F6FB' }}>
                  {['Nome', 'Empresa', 'Trigger', 'Fonte', 'Status', 'Última actividade', ''].map(h => (
                    <th key={h} style={{ padding: '10px 14px', fontSize: '10px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'left', borderBottom: '1px solid #e8edf5', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const s = statusMeta(p.status)
                  return (
                    <tr key={p.id} style={{ background: i % 2 === 0 ? 'white' : '#fafcff' }}>
                      <td style={{ padding: '12px 14px', fontSize: '14px', fontWeight: 700, color: '#111' }}>{p.nome}</td>
                      <td style={{ padding: '12px 14px', fontSize: '13px', color: '#555' }}>{p.empresa || '—'}</td>
                      <td style={{ padding: '12px 14px', fontSize: '12px', color: '#217FF1', fontWeight: 600, maxWidth: '180px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={p.trigger_reason}>
                          {p.trigger_reason || <span style={{ color: '#ccc', fontWeight: 400 }}>sem trigger</span>}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: '12px', color: '#888' }}>{p.fonte}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '100px', background: s.bg, color: s.color, fontSize: '11px', fontWeight: 700 }}>
                          {s.label}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: '12px', color: '#aaa', whiteSpace: 'nowrap' }}>
                        {p.last_contacted_at ? new Date(p.last_contacted_at).toLocaleDateString('pt-PT') : '—'}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => setModal(p)} style={{ padding: '5px 10px', background: '#F3F6FB', border: 'none', borderRadius: '7px', fontSize: '12px', color: '#555', cursor: 'pointer', fontWeight: 600 }}>Editar</button>
                          {(p.status === 'interessado' || p.status === 'audit_marcado') && (
                            <button onClick={() => moveToPipeline(p)} style={{ padding: '5px 10px', background: '#eff6ff', border: 'none', borderRadius: '7px', fontSize: '12px', color: '#217FF1', cursor: 'pointer', fontWeight: 700 }}>→ Pipeline</button>
                          )}
                          <button onClick={() => handleDelete(p.id)} style={{ padding: '5px 10px', background: '#fef2f2', border: 'none', borderRadius: '7px', fontSize: '12px', color: '#ef4444', cursor: 'pointer', fontWeight: 600 }}>×</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {modal && (
        <ProspectModal
          prospect={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

/* ── Call log modal ── */
function CallModal({ prospects, onClose, onSave }) {
  const [form, setForm] = useState({ prospect_id: prospects[0]?.id || '', result: 'sem_resposta', next_step: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const save = async (e) => {
    e.preventDefault()
    if (!form.prospect_id) return
    setSaving(true)
    const { data } = await supabase.from('call_logs').insert({ ...form, called_at: new Date().toISOString() }).select().single()
    if (data) {
      // update last_contacted_at on prospect
      await supabase.from('outbound_prospects').update({ last_contacted_at: new Date().toISOString() }).eq('id', form.prospect_id)
      onSave(data)
      onClose()
    }
    setSaving(false)
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}
    >
      <form onSubmit={save} style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '480px', padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#111' }}>Registar Chamada</h3>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#bbb' }}>✕</button>
        </div>
        <div style={{ marginBottom: '14px' }}>
          <Label>Prospect</Label>
          <select value={form.prospect_id} onChange={e => set('prospect_id', e.target.value)} required style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
            <option value="">Seleccionar…</option>
            {prospects.map(p => <option key={p.id} value={p.id}>{p.nome} — {p.empresa}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: '14px' }}>
          <Label>Resultado</Label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {CALL_RESULTS.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => set('result', r.id)}
                style={{
                  padding: '5px 11px', borderRadius: '100px', border: `1.5px solid ${form.result === r.id ? r.color : '#e8edf5'}`,
                  background: form.result === r.id ? r.color + '22' : 'white',
                  color: form.result === r.id ? r.color : '#aaa',
                  fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '14px' }}>
          <Label>Próximo passo</Label>
          <input
            value={form.next_step}
            onChange={e => set('next_step', e.target.value)}
            placeholder="Ex: Ligar na quinta-feira às 10h"
            style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Label>Notas</Label>
          <textarea
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            rows={3}
            placeholder="O que disse, objecções, tom da conversa…"
            style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e8edf5', borderRadius: '10px', fontSize: '13px', resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        <button type="submit" disabled={saving} style={{ width: '100%', padding: '13px', background: saving ? '#aaa' : '#217FF1', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'A guardar…' : 'Registar chamada'}
        </button>
      </form>
    </div>
  )
}

/* ── Chamadas tab ── */
function ChamadasTab() {
  const [logs, setLogs] = useState([])
  const [prospects, setProspects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetch = useCallback(async () => {
    setLoading(true)
    const [{ data: ls }, { data: ps }] = await Promise.all([
      supabase.from('call_logs').select('*, outbound_prospects(nome, empresa)').order('called_at', { ascending: false }).limit(100),
      supabase.from('outbound_prospects').select('id, nome, empresa').order('nome'),
    ])
    setLogs(ls || [])
    setProspects(ps || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const handleSave = (saved) => {
    setLogs(ls => [saved, ...ls])
  }

  // Stats for this week
  const monday = (() => {
    const d = new Date(); const day = d.getDay()
    d.setDate(d.getDate() - day + (day === 0 ? -6 : 1)); d.setHours(0,0,0,0); return d
  })()
  const thisWeek = logs.filter(l => new Date(l.called_at) >= monday)
  const answered = thisWeek.filter(l => l.result !== 'sem_resposta')
  const meetings = thisWeek.filter(l => l.result === 'marcou_reuniao')

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Chamadas esta semana', value: thisWeek.length, color: '#217FF1' },
          { label: 'Taxa de resposta', value: thisWeek.length ? `${Math.round(answered.length / thisWeek.length * 100)}%` : '—', color: '#10b981' },
          { label: 'Reuniões marcadas', value: meetings.length, color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', borderRadius: '14px', padding: '16px 20px', border: '1px solid #f0f4f8' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '9px 18px', background: '#217FF1', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
        >
          + Registar chamada
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '40px', color: '#aaa' }}>A carregar…</div>}

      {!loading && (
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f4f8', overflow: 'hidden' }}>
          {logs.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#aaa' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📞</div>
              Ainda sem chamadas registadas
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F3F6FB' }}>
                  {['Data', 'Prospect', 'Resultado', 'Próximo passo', 'Notas'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', fontSize: '10px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'left', borderBottom: '1px solid #e8edf5', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((l, i) => {
                  const r = resultMeta(l.result)
                  const p = l.outbound_prospects
                  return (
                    <tr key={l.id} style={{ background: i % 2 === 0 ? 'white' : '#fafcff' }}>
                      <td style={{ padding: '11px 14px', fontSize: '12px', color: '#888', whiteSpace: 'nowrap' }}>
                        {new Date(l.called_at).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ padding: '11px 14px', fontSize: '13px', fontWeight: 600, color: '#111' }}>
                        {p ? `${p.nome} — ${p.empresa}` : '—'}
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '100px', background: r.color + '20', color: r.color, fontSize: '11px', fontWeight: 700 }}>
                          {r.label}
                        </span>
                      </td>
                      <td style={{ padding: '11px 14px', fontSize: '13px', color: '#555' }}>{l.next_step || '—'}</td>
                      <td style={{ padding: '11px 14px', fontSize: '12px', color: '#888', maxWidth: '200px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.notes || '—'}</div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {showModal && <CallModal prospects={prospects} onClose={() => setShowModal(false)} onSave={handleSave} />}
    </div>
  )
}

/* ── Script tab ── */
function ScriptTab() {
  const [script, setScript] = useState(() => {
    try { return JSON.parse(localStorage.getItem('crm_script') || 'null') || DEFAULT_SCRIPT } catch { return DEFAULT_SCRIPT }
  })
  const [saved, setSaved] = useState(false)

  const save = () => {
    localStorage.setItem('crm_script', JSON.stringify(script))
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const sections = [
    { key: 'abertura',      label: 'Outreach — Frame de abertura (trigger)',  icon: '🎯' },
    { key: 'qualificacao',  label: 'Qualificação rápida → marcar Audit',       icon: '❓' },
    { key: 'discovery',     label: 'Discovery — AI Growth Audit',              icon: '🔍' },
    { key: 'objecoes',      label: 'Respostas a objecções',                    icon: '🛡️' },
    { key: 'fecho',         label: 'Fecho — micro-confirmações',               icon: '✅' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '13px', color: '#888' }}>Guião de referência para cold calls. Editável e guardado localmente.</p>
        <button
          onClick={save}
          style={{ padding: '8px 18px', background: saved ? '#10b981' : '#217FF1', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
        >
          {saved ? '✓ Guardado' : 'Guardar script'}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sections.map(s => (
          <div key={s.key} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '18px' }}>{s.icon}</span>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 700, color: '#111' }}>{s.label}</span>
            </div>
            <textarea
              value={script[s.key] || ''}
              onChange={e => setScript(sc => ({ ...sc, [s.key]: e.target.value }))}
              rows={4}
              style={{
                width: '100%', padding: '12px 14px', border: '1.5px solid #e8edf5',
                borderRadius: '10px', fontSize: '13px', resize: 'vertical',
                boxSizing: 'border-box', outline: 'none', fontFamily: 'Inter, sans-serif',
                lineHeight: 1.6, color: '#333',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Templates tab ── */
function TemplatesTab() {
  const [templates, setTemplates] = useState(() => {
    try { return JSON.parse(localStorage.getItem('crm_templates') || 'null') || DEFAULT_TEMPLATES } catch { return DEFAULT_TEMPLATES }
  })
  const [copied, setCopied] = useState(null)
  const [saved, setSaved] = useState(false)

  const save = () => {
    localStorage.setItem('crm_templates', JSON.stringify(templates))
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const copy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 1800)
    })
  }

  const updateTemplate = (id, field, value) => {
    setTemplates(ts => ts.map(t => t.id === id ? { ...t, [field]: value } : t))
  }

  const channelColors = { whatsapp: '#25D366', email: '#217FF1', linkedin: '#0077B5' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '13px', color: '#888' }}>Templates prontos a usar. Clique em "Copiar" e cole onde precisar.</p>
        <button
          onClick={save}
          style={{ padding: '8px 18px', background: saved ? '#10b981' : '#217FF1', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
        >
          {saved ? '✓ Guardado' : 'Guardar templates'}
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {templates.map(t => {
          const cc = channelColors[t.canal] || '#888'
          return (
            <div key={t.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f0f4f8', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ padding: '3px 10px', borderRadius: '100px', background: cc + '20', color: cc, fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>
                  {t.canal}
                </span>
                <input
                  value={t.titulo}
                  onChange={e => updateTemplate(t.id, 'titulo', e.target.value)}
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', fontWeight: 700, color: '#111', background: 'transparent' }}
                />
              </div>
              <textarea
                value={t.corpo}
                onChange={e => updateTemplate(t.id, 'corpo', e.target.value)}
                rows={6}
                style={{
                  width: '100%', padding: '10px 12px', border: '1.5px solid #e8edf5',
                  borderRadius: '10px', fontSize: '12px', resize: 'vertical',
                  boxSizing: 'border-box', outline: 'none', fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.6, color: '#444',
                }}
              />
              <button
                onClick={() => copy(t.id, t.corpo)}
                style={{
                  alignSelf: 'flex-start', padding: '7px 16px',
                  background: copied === t.id ? '#10b981' : '#F3F6FB',
                  color: copied === t.id ? 'white' : '#555',
                  border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {copied === t.id ? '✓ Copiado!' : 'Copiar'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Main OutboundView ── */
export default function OutboundView({ onLeadCreated }) {
  const [sub, setSub] = useState('prospects')

  const SUB_TABS = [
    { id: 'prospects', label: 'Prospects' },
    { id: 'chamadas', label: 'Chamadas' },
    { id: 'script', label: 'Script' },
    { id: 'templates', label: 'Templates' },
  ]

  return (
    <div style={{ background: '#F3F6FB', minHeight: '100vh', fontFamily: 'Inter, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Sub-tabs */}
        <div style={{ display: 'flex', gap: '2px', background: 'white', borderRadius: '12px', padding: '4px', border: '1px solid #f0f4f8', marginBottom: '24px', width: 'fit-content' }}>
          {SUB_TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setSub(t.id)}
              style={{
                padding: '7px 18px', borderRadius: '9px', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 700,
                background: sub === t.id ? '#217FF1' : 'transparent',
                color: sub === t.id ? 'white' : '#888',
                transition: 'all 0.12s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {sub === 'prospects' && <ProspectsTab onMoveToPipeline={onLeadCreated} />}
        {sub === 'chamadas' && <ChamadasTab />}
        {sub === 'script' && <ScriptTab />}
        {sub === 'templates' && <TemplatesTab />}
      </div>
    </div>
  )
}
