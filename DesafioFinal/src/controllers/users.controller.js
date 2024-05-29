const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const passport = require('passport')
const User = require('../services/user.service')
const authMiddleware = require('../middlewares/private-middleware')

const UserRouter = Router()

UserRouter .post('/', passport.authenticate('register', { session: false, failureRedirect : '/api/users/fail-Register'}),  
    async ( req , res ) => {
        try {
            res.status(HTTP_RESPONSES.CREATED).json({ message: "User successfully registered." });
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
            const uid = req.user._id
            const { cart: cid } = req.body
            await User.updateUserCart(uid, cid)
            res.status(HTTP_RESPONSES.CREATED).json({ message: "User successfully registered." });
        } catch (error) {
            console.error('Error post UserRouter', error.message)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
        }
    })

    UserRouter.get ('/user-cart', async (req, res) => {
        try {
            const cid = req.cart._id
            if (!cid) {
                const uid = req.user._id
                const userCart = await User.userId(uid)
                if (!userCart) {
                    return res.status(HTTP_RESPONSES.NOT_FOUND).json({ error: 'Usuario no encontrado' })
                }
                res.status(HTTP_RESPONSES.OK).json({status: 'success', cid: userCart})
            }
        } catch (error) {
            console.error('error:', error.message)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
        }
    })

module.exports = UserRouter 