const HTTP_RESPONSES = require('../contants/http-responses')
const authorization = role => {
    return (req,res,next) => {
        if (!req.user)
            return res.status(HTTP_RESPONSES.BAD_REQUEST)

        if(req.user.role != role)
            return res.status(HTTP_RESPONSES.FORBIDDEN)
        next()
    }
}

module.exports = authorization