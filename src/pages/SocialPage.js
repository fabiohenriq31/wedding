import React, { useEffect } from 'react'

const socialUrl = 'https://www.shoppingbiancaefabio.com.br/shopping/social'

function SocialPage () {
  useEffect(() => {
    window.location.href = socialUrl
  }, [])

  return (
    <div className='bf-social-page'>
      <header className='bf-social-hero'>
        <div className='container'>
          <a className='bf-social-back' href='/'>Voltar ao site</a>
          <span className='oliven-title-meta'>Mural dos convidados</span>
          <h1>B&amp;F Social</h1>
          <p>Para participar do B&amp;F Social, entre com sua conta no shopping.</p>
          <br />
          <div className='buttono'>
            <a href={socialUrl}>
              <span>Entrar no B&amp;F Social</span>
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}

export default SocialPage
