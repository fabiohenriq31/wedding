import React from 'react'

function Organization () {
  return (
   <div id='organization' className='organization section-padding bg-pink'>
  <div className='container'>
    <div className='row'>
      <div className='col-md-12 mb-30'>
        <span className='oliven-title-meta'>Casamento</span>
        <h2 className='oliven-title'>Programação do Grande Dia</h2>
      </div>
    </div>
    <div id='photo-organization'className='row bord-box bg-img' data-background='images/slider.jpg'>
      <div className='col-md-3 item-box'>
        <h2 className='custom-font numb'>01</h2>
        <h6 className='title'>Cerimônia</h6>
        <p>
          É aqui que tudo começa! Emoção, lágrimas, sorrisos e o tão esperado “sim”.
        </p>
      </div>
      <div className='col-md-3 item-box'>
        <h2 className='custom-font numb'>02</h2>
        <h6 className='title'>Comida</h6>
        <p>
          Depois de tantas emoções, nada melhor que comer bem! Prepare-se pra delícias!
        </p>
      </div>
      <div className='col-md-3 item-box'>
        <h2 className='custom-font numb'>03</h2>
        <h6 className='title'>Festa</h6>
        <p>
          A pista vai ferver! Música, dança e muita alegria pra comemorar esse amor.
        </p>
      </div>
      <div className='col-md-3 item-box'>
        <h2 className='custom-font numb'>04</h2>
        <h6 className='title'>Corte do Bolo</h6>
        <p>
          O momento doce da noite! Preparem os celulares, vem fotinho clássica por aí.
        </p>
      </div>
    </div>
  </div>
</div>

  )
}

export default Organization
