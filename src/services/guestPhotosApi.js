const API_URL = process.env.REACT_APP_API_URL || '/api'

export async function getGuestPhotos () {
  const response = await fetch(`${API_URL}/guest-photos`)

  if (!response.ok) {
    throw new Error('Nao foi possivel carregar as fotos.')
  }

  return response.json()
}

export async function uploadGuestPhoto ({ photo, guestName }) {
  const formData = new FormData()
  formData.append('photo', photo)
  formData.append('guestName', guestName || '')

  const response = await fetch(`${API_URL}/guest-photos`, {
    method: 'POST',
    body: formData
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'Nao foi possivel enviar a foto.')
  }

  return data
}
