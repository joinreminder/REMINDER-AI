export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { lead, scoring } = req.body
  if (!lead?.email) return res.status(400).json({ error: 'email required' })

  const token = process.env.NOTION_API_KEY
  const dbId = process.env.NOTION_LEADS_DB_ID
  if (!token || !dbId) return res.status(500).json({ error: 'Notion not configured' })

  const ROADMAP_MAP = {
    response:      'Conversão de Leads',
    followup:      'Follow-up',
    qualification: 'Qualificação',
    leadToMeeting: 'Marcar Reuniões',
    outbound:      'Outbound',
  }

  const roadmapName = ROADMAP_MAP[scoring?.roadmapKey] || scoring?.roadmapName || ''

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: dbId },
        properties: {
          Nome:                   { title: [{ text: { content: lead.nome || '' } }] },
          Email:                  { email: lead.email },
          Empresa:                { rich_text: [{ text: { content: lead.empresa || '' } }] },
          Grade:                  scoring?.grade ? { select: { name: scoring.grade } } : undefined,
          Score:                  { number: scoring?.total ?? 0 },
          Roadmap:                roadmapName ? { select: { name: roadmapName } } : undefined,
          'Urgência':             lead.urgencia ? { select: { name: lead.urgencia } } : undefined,
          'Leads/mês':            { rich_text: [{ text: { content: lead.leads_mes || '' } }] },
          'Valor Cliente':        { rich_text: [{ text: { content: lead.valor_cliente || '' } }] },
          'Tempo Resposta':       { rich_text: [{ text: { content: lead.tempo_resposta || '' } }] },
          'Response Score':       { number: scoring?.scores?.response ?? 0 },
          'Follow-up Score':      { number: scoring?.scores?.followup ?? 0 },
          'Qualification Score':  { number: scoring?.scores?.qualification ?? 0 },
          'Lead>Meeting Score':   { number: scoring?.scores?.leadToMeeting ?? 0 },
        },
      }),
    })

    const data = await response.json()
    if (!data.id) {
      console.error('Notion error:', JSON.stringify(data))
      return res.status(500).json({ error: 'Notion API error' })
    }

    res.json({ ok: true, pageId: data.id })
  } catch (err) {
    console.error('Notion error:', err.message)
    res.status(500).json({ error: 'Notion API error' })
  }
}
