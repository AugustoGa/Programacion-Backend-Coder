const mongoose = require('mongoose')


const usersCollection = 'user'

const usersChema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    carts : {
   type : mongoose.Schema.Types.ObjectId,
    ref : 'carts',
    default : null
    },
    role : {
        type : String,
        enum : ['user' , 'admin' , 'premium'],
        required : true,
        default : 'user'
    },
    documents : [{
        name: String,
        reference: String,
    }],
    last_connection: Date,
    status: Boolean,
    githubId: Number,
    githubUsername: String,
})



const UsersModel = mongoose.model(usersCollection , usersChema)
module.exports = UsersModel