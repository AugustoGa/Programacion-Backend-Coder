const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const passport = require('passport')
const Users = require('../services/user.service')
const authMiddleware = require('../middlewares/private-middleware')

const UserRouter = Router()

UserRouter .post('/', passport.authenticate('register', { session: false, failureRedirect : '/api/users/fail-Register'}),  
    async ( req , res ) => {
        try {
            const newUser = await Users.newUserCart(req.body) 
            res.status(HTTP_RESPONSES.CREATED).json({ message: "User successfully registered.", payload: newUser });
        } catch (error) {
            console.error('Error post UserRouter', error.message)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
        }
    })

    UserRouter.get('/fail-Register', (req, res) => {
        try {
            console.log('fail register')
            res.status(HTTP_RESPONSES.BAD_REQUEST).json({ message: 'Registration failed' });
        } catch (error) {
            console.log(error)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    });
    

    UserRouter.put('/', passport.authenticate(authMiddleware, { session: false, failureRedirect : '/api/users/fail-Register'}),  
    async ( req , res ) => {
        try {
            res.status(HTTP_RESPONSES.CREATED).json({ message: "User successfully registered." , payload: Users});
        } catch (error) {
            console.error('Error post UserRouter', error.message)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
        }
    })

module.exports = UserRouter 