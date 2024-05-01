const productsController = require('../controllers/products.controller');
const cartsController = require('../controllers/carts.controller');
const chat = require('../controllers/chat.controller')

const Router = app =>{
    app.use('/products', productsController);
    app.use('/carts', cartsController);
    app.use('/chat', chat)
}

module.exports = Router;