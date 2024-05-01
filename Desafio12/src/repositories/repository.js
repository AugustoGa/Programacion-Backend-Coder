const MessageFactory = require('../adapters/factory')
const MessageRepository = require('./messagesRepository')

const messageManager = new MessageRepository(new MessageFactory())

module.exports = messageManager