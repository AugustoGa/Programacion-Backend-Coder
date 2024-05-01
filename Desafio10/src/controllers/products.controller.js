const { Router } = require('express')
const ProductService = require('../services/products.service')
const HTTP_RESPONSES = require('../contants/http-responses')

const productsService = new ProductService()

const ProductRouter = Router()

ProductRouter.get('/' , async ( req , res ) => {
    try {
        const { page , limit , sort , category , stock } = req.query
        const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 2,
            sort: parseInt(sort) || 0,
            category: parseInt(category) || 0,
            stock: parseInt(stock) || 0,
        }
        const paginateProducts = await productsService.getProducts( options )
        const { docs , hasPrevPage , hasNexPage , nexPage , prevPage } = paginateProducts
        res.status(HTTP_RESPONSES.OK)
        res.render('products', {
            products:
            docs ,
            hasPrevPage ,
            hasNexPage ,
            nexPage ,
            prevPage
        })
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.get('/:id' , async ( req , res ) => {
    try {
        const { id } = req.params
        const product = await productsService.getProductById( id )
        res.status(HTTP_RESPONSES.OK).json({ playload : product})
        return product
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.post('/' , async ( req , res ) => {
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
        const newProduct = await productsService.createdProduct( newProductInf )
        res.status(HTTP_RESPONSES.CREATED).json({ playload : newProduct })
        return newProduct
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.put('/:id' , async ( req , res ) => {
    try {
        const { id } = req.params
        const { body } = req.body
        const productUpdate = await productsService.updateProduct({ _id : id , status : true }, body) 
        res.status(HTTP_RESPONSES.OK).json({ playload : productUpdate })
        return productUpdate
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.delete('/:id' , async ( req , res ) => {
    try {
        const { id } = req.params
        const deleteProduct = await productsService.updateProduct({ _id : id }, { status : false })
        res.status(HTTP_RESPONSES.OK).json({ payload :'Product Deleted (Soft Delete)'}, deleteProduct)
        return deleteProduct
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

module.exports = ProductRouter