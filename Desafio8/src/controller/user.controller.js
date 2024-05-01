const { Router } = require('express')
const Users = require('../models/user.model')
const HTTP_RESPONSES = require('../constants/http-responses')



const UserRouter = Router()

UserRouter.post ('/', async (req, res) => {
    try {
        const {first_name,last_name,age,email,password} = req.body
        const newUserInfo = {
            first_name,
            last_name,
            age,
            email,
            password,
        }
        console.log ('NewUserInfo:', newUserInfo)
        const user = await Users.create(newUserInfo)
        res.json({ status: 'success', message: user });
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


module.exports = UserRouter