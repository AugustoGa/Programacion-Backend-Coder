const HTTP_RESPONSES = require('../contants/http-responses')

function authMiddleware ( req , res , next ) {
    try {
        if ( req.user ) return next()
        res.redirect('/login') 
    } catch (error) {
        console.error('Error' , error)
        res.status(HTTP_RESPONSES.UNAUTHORIZED)
    }
}

module.exports = authMiddleware