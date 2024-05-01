const { Router } = require('express')
const Products = require('../services/products.service')
const HTTP_RESPONSES = require('../contants/http-responses')

const ProductRouter = Router()

ProductRouter.get('/' , async ( req , res ) => {
    try {
        const prod = await Products.allProducts(req)
        res.status(HTTP_RESPONSES.OK).render('products', { products: prod.docs });
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.get('/:id' , async ( req , res ) => {
    try {
        const { id } = req.params
        const product = await Products.productId( id )
        res.status(HTTP_RESPONSES.OK).json({ playload : product})
        return product
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.post('/' , async ( req , res ) => {
    try {
        const newProduct = await Products.createProd(req.body)
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
        const productUpdate = await Products.updateProd({ _id : id , status : true }, body) 
        res.status(HTTP_RESPONSES.OK).json({ playload : productUpdate })
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.delete('/:id' , async ( req , res ) => {
    try {
        const { id } = req.params
        const delet = await Products.softDeletes( id )
        res.status(HTTP_RESPONSES.OK).json({ payload :'Product Deleted (Soft Delete)'}, delet)
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

module.exports = ProductRouter