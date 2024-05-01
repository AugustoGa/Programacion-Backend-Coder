const ProductsDao = require('../DAO/productDao')



const productsDao = new ProductsDao();



const inserOne = async (newProductInf) =>{
    try {
        const newProduct = await productsDao.createdProducts(newProductInf)
        return newProduct
    } catch (error) {
        throw error
    }
}

const getAll = async (options) => {
    try {
        const products = await productsDao.getProducts(options);
        return products;
    } catch (error) {
        throw error;
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