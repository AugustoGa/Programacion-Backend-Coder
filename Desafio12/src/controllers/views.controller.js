const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const publicAcces = require('../middlewares/public-middleware')
const authMiddleware = require('../middlewares/private-middleware')


const ViewsRouter = Router()

ViewsRouter.get('/login' , publicAcces , async ( req , res ) => {
    try {
        res.render('login')
    } catch (error) {
        console.error('Error get login', error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ViewsRouter.get('/signup' , publicAcces , async ( req , res ) => {
    try {
        res.render('signup')
    } catch (error) {
        console.error('Error get signup', error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ViewsRouter.get('/profile' , authMiddleware , async ( req , res ) => {
    try {
        res.render('profile')
    } catch (error) {
        console.error('Error get profile', error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ViewsRouter.get('/forgotPassword' , async ( req , res ) => {
    try {
        res.render('forgotPassword')
    } catch (error) {
        console.error('Error get forgotPassword', error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

module.exports = ViewsRouter