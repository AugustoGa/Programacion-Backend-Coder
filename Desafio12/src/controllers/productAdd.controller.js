const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const authenticated = require('../middlewares/authorized-middleware')


const ProductAdd = Router()

ProductAdd.get('/', authenticated('admin'), async (req, res) => {
    try {
     res.render ('productInCart')   
    } catch (error) {
        console.error ('Error products:', error)
        res.status(HTTP_RESPONSES.NOT_FOUND)
    }
})

module.exports = ProductAdd