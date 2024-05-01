const mongoose = require('mongoose')
const mongosePaginate = require('mongoose-paginate-v2')

const productsCollection = 'products'

const ProductSchema = new mongoose.Schema({
    title : {
        type: String,
        require: true,
    },
    description : {
        type: String,
        require: true,
    },
    thumbnail : {
        type: String,
        require: true,
    },
    code : {
        type: String,
        require: true,
    },
    price : {
        type: Number,
        require: true,
    },
    stock : {
        type: Number,
        require: true,
    },
    status : {
        type: Boolean,
        require: true,
        default: true
    },
    category : {
        type: Number,
        require: true,
    }
})

ProductSchema.plugin(mongosePaginate)

const ProductModel = mongoose.model(productsCollection, ProductSchema)

module.exports = ProductModel;