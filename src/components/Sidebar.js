import React, { useState } from 'react'
import Logo from '../assets/images/logo.png'
function Sidebar () {
  const [show, setShow] = useState(false);

  const openMenu = (e) => {
    e.preventDefault();
    setShow(!show);
    document.body.classList.toggle('slide');
  }

  return (
    <>
      <a href='/' onClick={openMenu} className={`js-oliven-nav-toggle oliven-nav-toggle${show ? ' active': ''}`}>
        <i></i>
      </a>
      <aside id='oliven-aside'>
        <div className='oliven-logo'>
          <a href='/'>
            <img src={Logo} alt='' />
            <span>
              Bianca <small>&</small> Fábio
            </span>
            <h6>15.08.2026</h6>
          </a>
        </div>
        <nav className='oliven-main-menu'>
          <ul>
            <li>
              <a href='#home'>Início</a>
            </li>
            <li>
              <a href='#couple'>Os Noivos</a>
            </li>
            <li>
              <a href='#story'>Nossa História</a>
            </li>
            <li>
              <a href='#organization'>Programação</a>
            </li>
            <li>
              <a href='#gallery'>Galeria</a>
            </li>
            <li>
              <a href='#whenwhere'>Quando & Onde</a>
            </li>
            <li>
              <a href='#rsvp'>Confirme sua Presença</a>
            </li>
          </ul>
        </nav>
        <div className='footer1'>
          {' '}
          <span className='separator'></span>
          <p>
            Casamento Bianca & Fábio
            <br />
            15 Agosto 2026, Granja Sape
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
