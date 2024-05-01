const Products = require('../models/products.model')

class ProductsDao{
    async createdProduct( newProduct ){
        try{
            return await Products.create( newProduct )
        }catch (error){
            console.error(' Error created Product', error)
        }
    }

    async getProducts( options ){
        try {
            const { page , limit , sort , category , stock } = options || {}
            const query = { status : true }
            const filter = {
                $and: [
                    { status: true },
                    category ? { category: { $eq: category } } : { category : { $exists: true } },
                    stock ? { stock: { $eq: stock } } : { stock : { $exists: true }}
                ]
            }
            const result = await Products.paginate(query , { page , limit , lean: true , filter , sort: { fieldToSort: -1 } })
            return result
        } catch (error) {
            console.error(' Error get Products', error)
        }
    }

    async getProductById( id ){
        try {
            return await Products.findOne({ _id : id , status: true })
        } catch (error) {
            console.error(' Error get Product id', error)
        }
    }

    async updateProduct( id , updateData ){
        try {
            return await Products.updateOne({ _id : id }, updateData )
        } catch (error) {
            console.error(' Error update Product', error)
        }
    }
}

module.exports = ProductsDao