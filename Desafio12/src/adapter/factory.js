const { environment } = require('../config/db.config')

switch (environment) {
  case 'dev':
    console.log('Usando nodemailer')
    module.exports = require('./mailAdapter')
    break

  case 'prod':
    console.log('Usando twilio')
    module.exports = require('./smsAdapter')
    break

  default:
    break
}