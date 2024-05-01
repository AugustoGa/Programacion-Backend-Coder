const ProductsModel = require('../models/products.model')

class ProductDao {

    async createdProduct(newProduct){
        try {
            return await ProductsModel.create(newProduct)
        } catch (error) {
            console.error('Error createdProduct', error)
            throw error
        }
    }

    async getProducts(options){
        try {
            const { page , limit , sort , category , stock } = options
            const query = {status : true }
            const filter = {
                $and: [
                    { status: true },
                    category ? { category: { $eq: category } } : { category : { $exists: true } },
                    stock ? { stock: { $eq: stock } } : { stock : { $exists: true }}
                ]
            }
            const result = await ProductsModel.paginate( query , { page , limit , lean: true , filter , sort: { fieldToSort: -1 } })
            return result
        } catch (error) {
            console.error(' Error getProducts' , error)
            throw error
        }
    }

    async getProductById(id){
        try {
            const product = await ProductsModel.findOne({ _id : id , status: true })
            return product
        } catch (error) {
            console.error(' Error getProductById' , error)
            throw error
        }
    }

    async updateProduct(id , updateData){
        try {
            const product = await ProductsModel.updateOne({ _id: id }, updateData)
            return product
        } catch (error) {
            console.error(' Error updateProduct' , error)
            throw error
        }
    }

}

module.exports = ProductDao