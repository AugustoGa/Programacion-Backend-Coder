const HTTP_RESPONSES = require("../contants/http-responses")

function publicAcces ( req , res , next ) {
    try {
        const token = req.headers.authorization
        if ( !token ) {
            next()
        }
    } catch (error) {
        res.status(HTTP_RESPONSES.FORBIDDEN)
    }
}

module.exports = publicAcces