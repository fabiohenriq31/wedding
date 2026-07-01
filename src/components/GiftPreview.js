import React, { useEffect, useMemo, useState } from 'react'

const shopUrl = 'https://www.shoppingbiancaefabio.com.br/shopping/products'
const apiUrl = process.env.REACT_APP_SHOP_API_URL || '/shopping-api'

function formatCurrency (value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0)
}

function GiftPreviewImage ({ product }) {
  const [hasError, setHasError] = useState(false)

  if (!product.imageUrl || hasError) {
    return <span className='gift-preview__image-placeholder'>Presente</span>
  }

  return (
    <img
      src={product.imageUrl}
      alt={product.name}
      onError={() => setHasError(true)}
      loading='lazy'
    />
  )
}

function GiftPreview () {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadProducts () {
      try {
        const response = await fetch(`${apiUrl}/products`)

        if (!response.ok) {
          throw new Error('Erro ao buscar produtos')
        }

        const data = await response.json()

        if (isMounted) {
          setProducts(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        if (isMounted) {
          setProducts([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const featuredProducts = useMemo(() => {
    const activeProducts = products
      .filter((product) => product.isActive !== false)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))

    const featured = activeProducts.filter((product) => product.isFeatured)
    return (featured.length > 0 ? featured : activeProducts).slice(0, 4)
  }, [products])

  return (
    <section id='gifts' className='gift-preview section-padding bg-white'>
      <div className='container'>
        <div className='row align-items-end'>
          <div className='col-md-8 mb-30'>
            <span className='oliven-title-meta'>Lista de Presentes</span>
            <h2 className='oliven-title'>Um carinho para a nossa nova história</h2>
          </div>
          <div className='col-md-4 mb-30 text-md-end gift-preview__top-action'>
            <div className='buttono'>
              <a href={shopUrl}>
                <span>Ver todos</span>
              </a>
            </div>
          </div>
        </div>

        <div className='gift-preview__intro'>
          <p>
            Se quiser nos presentear, criamos uma lista simbólica com experiências,
            momentos e pequenas alegrias para a nossa vida a dois.
          </p>
        </div>

        {isLoading ? (
          <p className='gift-preview__status'>Carregando presentes...</p>
        ) : featuredProducts.length > 0 ? (
          <div className='row gift-preview__grid'>
            {featuredProducts.map((product) => (
              <div className='col-6 col-lg-3' key={product.id || product._id || product.slug || product.name}>
                <a className='gift-preview__card' href={shopUrl}>
                  <span className='gift-preview__image'>
                    <GiftPreviewImage product={product} />
                  </span>
                  <span className='gift-preview__content'>
                    <span className='gift-preview__name'>{product.name}</span>
                    <span className='gift-preview__description'>
                      {product.shortDescription || product.description || 'Presente simbolico para os noivos'}
                    </span>
                    <span className='gift-preview__price'>{formatCurrency(product.price)}</span>
                  </span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className='gift-preview__status'>
            A lista completa esta disponivel no nosso shopping.
          </p>
        )}

        <div className='gift-preview__mobile-action buttono'>
          <a href={shopUrl}>
            <span>Ir para a lista de presentes</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default GiftPreview
