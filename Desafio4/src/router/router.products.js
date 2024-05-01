const express = require('express');
const router = express.Router();
const {
     getItem, 
     getItems, 
     postItem, 
     deleteItem, 
     updateProduct
    } = require("../controllers/controller.products");

const {
        getItemCart, 
        getItemsCarts, 
        addProductToCart ,
        addCarts
       } = require("../controllers/controller.carts");



//Products
router.get('/products', getItems);
router.get('/products/:pid', getItem);
router.post('/products', postItem);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteItem);
//Carts
router.get('/carts', getItemsCarts);
router.get('/carts/:id', getItemCart);
router.post('/carts' , addCarts);
router.post('/carts/:id/products/:productid', addProductToCart);

module.exports = router;


