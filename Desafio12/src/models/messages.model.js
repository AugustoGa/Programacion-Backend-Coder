const mongoose = require ('mongoose')

const messageCollection = 'message'

const messageSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    message: String,
})

const Message = mongoose.model(messageCollection , messageSchema)

module.exports = Message