
const ProductsModel = require("../models/products.model")

class ProductsDao{
    async getProducts(options) {
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
        console.error(' Error getProducts', error)
        throw error
      }
      }
    
      async createdProducts(newUserInfo) {
        try {
          console.log('Creado desde el DAO')
          return await ProductsModel.create(newUserInfo)
        } catch (error) {
          console.error('error createdProducts', error)
          throw error
        }

      }
    
    async getProductById(id){
      try {
        const products = await ProductsModel.findOne({ _id: id , status: true})
        return products
      } catch (error) {
        console.error('error getProductByID', error)
        throw error
      }
    }
    async updateProduct(id , updateData){
      try {
        const products = await ProductsModel.updateOne({ _id: id }, updateData)
        return products
      } catch (error) {
        console.error('error updateProduct', error)
        throw error
      }
    }
};

module.exports = ProductsDao;