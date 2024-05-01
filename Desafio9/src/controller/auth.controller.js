const { Router } = require('express')
const Users = require('../service/user.service')
const HTTP_RESPONSES = require('../contants/http-responses')
const passport = require('passport')
const { createHash } = require('../utils/cryp-password.util')

const users = new Users()

const AuthRouter = Router()


AuthRouter.post ('/', passport.authenticate('login', {failureRedirect: '/auth/fail-login'}) , async (req, res) => {
    try {
        const {email} = req.body
        const user = await users.getOneUser({email})
        if (!user) {
            return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ message: 'Error AuthController' })
        }

        const lowercaseEmail = email.toLowerCase();

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: lowercaseEmail,
            age: req.user.age,
            role: req.user.role,
        }
        res.status(HTTP_RESPONSES.OK).json ({status: 'success', message: 'Login Succesfull'})
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: 'Error Auth Met Post' })
    }
})

AuthRouter.get('/fail-login', (req, res) => {
    console.log ('Fallo el logueo')
    res.status().json({status: 'error',  error: 'bad Request' })
})

AuthRouter.get('/logout', async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ error: ' Error logout Get' });
            } else {
                return res.status(HTTP_RESPONSES.OK).json({ message: 'Logout successful' });
            }
        });
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error })
    }
})

AuthRouter.post('/forgotPassword', async (req, res) => {
    try {
        const {email,password} = req.body
        const passwordEncrypted = createHash(password)
        //await Users.updateOne ({email}, {password: passwordEncrypted})
        res.status(200).json ({status: 'Success', message: 'Password Updated'})
    } catch (error) {
    console.error ('Error:', error.message)
    res.status(500).json({ error: error })
    }
})

AuthRouter.get('/github', passport.authenticate('github', {scope: ['user: email']}, (req, res) => {}))

AuthRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}),
    (req, res) => {
    req.session.user = req.user
    res.redirect('/profile')
    }
)

module.exports = AuthRouter