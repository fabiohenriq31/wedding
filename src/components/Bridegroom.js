import React from 'react'
import Bride from '../assets/images/bride.jpg'
import Groom from '../assets/images/groom.jpg'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function Bridegroom () {
  return (
    <div id='couple' className='bridegroom clear section-padding bg-pink'>
      <div className='container'>
        <div className='row mb-60'>
          <div className='col-md-6'>
            <div
              className='item toright mb-30 animate-box'
              data-animate-effect='fadeInLeft'
            >
              <div className='img'>
                {' '}
                <img src={Bride} alt='' />{' '}
              </div>
              <div className='info valign'>
                <div className='full-width'>
                  <h6>
                    Bianca Fonseca Vaz <i className='ti-heart'></i>
                  </h6>{' '}
                  <span>A Noiva</span>
                  <p>
                    Bianca é uma pessoa alegre, que ama dançar e cantar. Ama os amigos e uma bela farra
                  </p>
                  <div className='social'>
                    <div className='full-width'>
                      <a href="https://instagram.com/seuPerfil" 
                      target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                      </a>
                      <a href="https://facebook.com/seuPerfil" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                      </a>
                      <a href="https://twitter.com/seuPerfil" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div
              className='item mb-30 animate-box'
              data-animate-effect='fadeInRight'
            >
              <div className='img'>
                {' '}
                <img src={Groom} alt='' />{' '}
              </div>
              <div className='info valign'>
                <div className='full-width'>
                  <h6>
                   Fábio H. S. Damasceno <i className='ti-heart'></i>
                  </h6>{' '}
                  <span>O Noivo</span>
                  <p>
                    Um cara que adora uma piada, ama os amigos, os goles
                    nos butecos e jogar.
                  </p>
                  <div className='social'>
                    <div className='full-width'>
                      <a href="https://instagram.com/seuPerfil" 
                      target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                      </a>
                      <a href="https://facebook.com/seuPerfil" 
                      target="_blank" rel="noopener noreferrer">
                      <FaFacebookF />
                      </a>
                      <a href="https://twitter.com/seuPerfil" 
                      target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div
            className='col-md-12 text-center animate-box'
            data-animate-effect='fadeInUp'
          >
            <h3 className='oliven-couple-title'>Vão se casar!</h3>
            <h4 className='oliven-couple-subtitle'>
              15 de Agosto de 2026
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bridegroom
