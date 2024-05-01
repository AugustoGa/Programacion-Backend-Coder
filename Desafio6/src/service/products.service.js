const ProductsDao = require('../DAO/productDao')
//const ProductManagerDao = require('../DAO/productManagerDao')


const productsDao = new ProductsDao();
//const productsDao = new ProductManagerDao('./models/products.json');


const inserOne = async (newProductInf) =>{
    try {
        const newProduct = await productsDao.createdProducts(newProductInf)
        return newProduct
    } catch (error) {
        throw error
    }
}

const getAll = async () =>{
    try {
        const products = await productsDao.getProducts({status: true})
        return products
    } catch (error) {
        throw error
    }
}

const getOne = async (id) =>{
    try {
        const products = await productsDao.getProductById(id)
        return products
    } catch (error) {
        throw error, 'Error al buscar por id'
    }
}

const Update = async (id , updateData) =>{
    try {
        const products = await productsDao.updateProduct({ _id: id }, updateData)
        return products
    } catch (error) {
        throw error
    }
}

module.exports = { inserOne , getAll , getOne , Update }