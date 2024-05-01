const { Router } = require ('express');
const HTTP_RESPONSES = require('../constants/http-resposes');
const cartsService = require('../service/carts.service')
const productService = require('../service/products.service')

const CartsRouter = Router();


CartsRouter.post('/', async(req, res)=>{
    try {
        const carts = await cartsService.inserOne();
        res.json({ payload: carts})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }

})

CartsRouter.get('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const cart = await cartsService.getOne({ _id : id, status: true});
        res.json({ payload: cart})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

CartsRouter.post('/:cid/products/:pid', async(req, res)=>{ 
    try {
        const { cid , pid } = req.params;
        const product = await productService.getOne(pid)
        if (!product) {
            return res.status(404).json({ error: 'El producto con el ID proporcionado no existe.' })
        }
        const newCart = await cartsService.Add(cid, pid);
        res.json({ payload: newCart })
        res.status(HTTP_RESPONSES.CREATED)
    } catch (error) {
        console.error('error en post', error)
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


CartsRouter.put('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const body = req.body
        await cartsService.Update({ _id: id, status: true}, body )
        res.json({ payload: 'Cart update'})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


CartsRouter.delete('/:id', async(req, res)=>{  //SOFT DELETE
    try {
        const {id} = req.params
        await cartsService.Update({ _id: id}, { status: false})
        res.json({ payload: 'Product deleted (soft delete)'})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


module.exports = CartsRouter;