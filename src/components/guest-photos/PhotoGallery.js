import React from 'react'

function PhotoGallery ({ photos, onSelect }) {
  if (photos.length === 0) {
    return (
      <div className='guest-photo-empty'>
        <p>Nenhuma foto enviada ainda. Seja a primeira pessoa a aparecer no mural.</p>
      </div>
    )
  }

  return (
    <div className='guest-photo-grid'>
      {photos.map((photo) => (
        <button
          type='button'
          className='guest-photo-card'
          key={photo._id}
          onClick={() => onSelect(photo)}
        >
          <img src={photo.thumbnailUrl || photo.imageUrl} alt={`Foto enviada por ${photo.guestName}`} />
          <span>{photo.guestName || 'Convidado'}</span>
        </button>
      ))}
    </div>
  )
}

export default PhotoGallery
