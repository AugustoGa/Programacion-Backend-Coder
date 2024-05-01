const { Router } = require ('express');
const ProductsModel = require('../models/products.model');
const HTTP_RESPONSES = require('../constants/http-resposes');
const ProductService = require('../service/products.service')

const ProductRouter = Router();


ProductRouter.get('/', async(req, res)=>{
    try {
        const products = await ProductService.getAll({status: true});
        res.render('home', { products , style: 'style.css' })
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }

})

ProductRouter.get('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await ProductService.getOne(id);
        res.json({ payload: product})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.post('/', async(req, res)=>{ 
    try {
        const {        
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = req.body

        const newProductInf ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const newProduct = await ProductService.inserOne(newProductInf);
        res.json({ payload: newProduct })
        res.status(HTTP_RESPONSES.CREATED)
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


ProductRouter.put('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const body = req.body
        await ProductService.Update({ _id: id, status: true}, body )
        res.json({ payload: 'Product update'})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


ProductRouter.delete('/:id', async(req, res)=>{  //SOFT DELETE
    try {
        const {id} = req.params
        await ProductService.Update({ _id: id}, { status: false})
        res.json({ payload: 'Product deleted (soft delete)'})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


module.exports = ProductRouter;