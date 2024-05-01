const productsController = require('../controller/product.controller');
const cartsController = require('../controller/product.controller');
const chatController = require('../controller/chat.controller')
const authController = require ('../controller/auth.controller')
const viewsController = require ('../controller/views.controller')
const usersController = require ('../controller/user.controller')

const Router = app =>{
    app.use('/products', productsController);
    app.use('/carts', cartsController);
    app.use('/chat', chatController)
    app.use('/api/auth', authController)
    app.use('/', viewsController)
    app.use('/api/users', usersController)
}

module.exports = Router;