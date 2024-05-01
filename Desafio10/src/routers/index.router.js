const productsController = require('../controllers/products.controller')
const cartsController = require('../controllers/carts.controller')
const viewsController = require('../controllers/views.controller')
const authController = require('../controllers/auth.controller')
const usersController = require('../controllers/users.controller')

const Router = app => {
    app.use('/api/products' , productsController)
    app.use('/api/carts' , cartsController)
    app.use('/' , viewsController)
    app.use('/api/auth' , authController)
    app.use('/api/users' , usersController)
}

module.exports = Router;