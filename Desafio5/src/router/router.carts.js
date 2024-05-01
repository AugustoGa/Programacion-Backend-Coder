const Router = require('express');
const CartManager = require ('../Controllers/CartManager.js');

const carts = new CartManager();

const CartRouter = Router();


CartRouter.post('/', async(req, res)=>{
    res.send(await carts.addCarts());
})

CartRouter.get('/', async(req, res)=>{
    res.send(await carts.readCarts());
})

CartRouter.get('/:id', async(req, res)=>{
    const id = req.params.id; //req.params trae string
    res.send(await carts.getProductsById(id));
})



module.exports = CartRouter;