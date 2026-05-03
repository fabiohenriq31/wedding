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
    setError('')

    try {
      const data = await getGuestPhotos()
      const visiblePhotos = Array.isArray(data)
        ? data.filter((photo) => photo.isApproved === true && photo.status === 'approved')
        : []

      setPhotos(visiblePhotos)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel carregar as fotos.')
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
            <span className='oliven-title-meta'>Fotos dos convidados</span>
            <h1>Mural do casamento</h1>
            <p>
              Tire uma foto, envie para a gente e veja sua lembranca aparecer no mural em instantes.
            </p>
          </div>
        </section>

        <section className='section-padding bg-white'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-5 mb-30'>
                <div className='guest-photo-panel'>
                  <span className='oliven-title-meta'>Participe</span>
                  <h2 className='oliven-title'>Envie sua foto</h2>
                  <PhotoUploadForm onUploaded={loadPhotos} />
                </div>
              </div>

              <div className='col-lg-7'>
                <div className='guest-photo-panel'>
                  <span className='oliven-title-meta'>Mural</span>
                  <h2 className='oliven-title'>Fotos recebidas</h2>
                  {loading && <p>Carregando fotos...</p>}
                  {error && <p className='guest-photo-upload__error'>{error}</p>}
                  {!loading && !error && (
                    <PhotoGallery photos={photos} onSelect={setSelectedPhoto} />
                  )}
                </div>
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
