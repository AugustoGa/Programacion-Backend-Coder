const { Router } = require('express')
const Products = require('../services/products.service')
const HTTP_RESPONSES = require('../contants/http-responses')
const authorization = require('../middlewares/authorized-middleware')
const publicAcces = require('../middlewares/public-middleware')


const ProductRouter = Router()

ProductRouter.get('/' ,publicAcces, async ( req , res ) => {
    try {
        const prod = await Products.allProducts(req)
        res.status(HTTP_RESPONSES.OK).render('products', { products: prod.docs });
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})



ProductRouter.get('/:id' ,publicAcces , async ( req , res ) => {
    try {
        const { id } = req.params
        const product = await Products.productId( id )
        res.status(HTTP_RESPONSES.OK).render('oneProduct')
        return product
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.post('/' ,authorization('admin'), async ( req , res ) => {
    try {
        const newProduct = await Products.createProd(req.body)
        res.status(HTTP_RESPONSES.CREATED).res.render('addProduct')  
        return newProduct
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.put('/:id' ,authorization('admin'), async ( req , res ) => {
    try {
        const { id } = req.params
        const productUpdate = await Products.updateProd({ _id : id , status : true }, body) 
        res.status(HTTP_RESPONSES.OK).json({ playload : productUpdate })
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.delete('/:id' ,authorization('admin'), async ( req , res ) => {
    try {
        const { id } = req.params
        const delet = await Products.softDelete( id )
        res.status(HTTP_RESPONSES.OK).json({ payload :'Product Deleted (Soft Delete)'}, delet)
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

module.exports = ProductRouter