const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')


const ProductAdd = Router()

ProductAdd.get('/', async (req, res) => {
    try {
     res.render ('productAdd')   
    } catch (error) {
        console.error ('Error products:', error)
        res.status(HTTP_RESPONSES.NOT_FOUND)
    }
})

module.exports = ProductAdd