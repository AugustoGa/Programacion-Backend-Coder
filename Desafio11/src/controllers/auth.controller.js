const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const passport = require('passport')
const { createHash, useValidPassword } = require('../utils/cryp-password.util')
const User = require('../services/user.service')



const AuthRouter = Router()

AuthRouter.post('/', passport.authenticate('login', { session: false, failureRedirect: '/auth/fail-login' }),
    async (req, res) => {
        try {
            const userLogin = await User.loginUser(req.body); 
            res.status(HTTP_RESPONSES.CREATED).json({ message: "User successfully registered.", payload: userLogin });
        } catch (error) {
            console.error('Error en la ruta de autenticación:', error);
            return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ message: 'Error interno del servidor' });
        }
    }
);

AuthRouter.get('/fail-login' , ( req , res ) => {
    console.log('fail login')
    res.status(HTTP_RESPONSES.BAD_REQUEST)
})

AuthRouter.get('logout' , async ( req , res ) => {
    try {
        res.status(HTTP_RESPONSES.OK).json({ message: 'Logout successful' }
        )
    } catch (error) {
        console.error('Error get AuthRotuer' , error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

AuthRouter.post('/forgotPassword' , async ( req , res ) => {
    try {
        const { email , password } = req.body
        const passwordEncrypted = createHash( password )
        res.status(HTTP_RESPONSES.OK)
    } catch (error) {
        console.error('Error post AuthRotuer' , error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

AuthRouter.get('/github' , passport.authenticate( 'github' , { scope : [ 'user : email']}, ( req , res )=> {}))

AuthRouter.get('/githubcallback' , passport.authenticate( 'github' , { failureRedirect : '/login'}),
    ( req , res ) => {
        req.session.user = req.user
        res.redirect('/profile')
    })

module.exports = AuthRouter