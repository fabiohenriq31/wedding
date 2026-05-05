import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import PhotoGallery from '../components/guest-photos/PhotoGallery'
import PhotoLightbox from '../components/guest-photos/PhotoLightbox'
import PhotoUploadForm from '../components/guest-photos/PhotoUploadForm'
import { getGuestPhotos } from '../services/guestPhotosApi'

function GuestPhotosPage () {
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadPhotos () {
    setLoading(true)
    setError('')

    try {
      const data = await getGuestPhotos()

      const visiblePhotos = Array.isArray(data)
        ? data.filter((photo) => photo.isApproved === true && photo.status === 'approved')
        : []

      setPhotos(visiblePhotos)
    } catch (err) {
      console.error('Erro ao carregar fotos dos convidados:', err)

      setError(
        'Ainda não conseguimos carregar o mural. As fotos aparecerão aqui assim que estiver tudo pronto.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  return (
    <>
      <Sidebar />

      <main id='oliven-main' className='guest-photos-page'>
        <section className='guest-photos-hero'>
          <div className='container'>
            <div className='guest-photos-hero__content'>
              <span className='oliven-title-meta'>Fotos dos convidados</span>

              <h1>Mural de lembranças</h1>

              <p>
                Compartilhe um momento especial do nosso casamento e ajude a eternizar
                esse dia pelos olhos de quem amamos.
              </p>
            </div>
          </div>
        </section>

        <section className='guest-photos-section'>
          <div className='container'>
            <div className='guest-photos-grid'>
              <div className='guest-photo-panel guest-photo-panel--upload'>
                <div className='guest-photo-panel__ornament'>♡</div>

                <span className='oliven-title-meta'>Participe</span>

                <h2 className='oliven-title'>Envie sua foto</h2>

                <p className='guest-photo-panel__text'>
                  Escolha uma foto bonita, divertida ou espontânea. Ela aparecerá no mural
                  após aprovação dos noivos.
                </p>

                <div className='guest-photo-form-wrapper'>
                  <PhotoUploadForm onUploaded={loadPhotos} />
                </div>
              </div>

              <div className='guest-photo-panel guest-photo-panel--gallery'>
                <div className='guest-photo-panel__header'>
                  <div>
                    <span className='oliven-title-meta'>Mural</span>
                    <h2 className='oliven-title'>Fotos recebidas</h2>
                  </div>

                  <span className='guest-photo-count'>
                    {photos.length === 0
                      ? 'Nenhuma foto'
                      : `${photos.length} ${photos.length === 1 ? 'foto' : 'fotos'}`}
                  </span>
                </div>

                {loading && (
                  <div className='guest-photo-state'>
                    <span className='guest-photo-state__icon'>⌛</span>
                    <p>Carregando as lembranças...</p>
                  </div>
                )}

                {!loading && error && (
                  <div className='guest-photo-empty guest-photo-empty--soft'>
                    <span>♡</span>
                    <h3>Mural em preparação</h3>
                    <p>{error}</p>
                  </div>
                )}

                {!loading && !error && photos.length === 0 && (
                  <div className='guest-photo-empty'>
                    <span>♡</span>
                    <h3>Ainda não temos fotos</h3>
                    <p>Seja a primeira pessoa a deixar uma lembrança desse dia especial.</p>
                  </div>
                )}

                {!loading && !error && photos.length > 0 && (
                  <PhotoGallery photos={photos} onSelect={setSelectedPhoto} />
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </>
  )
}

export default GuestPhotosPage