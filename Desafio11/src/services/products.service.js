const productsDao = require('../Dao/productsDao')

const Products = new productsDao()

const createProd = async () => {
    try {
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category
        } = req.body

        const newProductInf = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category
        }
        const newProduct = await Products.createdProduct( newProductInf )
    } catch (error) {
        throw error
    }
}

const productId = async ( id ) => {
    try {
        return await Products.getProductById( id )
    } catch (error) {
        throw error
    }
}

const allProducts = async (req) => {
    try {
        const { page, limit, sort, category, stock } = req.query;
        const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 2,
            sort: parseInt(sort) || 0,
            category: parseInt(category) || 0,
            stock: parseInt(stock) || 0,
        };
        const paginateProducts = await Products.getProducts(options);
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = paginateProducts;
        return { docs, hasPrevPage, hasNextPage, nextPage, prevPage };
    } catch (error) {
        throw error;
    }
};

const updateProd = async ( id , updateData ) => {
    try {
        const { id } = req.params
        const { body } = req.body
        const productUpdate = await Products.updateProduct({ _id : id , status : true }, body) 
    } catch (error) {
        throw error
    }
}

const softDelete = async ( id , updateData ) => {
    try {
        const { id } = req.params
        const deleteProduct = await Products.updateProd({ _id : id }, { status : false })
    } catch (error) {
        throw error
    } 
}

module.exports = {
    createProd,
    productId,
    allProducts,
    updateProd,
    softDelete
}