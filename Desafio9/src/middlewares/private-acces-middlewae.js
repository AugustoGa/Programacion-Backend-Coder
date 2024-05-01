const HTTP_RESPONSES = require("../contants/http-responses")

function authMiddleware (req, res, next) {
    try {
        if (req.session.user) return next ()
        res.redirect('/login')
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(HTTP_RESPONSES.UNAUTHORIZED).json({ error: error })
    }
}

module.exports = authMiddleware