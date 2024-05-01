const ProductDao = require('../Dao/productDao')

const productDao = new ProductDao()

const inserOne = async (newProduct) =>{
    try {
        const product = await productDao.createdProduct(newProduct)
        return product
    } catch (error) {
        throw error , 'Error inserOne'
    }
}

const getAll = async (options) =>{
    try {
        const product = await productDao.getProducts(options)
        return product
    } catch (error) {
        throw error , 'Error getAll'
    }
}

const getOne = async (id) =>{
    try {
        const product = await productDao.getProductById(id)
        return product
    } catch (error) {
        throw error , 'Error getOne'
    }
}

const Update = async (id , updateData) =>{
    try {
        const product = await productDao.updateProduct({ _id : id }, updateData)
        return product
    } catch (error) {
        throw error , 'Error Update'
    }
}

module.exports = { inserOne , getAll , getOne , Update }