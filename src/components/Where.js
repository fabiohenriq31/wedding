import React from 'react'
import where1 from '../assets/images/where-1.jpg'
import where2 from '../assets/images/where-2.jpg'
import where3 from '../assets/images/where-3.jpg'
function Where () {
  return (
    <div id='whenwhere' className='whenwhere section-padding bg-pink'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 mb-30'>
            {' '}
            <span className='oliven-title-meta'>Curioso?</span>
            <h2 className='oliven-title'>Quando e Onde?</h2>{' '}
          </div>
        </div>
        <div className='row'>
          <div className='item col-12 col-md-4'>
            <div className='whenwhere-img'>
              {' '}
              <img src={where1} alt='' />
            </div>
            <div className='content'>
              <h5>Cerimonia de Casamento</h5>
              <p>
                <i className='ti-location-pin'></i> Granja Sape - Rodovia MG 129, km 194 Carreiras, Ouro Branco - MG, 36420-000
              </p>
              <p>
                <i className='ti-time'></i> <span>14:30 até 02:00</span>
              </p>
            </div>
          </div>
          <div className='item col-12 col-md-4'>
            <div className='whenwhere-img'>
              {' '}
              <img src={where2} alt='' />
            </div>
            <div className='content'>
              <h5>Festa de casamento</h5>
              <p>
                <i className='ti-location-pin'></i> A festança está grantida no 
                mesmo local da cerimonia.
              </p>
              <p>
                <i className='ti-time'></i> <span>Após a cerimonia</span>
              </p>
            </div>
          </div>
          <div className='item col-12 col-md-4'>
            <div className='whenwhere-img'>
              {' '}
              <img src={where3} alt='' />
            </div>
            <div className='content'>
              <h5>Acomodações</h5>
              <p>
                <i className='ti-direction-alt'></i> Teremos quartos disponiveis 
                para os convidados, com reserva prévia.
              </p>
              <p>
                <i className='ti-direction'></i> Granja Sape
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Where
