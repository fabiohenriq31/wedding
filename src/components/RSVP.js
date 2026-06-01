import React, { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { saveRsvp, searchRsvpGuests } from '../services/rsvpApi'

const serviceId = process.env.REACT_APP_SERVICE_ID
const templateID = process.env.REACT_APP_TEMPLATE_ID
const publicKey = process.env.REACT_APP_PUBLIC_KEY

function RSVP () {
  const [nameQuery, setNameQuery] = useState('')
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [guestSuggestions, setGuestSuggestions] = useState([])
  const [companionQuery, setCompanionQuery] = useState('')
  const [companionSuggestions, setCompanionSuggestions] = useState([])
  const [selectedCompanions, setSelectedCompanions] = useState([])
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const selectedIds = useMemo(() => {
    return new Set([
      selectedGuest?._id,
      ...selectedCompanions.map((guest) => guest._id)
    ].filter(Boolean))
  }, [selectedCompanions, selectedGuest])

  async function handleGuestSearch (query, setter, currentIds = new Set()) {
    if (query.trim().length < 2) {
      setter([])
      return
    }

    try {
      const results = await searchRsvpGuests(query)
      setter(results.filter((guest) => !currentIds.has(guest._id)))
    } catch (error) {
      console.error(error)
      setter([])
    }
  }

  async function onGuestInputChange (event) {
    const value = event.target.value
    setNameQuery(value)
    setSelectedGuest(null)
    await handleGuestSearch(value, setGuestSuggestions)
  }

  async function onCompanionInputChange (event) {
    const value = event.target.value
    setCompanionQuery(value)
    await handleGuestSearch(value, setCompanionSuggestions, selectedIds)
  }

  function selectGuest (guest) {
    setSelectedGuest(guest)
    setNameQuery(guest.name)
    setGuestSuggestions([])
  }

  function addCompanion (guest) {
    setSelectedCompanions((current) => [...current, guest])
    setCompanionQuery('')
    setCompanionSuggestions([])
  }

  function removeCompanion (guestId) {
    setSelectedCompanions((current) => current.filter((guest) => guest._id !== guestId))
  }

  async function sendEmailAndRsvp (event) {
    event.preventDefault()

    if (!selectedGuest) {
      alert('Selecione seu nome a partir da lista de convidados.')
      return
    }

    setSending(true)

    const companionNames = selectedCompanions.map((guest) => guest.name).join(', ')
    const payload = {
      primaryGuestId: selectedGuest._id,
      companionGuestIds: selectedCompanions.map((guest) => guest._id),
      email,
      phone,
      message
    }

    try {
      await Promise.all([
        emailjs.send(serviceId, templateID, {
          name: selectedGuest.name,
          email,
          phone,
          companions: companionNames,
          message
        }, publicKey),
        saveRsvp(payload)
      ])

      alert('Confirmacao enviada com sucesso!')
      setNameQuery('')
      setSelectedGuest(null)
      setGuestSuggestions([])
      setCompanionQuery('')
      setSelectedCompanions([])
      setCompanionSuggestions([])
      setEmail('')
      setPhone('')
      setMessage('')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Falha ao enviar sua confirmacao de presenca.')
      console.error(error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div id='rsvp' className='section-padding bg-img bg-fixed'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 bg-white p-40'>
            <span className='oliven-title-meta text-center'>Voce vem comemorar com a gente?</span>
            <h2 className='oliven-title text-center'>Confirme sua presenca</h2>
            <br />
            <form onSubmit={sendEmailAndRsvp} method='post' className='row'>
              <div className='col-md-12'>
                <div className='form-group rsvp-lookup'>
                  <input type='text' name='name' className='form-control' placeholder='Digite seu nome' value={nameQuery} onChange={onGuestInputChange} autoComplete='off' required />
                  {guestSuggestions.length > 0 && (
                    <div className='rsvp-lookup__menu'>
                      {guestSuggestions.map((guest) => (
                        <button key={guest._id} type='button' className='rsvp-lookup__item' onClick={() => selectGuest(guest)}>
                          <strong>{guest.name}</strong>
                          <span>{guest.guestType === 'groomsman' ? 'Padrinho/Madrinha' : 'Convidado'}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className='col-md-12'>
                <div className='form-group'>
                  <input type='text' name='email' className='form-control' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
              </div>

              <div className='col-md-12'>
                <div className='form-group'>
                  <input type='text' name='phone' className='form-control' placeholder='Telefone' value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
              </div>

              <div className='col-md-12'>
                <div className='form-group rsvp-lookup'>
                  <input type='text' name='companions' className='form-control' placeholder='Adicionar acompanhantes da lista' value={companionQuery} onChange={onCompanionInputChange} autoComplete='off' />
                  {companionSuggestions.length > 0 && (
                    <div className='rsvp-lookup__menu'>
                      {companionSuggestions.map((guest) => (
                        <button key={guest._id} type='button' className='rsvp-lookup__item' onClick={() => addCompanion(guest)}>
                          <strong>{guest.name}</strong>
                          <span>{guest.guestType === 'groomsman' ? 'Padrinho/Madrinha' : 'Convidado'}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {selectedCompanions.length > 0 && (
                <div className='col-md-12'>
                  <div className='rsvp-selected'>
                    {selectedCompanions.map((guest) => (
                      <button key={guest._id} type='button' className='rsvp-selected__chip' onClick={() => removeCompanion(guest._id)}>
                        {guest.name} <span>x</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className='col-md-12'>
                <div className='form-group'>
                  <textarea name='message' id='message' cols='30' rows='7' className='form-control' placeholder='Mensagem' value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
                </div>
              </div>

              <div className='col-md-12'>
                <div className='form-group'>
                  <input type='submit' className='btn buttono' value={sending ? 'ENVIANDO...' : 'CONFIRMAR'} disabled={sending || !selectedGuest} />
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
