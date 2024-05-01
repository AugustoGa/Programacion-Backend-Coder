const jwt = require ('jsonwebtoken')

function publicAcces ( req , res , next ) {
    const token = req.headers.authorization
    if ( !token ) {
        next()
    }
}

module.exports = publicAcces