const mongoose = require ('mongoose')

const userColletion = 'user'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
    },
    age:  {
        type: Number,
        require: true,
    },
    password:  {
        type: String,
        require: true,
    },
    role: {
        type:String,
        enum: ['user', 'admin'],
        require: true,
        default: 'user'
    } 
})

const Users = mongoose.model (userColletion, userSchema)

module.exports = Users