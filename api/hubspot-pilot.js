export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, nome, empresa } = req.body
  if (!email) return res.status(400).json({ error: 'email required' })

  const token = process.env.HUBSPOT_API_KEY
  if (!token) return res.status(500).json({ error: 'HubSpot not configured' })

  try {
    // Find contact by email
    const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
        properties: ['email', 'lifecyclestage'],
        limit: 1,
      }),
    })
    const searchData = await searchRes.json()
    const contactId = searchData.results?.[0]?.id

    if (!contactId) {
      return res.status(404).json({ error: 'Contact not found' })
    }

    // Update lifecyclestage to salesqualifiedlead
    await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: { lifecyclestage: 'salesqualifiedlead' },
      }),
    })

    // Create note
    const noteBody = [
      `Piloto Gratuito — Interesse Confirmado`,
      `---`,
      `Clicou em "Quero o Piloto Gratuito" no Roadmap de Conversão.`,
      `Nome: ${nome || '—'}`,
      `Empresa: ${empresa || '—'}`,
      `Data: ${new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })}`,
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
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
        }],
      }),
    })

    res.json({ ok: true, contactId })
  } catch (err) {
    console.error('HubSpot pilot error:', err.message)
    res.status(500).json({ error: 'HubSpot API error' })
  }
}
