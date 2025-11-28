import React, {useRef} from 'react'
import emailjs from '@emailjs/browser'

const serviceId = process.env.REACT_APP_SERVICE_ID
const templateID = process.env.REACT_APP_TEMPLATE_ID
const publicKey = process.env.REACT_APP_PUBLIC_KEY

function RSVP () {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm(serviceId, templateID, form.current, publicKey ).then(
      () => {
        alert("Confirmação enviada com sucesso!")
        form.current.reset()
      },
      (error) => {
        alert("Falha ao enviar sua confirmação de presença, tente novamente mais tarde.", error.text);

      }
    )
  }
  return (
    <div
      id='rsvp'
      className='section-padding bg-img bg-fixed'
    >
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 bg-white p-40'>
            {' '}
            <span className='oliven-title-meta text-center'>🥂 Você vem comemorar com a gente?</span>
            <h2 className='oliven-title text-center'>Confirme sua presença</h2>
            <br />
            <form ref={form} onSubmit={sendEmail} method='post' className='row'>
              <div className='col-md-12'>
                <div className='form-group'>
                  <input
                    type='text'
                    name='name'
                    className='form-control'
                    placeholder='Nome'
                    required
                  />{' '}
                </div>
              </div>
              <div className='col-md-12'>
                <div className='form-group'>
                  <input 
                  type='text' 
                  name='email'
                  className='form-control' 
                  placeholder='Email' />{' '}
                </div>
              </div>
              <div className='col-md-12'>
                <div className='form-group'>
                  <input
                    type='text'
                    name='companions'
                    className='form-control'
                    placeholder='Quem vai com você?'
                  />{' '}
                </div>
              </div>
              <div className='col-md-12'>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    cols='30'
                    rows='7'
                    className='form-control'
                    placeholder='Mensagem'
                  ></textarea>
                </div>
              </div>
              <div className='col-md-12'>
                <div className='form-group'>
                  <input 
                  type='submit' 
                  className='btn buttono' 
                  value='SEND' 
                   />{' '}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RSVP
