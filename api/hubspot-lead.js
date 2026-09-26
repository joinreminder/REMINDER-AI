export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { lead, scoring } = req.body
  if (!lead?.email) return res.status(400).json({ error: 'email required' })

  const token = process.env.HUBSPOT_API_KEY
  if (!token) return res.status(500).json({ error: 'HubSpot not configured' })

  const nameParts = (lead.nome || '').trim().split(/\s+/)
  const firstname = nameParts[0] || ''
  const lastname = nameParts.slice(1).join(' ') || ''

  const properties = {
    firstname,
    lastname,
    email: lead.email,
    company: lead.empresa || '',
    jobtitle: lead.cargo || '',
    website: lead.website || '',
    industry: lead.setor || '',
    lifecyclestage: 'lead',
    roadmap_type: scoring?.roadmapKey || '',
    roadmap_score: scoring?.total ?? 0,
  }

  try {
    // Try to create the contact
    let contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    })

    let contactData = await contactRes.json()

    // If contact already exists, update it
    if (contactRes.status === 409 && contactData.message?.includes('already exists')) {
      const existingId = contactData.message.match(/Existing ID:\s*(\d+)/)?.[1]
      if (existingId) {
        const { lifecyclestage, ...updateProps } = properties
        contactRes = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ properties: updateProps }),
        })
        contactData = await contactRes.json()
      }
    }

    if (!contactData.id) {
      console.error('HubSpot contact error:', JSON.stringify(contactData))
      return res.status(500).json({ error: 'Failed to create contact' })
    }

    // Create a note with full scoring details
    if (scoring) {
      const noteBody = [
        `Roadmap Personalizado de Conversão`,
        `Tipo: ${scoring.roadmapName || scoring.roadmapKey}`,
        `Score: ${scoring.total}/${scoring.maxTotal}`,
        `---`,
        `Response: ${scoring.scores?.response}/4`,
        `Follow-up: ${scoring.scores?.followup}/4`,
        `Qualification: ${scoring.scores?.qualification}/4`,
        `Lead>Meeting: ${scoring.scores?.leadToMeeting}/4`,
        `Consistency: ${scoring.scores?.consistency}/4`,
        `---`,
        `Leads/mês: ${lead.leads_mes || ''}`,
        `Fontes: ${lead.fontes || ''}`,
        `Valor cliente: ${lead.valor_cliente || ''}`,
        `Tempo resposta: ${lead.tempo_resposta || ''}`,
        `Quem contacta: ${lead.quem_contacta || ''}`,
        `Follow-up: ${lead.followup || ''}`,
        `Qualificação: ${lead.qualificacao || ''}`,
        `Taxa conversão: ${lead.taxa_conversao || ''}`,
        `Situação: ${lead.situacao || ''}`,
        `Interesse piloto: ${lead.interesse_piloto || ''}`,
      ].join('\n')

      await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            hs_timestamp: new Date().toISOString(),
            hs_note_body: noteBody,
          },
          associations: [{
            to: { id: contactData.id },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
          }],
        }),
      })
    }

    res.json({ ok: true, contactId: contactData.id })
  } catch (err) {
    console.error('HubSpot error:', err.message)
    res.status(500).json({ error: 'HubSpot API error' })
  }
}
