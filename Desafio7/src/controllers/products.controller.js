const { Router } = require ('express');
const ProductsModel = require('../models/products.model');
const HTTP_RESPONSES = require('../constants/http-resposes');
const ProductService = require('../service/products.service');
const ProductsDao = require('../DAO/productDao');

const ProductRouter = Router();


ProductRouter.get('/', async (req, res) => {
    try {
        const { page, limit, sort, category, stock } = req.query;
        const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 2,
            sort:parseInt(sort) || 0,
            category:parseInt(category) || 0,
            stock:parseInt(stock) || 0
        };

        // Obtener los productos paginados
        const paginatedProducts = await ProductService.getAll(options);

        // Extraer datos de paginación del resultado paginado
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = paginatedProducts;

        // Renderizar la vista 'index' con los datos obtenidos
        res.render('index', {
            products: docs, // Usar 'docs' para obtener los productos
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        });
    } catch (error) {
        // Manejar errores
        console.error('Error al obtener y renderizar productos:', error);
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }



    /* Codigo sin renderizar HBS
    try {
        const { page , limit } = req.query;
        const products = await ProductService.getAll(page , limit , {status: true});
        res.json( { products  })
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
    */
})

ProductRouter.get('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await ProductService.getOne(id);
        res.json({ payload: product})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

ProductRouter.post('/', async(req, res)=>{ 
    try {
        const {        
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = req.body

        const newProductInf ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const newProduct = await ProductService.inserOne(newProductInf);
        res.json({ payload: newProduct })
        res.status(HTTP_RESPONSES.CREATED)
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


ProductRouter.put('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const body = req.body
        await ProductService.Update({ _id: id, status: true}, body )
        res.json({ payload: 'Product update'})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


ProductRouter.delete('/:id', async(req, res)=>{  //SOFT DELETE
    try {
        const {id} = req.params
        await ProductService.Update({ _id: id}, { status: false})
        res.json({ payload: 'Product deleted (soft delete)'})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


module.exports = ProductRouter;