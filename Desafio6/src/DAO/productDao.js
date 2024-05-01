const ProductsModel = require("../models/products.model")

class ProductsDao{
    async getProducts() {
      try {
        return await ProductsModel.find({status: true})
      } catch (error) {
        console.error('error getProducts', error)
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