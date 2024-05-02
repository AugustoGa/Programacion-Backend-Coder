//const  MessageFactory  = require('../adapter/factory');
const MailAdapter = require('../adapter/mailAdapter')
const MessageRepository = require('./messagesRepository');


const messageManager = new MessageRepository(new MailAdapter())
//const messageManager = new MessageRepository( MessageFactory)

module.exports = messageManager