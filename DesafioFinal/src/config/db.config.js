require('dotenv').config()

module.exports = {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    ghClientId: process.env.GITHUB_CLIENT_ID,
    ghClientSecret: process.env.GITHUB_CLIENT_SECRET,
    mySecret: process.env.MY_SECRET,
    userEmail: process.env.USER_EMAIL, 
    userPassword: process.env.USER_PASSWORD,
    PortMailer: process.env.PORT_MAILER,
    twilioSID: process.env.TWILIO_ACCOUNT_SID,
    twilioTOKEN: process.env.TWILIO_ACCOUNT_TOKEN,
    twilioNUMBER: process.env.TWILIO_SMS_NUMBER,
    environment: process.env.ENVIRONMENT,
}