import React from 'react'

function PhotoLightbox ({ photo, onClose }) {
  if (!photo) return null

  return (
    <div className='guest-photo-lightbox' role='dialog' aria-modal='true' onClick={onClose}>
      <button type='button' className='guest-photo-lightbox__close' onClick={onClose}>
        Fechar
      </button>
      <div className='guest-photo-lightbox__content' onClick={(event) => event.stopPropagation()}>
        <img src={photo.imageUrl} alt={`Foto enviada por ${photo.guestName}`} />
        <p>{photo.guestName || 'Convidado'}</p>
      </div>
    </div>
  )
}

export default PhotoLightbox
