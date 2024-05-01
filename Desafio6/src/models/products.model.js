const mongoose = require('mongoose');

const productsCollection = 'products';

const userSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        thumbnail: String,
        code: String,
        stock: Number,
        status: {
          type: Boolean,
          default: true,
        }
      }
)

const ProductsModel = mongoose.model(productsCollection, userSchema);

module.exports = ProductsModel;