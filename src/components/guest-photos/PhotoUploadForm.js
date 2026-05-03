import React, { useState } from 'react'
import { uploadGuestPhoto } from '../../services/guestPhotosApi'

function PhotoUploadForm ({ onUploaded }) {
  const [guestName, setGuestName] = useState('')
  const [photo, setPhoto] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit (event) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!photo) {
      setError('Escolha ou tire uma foto para enviar.')
      return
    }

    setIsSubmitting(true)

    try {
      const data = await uploadGuestPhoto({ photo, guestName })
      setMessage(data?.message || 'Sua foto já apareceu no mural! 💙')
      setGuestName('')
      setPhoto(null)
      event.currentTarget.reset()
      onUploaded()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel enviar a foto.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className='guest-photo-upload' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='guestName'>Seu nome (opcional)</label>
        <input
          id='guestName'
          type='text'
          value={guestName}
          onChange={(event) => setGuestName(event.target.value)}
          placeholder='Como quer aparecer no mural?'
          maxLength='80'
        />
      </div>

      <div>
        <label htmlFor='photo'>Foto</label>
        <input
          id='photo'
          type='file'
          accept='image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif'
          capture='environment'
          onChange={(event) => setPhoto(event.target.files?.[0] || null)}
        />
      </div>

      <button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar foto'}
      </button>

      {message && <p className='guest-photo-upload__success'>{message}</p>}
      {error && <p className='guest-photo-upload__error'>{error}</p>}
    </form>
  )
}

export default PhotoUploadForm
