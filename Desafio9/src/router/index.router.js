
const authController = require ('../controller/auth.controller')
const viewsController = require ('../controller/views.controller')
const usersController = require ('../controller/user.controller')

const Router = app =>{

    app.use('/api/auth', authController)
    app.use('/', viewsController)
    app.use('/api/users', usersController)
}

module.exports = Router;