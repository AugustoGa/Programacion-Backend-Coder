const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const authMiddleware = require('../middlewares/private-acces-middlewae')
const publicAcces = require('../middlewares/public-acces-middleware')

const ViewsRouter = Router()

ViewsRouter.get('/login', publicAcces , async(req , res) =>{
    try {
        res.render('login')
    } catch (error) {
        console.error(' Error get Login (Views Controller)', error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ViewsRouter.get('/signup', publicAcces , async(req , res) =>{
    try {
        res.render('signup')
    } catch (error) {
        console.error(' Error get Signup (Views Controller)', error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ViewsRouter.get('/profile', authMiddleware , async(req , res) =>{
    try {

        res.render('profile')
    } catch (error) {
        console.error(' Error get Profile (Views Controller)', error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ViewsRouter.get('/forgotPassword', async (req, res) => {
    try {
        res.render ('forgotPassword')   
    } catch (error) {
        console.error ('Error get Profile (Views Controller)', error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }})

module.exports = ViewsRouter