const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productsCollection = 'products'

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    category: String
})

ProductSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model(productsCollection, ProductSchema)
module.exports = ProductModel;