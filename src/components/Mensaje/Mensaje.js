const Nexmo = require('nexmo')
const nexmo = new Nexmo({
  apiKey: '8dd0cb56',
  apiSecret: 'QFFiJGi80cQH9cXc'
})

const from = 'Nexmo'
const to = '522282220235'
const text = 'Hello from Nexmo'

nexmo.message.sendSms(from, to, text)
