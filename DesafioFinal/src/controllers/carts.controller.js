const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const Cart = require('../services/cart.service')
const Product= require('../services/products.service')
const authorization = require('../middlewares/authorized-middleware')
const separateStocks = require('../utils/separateStocks.util')


const CartsRouter = Router()

//Crea el carrito
CartsRouter.post('/',authorization(['user', 'admin']), async(req, res)=>{
    try {
        const carts = await Cart.createCart();
        res.json({ payload: carts})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }

})
//Muestra el carrito
CartsRouter.get('/:id',authorization(['user', 'admin']), async(req, res)=>{
    try {
        const {id} = req.params
        const { user } = req.user
        const cart = await Cart.cartId({ _id : id});
        if (!cart) {
            return res.status(HTTP_RESPONSES.FORBIDDEN).json({ error: 'El carrito con el ID buscado no existe.'})
        }else {
            const { subtotal, total } = calculateSubtotalAndTotal(cart.products)
              res.render ('cart', { 
                user,
                subtotal,
                cart,
                total,
            })
        }
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})
//llama a todos los carrito (solo el admin puede)
CartsRouter.get('/',authorization('admin'), async(req, res)=>{
    try {
        const cart = await Cart.allCarts()
        res.render('carts',{  cart})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

//Crear tiket (orden de compra)
CartsRouter.post('/:cid/purchase', async (req, res) => {
    try {
        const { cid } = req.params
        const { user } = req.user
        const cart =  await Cart.cartId(cid)
        if (!cart) {
            return res.status(404).json({ error: 'El carrito con el ID buscado no existe.'})
        }   
        // evaluar stock y divido en 2 arrays
        const { productsInStock, productsOutOfStock } = separateStocks(cart.products)
        // descuento del stock los productos comprados
        await Product.updateStock(productsInStock)
        // actualizo el carrito con los productos solo sin stock
        const updatedCart = await Cart.updatePro(cid, productsOutOfStock)
        if (!updatedCart.success) {
            return res.status(500).json({ error: updatedCart.message })
        }
        // Calcular el total del carrito
        const { total }  = calculateSubtotalAndTotal(productsInStock)
        const NewTicketInfo = new NewPurchaseDTO (total, user)
        const order = await Cart.createTiket(NewTicketInfo) 
        const orderNumber = order.createdOrder.code
        res.status(201).json({ 
            message: 'ticket creado correctamente',
            total: total,
            orderNumber: orderNumber,
        })    
    } catch (error) {
        console.error('Error al crear una orden:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

//mostrar el ticket creado
CartsRouter.get('/:cid/purchase', async (req, res) => {
    try {
        const { cid } = req.params
        const { user } = req.user
        const { total, orderNumber } = req.query
        const cart =  await Cart.cartId(cid)
        if (!cart || !user) {
            return res.status(HTTP_RESPONSES.FORBIDDEN).json({ error: 'Error a ver la orden de compra.'})
        } 
        res.render ('ticket', { 
            user,
            total,
            orderNumber,
        })
    } catch (error) {
        console.error ('Error al obtener el ticket:', error.message)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
    }
})


//Agrega un producto al carrito

CartsRouter.post('/:cid/products/:pid',authorization(['user', 'admin']), async(req, res)=>{ 
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
CartsRouter.put('/:id',authorization(['user', 'admin']), async(req, res)=>{
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
CartsRouter.put('/:cid/products/:pid',authorization(['user', 'admin']), async(req, res)=>{
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
CartsRouter.delete('/:cid/products/:pid',authorization(['user', 'admin']), async(req, res)=>{  
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
CartsRouter.delete('/:id',authorization(['user', 'admin']) , async(req, res)=>{  
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