import React, { useEffect, useState } from 'react'

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false
  })

  useEffect(() => {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24

    const birthday = "Aug 15, 2026 00:00:00"
    const countDown = new Date(birthday).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countDown - now

      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft(prev => ({ ...prev, finished: true }))
      } else {
        setTimeLeft({
          days: Math.floor(distance / day),
          hours: Math.floor((distance % day) / hour),
          minutes: Math.floor((distance % hour) / minute),
          seconds: Math.floor((distance % minute) / second),
          finished: false
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (timeLeft.finished) {
    return (
      <div>
        <h2>Chegou o nosso grande dia!</h2>
      </div>
    )
  }

  return (
    <div id="countdown" className="section-padding bg-img bg-fixed" data-background="images/banner-1.jpg">
      <div className="container">
        <div className="row">
          <div className="section-head col-md-12">
            <h4>Nos tornaremos uma família em</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul>
              <li><span>{timeLeft.days}</span> Dias</li>
              <li><span>{timeLeft.hours}</span> Horas</li>
              <li><span>{timeLeft.minutes}</span> Minutos</li>
              <li><span>{timeLeft.seconds}</span> Segundos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Countdown
