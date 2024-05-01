const ProductsDao = require('../Dao/productsDao')

class ProductRepository {
    constructor() {
        this.Product = new ProductsDao()
    }

    async createdProduct( newProductDTO ){
        try{
            return await this.Product.createdProduct( newProductDTO )
        }catch (error){
            console.error(' Error created Product', error)
        }
    }

    async getProducts( options  ){
        try{
            return await this.Product.getProducts( options  )
        }catch (error){
            console.error(' Error getProducts in repository', error)
        }
    }

    async getProductById( id ){
        try {
            return await this.Product.getProductById( id )
        } catch (error) {
            console.error(' Error get Product id', error)
        }
    }

    async updateProduct( id , updateData ){
        try {
            return await this.Product.updateProduct( id , updateData )
        } catch (error) {
            console.error(' Error update Product', error)
        }
    }

    async updateStock(productsInStock) {
        try {
            return await this.Product.updateStock(productsInStock);
        } catch (error) {
            console.error('Error al actualizar el stock en el repositorio:', error);
            throw error;
        }
    }
}

module.exports = ProductRepository