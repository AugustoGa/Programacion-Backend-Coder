const transport = require('../utils/nodemailer.util')
const { userEmail } = require('../config/db.config')

class MailAdapter {
    async sendMessage( messageInfo ){
        await transport.sendMail({
            from: userEmail,
            to: messageInfo.email,
            subject: 'Bienvenido!!!',
            html: `
                <h1>Hola ${messageInfo.first_name}</h1>
                <p>Visita nuesta pagina web</p>
            `,
            /* 
            attachments: [
                {
                    filename: 'nombredelarchivo . png',
                    path: process.cwd() + '/src/public/img/ nombredelarchivo . png',
                    cid: 'nombredelarchivo',
                },
            
            ],
            */
        })
    }
}

module.exports = MailAdapter