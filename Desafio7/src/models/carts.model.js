const mongoose = require('mongoose');
const Products = require('./products.model')

const cartsCollection = 'carts';

const userSchema = new mongoose.Schema(
    {
        products:[{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Products,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            }
        }]
    }
)

const CartsModel = mongoose.model(cartsCollection, userSchema);

module.exports = CartsModel;