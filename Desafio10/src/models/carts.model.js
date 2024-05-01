const mongoose = require('mongoose')
const Products = require('./products.models')

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema(
    {
        products : [{
            product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : Products,
            required : true
        },
        quantity : {
            type : Number,
            required : true,
            default : 1
        }
        }]
    }
)

const CartsModel = mongoose.model(cartsCollection, cartsSchema)

module.exports = CartsModel