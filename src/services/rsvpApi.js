const API_URL = process.env.REACT_APP_API_URL || '/api'

export async function saveRsvp (payload) {
  const response = await fetch(`${API_URL}/rsvp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'Nao foi possivel registrar sua presenca.')
  }

  return data
}
