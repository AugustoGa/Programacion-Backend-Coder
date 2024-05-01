const express = require('express');
const ProductManager = require('./Product.js')


const app = express();
const port = 3000;

const productManager = new ProductManager('productos.json');

app.get('/products', async (req, res)=>{
    try{
        await productManager.loadProducts();
        const limit = req.query.limit;
        const products = limit 
        ? productManager.getProducts().splice(0, limit)
         : productManager.getProducts();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({error: ' Internal Server Error'});
    }

});

app.get('/products/:pid',async(req, res)=>{
    try{
        await productManager.loadProducts();

        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);

        if(product){
            res.json(product);
        }else{
            res.status(404).json({error: 'Product not found'});
        }
    }catch(error){
        res.status(500).json({error: ' Internal Server Error'});
    }
});


app.listen(port, ()=>{
    console.log(`Server listen al port  ${port}`);
});