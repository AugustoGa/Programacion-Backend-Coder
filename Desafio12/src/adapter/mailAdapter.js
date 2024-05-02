const transport = require('../utils/mail.util');
const { userEmail } = require('../config/db.config');

class MailAdapter {
    async sendMessage(messageInfo) {
        await transport.sendMail({
            from: userEmail.identifier,
            to: messageInfo.email,
            subject: 'Bienvenido!!!',
            html: `
                <h1>Hola ${messageInfo.first_name}</h1>
                <p>Visita nuestra página web</p>
            `
        });
    }
}

module.exports = MailAdapter;