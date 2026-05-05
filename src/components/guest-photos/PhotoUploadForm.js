import React, { useState } from 'react'
import { uploadGuestPhoto } from '../../services/guestPhotosApi'

function PhotoUploadForm ({ onUploaded }) {
  const [guestName, setGuestName] = useState('')
  const [photo, setPhoto] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handlePhotoChange (event) {
    const selectedPhoto = event.target.files?.[0] || null

    setError('')
    setMessage('')
    setPhoto(selectedPhoto)

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    if (selectedPhoto) {
      setPreviewUrl(URL.createObjectURL(selectedPhoto))
    } else {
      setPreviewUrl('')
    }
  }

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

      setMessage(data?.message || 'Sua foto foi enviada com carinho! ♡')
      setGuestName('')
      setPhoto(null)
      setPreviewUrl('')
      event.currentTarget.reset()
      onUploaded()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar a foto.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className='guest-photo-upload' onSubmit={handleSubmit}>
      <div className='guest-photo-field'>
        <label htmlFor='guestName'>Seu nome <span>(opcional)</span></label>

        <input
          id='guestName'
          type='text'
          value={guestName}
          onChange={(event) => setGuestName(event.target.value)}
          placeholder='Como quer aparecer no mural?'
          maxLength='80'
        />
      </div>

      <div className='guest-photo-field'>
        <label htmlFor='photo'>Sua foto</label>

        <label className={`guest-photo-file ${previewUrl ? 'has-preview' : ''}`} htmlFor='photo'>
          <input
            id='photo'
            type='file'
            accept='image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif'
            capture='environment'
            onChange={handlePhotoChange}
          />

          {!previewUrl && (
            <div className='guest-photo-file__content'>
              <span className='guest-photo-file__icon'>📸</span>
              <strong>Clique para escolher ou tirar uma foto</strong>
              <small>JPG, PNG, WEBP ou HEIC</small>
            </div>
          )}

          {previewUrl && (
            <div className='guest-photo-preview'>
              <img src={previewUrl} alt='Prévia da foto escolhida' />
              <span>Trocar foto</span>
            </div>
          )}
        </label>
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