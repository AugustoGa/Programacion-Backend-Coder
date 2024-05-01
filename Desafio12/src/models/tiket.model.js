const mongoose = require('mongoose')


const tiketsCollection = 'tiket'

const tiketsChema = new mongoose.Schema({
    code : {
        type : String,
        required : true
    },
    purchase_datetime : {
        type : Date,
        default : () => new Date().toLocaleString("es-AR", {timeZone: "America/Argentina/Buenos_Aires"})
    },
    amount : {
        type : Number,
        required : true 
    },
    purchaser : {
        type : String,
        required : true
    }
})



const TiketModel = mongoose.model(tiketsCollection , tiketsChema)
module.exports = TiketModel