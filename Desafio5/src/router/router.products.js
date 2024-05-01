const Router = require('express');
const ProductManager = require ('../controllers/ProductManager.js');

const product = new ProductManager();

const ProductRouter = Router();


ProductRouter.post('/', async(req, res)=>{
    const newProduct = req.body
    res.send(await product.addProducts(newProduct));
})

ProductRouter.get('/', async(req, res)=>{
    res.send(await product.getProducts());
})

ProductRouter.get('/:id', async(req, res)=>{
    const id = req.params.id; //req.params trae string
    res.send(await product.getProductsById(id));
})

ProductRouter.delete('/:id', async(req, res)=>{
    const id = req.params.id; //req.params trae string
    res.send(await product.deleteProducts(id));
})

ProductRouter.put('/:id', async(req, res)=>{
    const id = req.params.id; //req.params trae string
    const updateProducts = req.body;

    res.send(await product.updateProducts(id, updateProducts));
})


module.exports = ProductRouter;