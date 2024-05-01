const { Router } = require('express')
const Users = require('../service/user.service')
const HTTP_RESPONSES = require('../contants/http-responses')
const passport = require ('passport')

const users = new Users()

const UserRouter = Router()

UserRouter.post ('/', passport.authenticate
('register', {failureRedirect: '/api/users/fail-Register'}),  
async (req, res) => {
    try {
        res.status(HTTP_RESPONSES.CREATED).json({ status: 'success', message: user });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

UserRouter.get ('/fail-Register', (req, res) => {
    console.log ('Fallo registro')
    res.status(HTTP_RESPONSES.NOT_FOUND).json({status: 'error',  error: 'bad Request' })
})

module.exports = UserRouter
