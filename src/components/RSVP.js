import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import { saveRsvp } from '../services/rsvpApi'

const serviceId = process.env.REACT_APP_SERVICE_ID
const templateID = process.env.REACT_APP_TEMPLATE_ID
const publicKey = process.env.REACT_APP_PUBLIC_KEY

function RSVP () {
  const form = useRef()

  const sendEmail = async (e) => {
    e.preventDefault()

    const formData = new FormData(form.current)
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      companions: formData.get('companions'),
      message: formData.get('message')
    }

    try {
      await Promise.all([
        emailjs.sendForm(serviceId, templateID, form.current, publicKey),
        saveRsvp(payload)
      ])

      alert('Confirmação enviada com sucesso!')
      form.current.reset()
    } catch (error) {
      alert('Falha ao enviar sua confirmação de presença, tente novamente mais tarde.')
      console.error(error)
    }
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
                    placeholder='Email'
                  />{' '}
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
                    value='CONFIRMAR'
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
