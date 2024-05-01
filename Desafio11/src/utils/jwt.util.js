const jwt = require('jsonwebtoken')
const { mySecret } = require('../config/db.config')

const generateToken = user => {
    const playload = {
        sub: user._id,
        email: user.email
    }
    return jwt.sign( playload , mySecret , { expiresIn: '1h' })
}

module.exports = { generateToken }

