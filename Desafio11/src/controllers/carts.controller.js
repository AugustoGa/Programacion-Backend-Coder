const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const Cart = require('../services/cart.service')
const Product= require('../services/products.service')


const CartsRouter = Router()


CartsRouter.post('/', async(req, res)=>{
    try {
        const carts = await Cart.createCart;
        res.json({ payload: carts})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }

})

CartsRouter.get('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const cart = await Cart.cartId({ _id : id});
        res.json({ payload: cart})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

CartsRouter.get('/', async(req, res)=>{
    try {
        const cart = await Cart.allCarts()
        res.render('carts',{  cart})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

CartsRouter.post('/:cid/products/:pid', async(req, res)=>{ 
    try {
        const { cid , pid } = req.params;
        const product = await Product.productId(pid) 
        if (!product) {
            return res.status(404).json({ error: 'El producto con el ID proporcionado no existe.' })
        }
        const newCart = await Cart.productInCart(cid, pid); //cartsService.Add
        res.json({ payload: newCart })
        res.status(HTTP_RESPONSES.CREATED)
    } catch (error) {
        console.error('error en post', error)
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})



//-----------------------------------------------------------------------------------------




//PUT api/carts/:cid (✔)
//deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
CartsRouter.put('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const {products} = req.body
        await Cart.cartUpdate(id , products) //cartsService.updateCart
        res.json({ payload: 'Cart updated successfully'})
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: 'Error put'})
    }
})


//PUT api/carts/:cid/products/:pid (✔)
//deberá poder actualizar SÓLO la cantidad de ejemplares del producto,
//por cualquier cantidad pasada desde req.body
CartsRouter.put('/:cid/products/:pid', async(req, res)=>{
    try {
        const { cid , pid } = req.params
        const { quantity } = req.body
        if(!mongoose.Types.ObjectId.isValid( pid )){
            return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ error: 'Invalid Product (id)'})
        }
        if(!mongoose.Types.ObjectId.isValid( cid )){
            return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ error: 'Invalid Cart (id)'})
        }

        const result = await Cart.productInCart( pid , cid , quantity ) 

        if( result.success ){
            res.status(HTTP_RESPONSES.OK).json({ success : result.message})
        }else {
            res.status(HTTP_RESPONSES.NO_CONTENT).json({ success : result.message})
        }
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: 'Error PUT'})
    }
})

//DELETE api/carts/:cid/products/:pid  (✔)
//deberá eliminar del carrito el producto seleccionado.
CartsRouter.delete('/:cid/products/:pid', async(req, res)=>{  
    try {
        const { cid , pid } = req.params
        if(!mongoose.Types.ObjectId.isValid( pid )){
            return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ error: 'Invalid Product (id)'})
        }
        const cart = await Cart.cartId({ _id : cid })
        if( !cart ){
            return res.status(HTTP_RESPONSES.NOT_FOUND).json({ error: 'Cart not found' });
        }
        const product = await Product.productId( pid )
        if( !product ){
            return res.status(HTTP_RESPONSES.NOT_FOUND).json({ error: 'Product not found'})
        }
        await Cart.removed( cid , pid )
        res.json({ payload: 'Product successfully removed from cart'})
    } catch (error) {
        console.error(error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: 'Error delete'})
    }
})


//DELETE api/carts/:cid (✔)
//deberá eliminar todos los productos del carrito 
CartsRouter.delete('/:id', async(req, res)=>{  
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid( id )){
            return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ error: 'Invalid id'})
        }
        const cart = Cart.deleted({ _id : id})
        res.json({ payload: 'Cart deleted '})
        return cart
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: 'Error delete'})
    }
})


module.exports = CartsRouter;