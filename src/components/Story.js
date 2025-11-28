import React from 'react'
import storyImage from '../assets/images/story.jpg'
function Story () {
  return (
    <div id='story' className='story section-padding'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5 mb-30'>
            <div className='story-img animate-box'>
              <div className='img'>
                {' '}
                <img src={storyImage} className='img-fluid' alt='' />{' '}
              </div>
              <div
                className='story-img-2 story-wedding'
              ></div>
            </div>
          </div>
          <div className='col-md-7 animate-box'>
            <h4 className='oliven-story-subtitle'>Nosso Amor.</h4>
            <h3 className='oliven-story-title'>Nossa História.</h3>
            <p>
              Nos conhecemos de um jeito especial, e desde então nossas vidas
              nunca mais foram as mesmas. Cada momento vivido juntos foi 
              construindo algo maior uma história de amor verdadeira, 
              leve e cheia de propósito.
            </p>
            <p>
              Entre risos, desafios e descobertas, aprendemos a caminhar lado a 
              lado. Nosso amor cresceu com o tempo, com cuidado, parceria e o 
              desejo de viver um futuro juntos.
            </p>
            <p>
              No meio da correria da vida, encontramos no outro um porto seguro. 
              E mesmo nas diferenças, soubemos nos escolher todos os dias.
            </p>
            <h4>8 de Agosto de 2025 - Nós dissemos "SIM"</h4>
            <p>
              Foi nesse dia que decidimos transformar nosso amor em promessa. 
              Uma promessa de cuidado, respeito e muito amor. Desde então, 
              cada passo é uma preparação para o nosso “sim” mais especial: 
              o do altar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Story
