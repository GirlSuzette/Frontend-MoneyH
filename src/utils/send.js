const Nexmo = require('nexmo')

const send = () => {
  const nexmo = new Nexmo({
    apiKey: '00eabd5f',
    apiSecret: 'CpLhv8kQK6zDqg8M'
  })

  const from = 'Nexmo'
  const to = '525610591995'
  const text = `Add Income`

  nexmo.message.sendSms(from, to, text)
}

export default send