const { Router } = require('express');
const ProductService = require('../service/product.service');
const HTTP_RESPONSES = require('../constants/http-responses');

const ProductRouter = Router();

ProductRouter.get('/', async (req, res) => {
    try {
        const { page, limit, sort, category, stock } = req.query;
        const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 2,
            sort: parseInt(sort) || 0,
            category: parseInt(category) || 0,
            stock: parseInt(stock) || 0,
        };
        const paginatedProducts = await ProductService.getAll(options);
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = paginatedProducts;
        res.render('index', {
            products: docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        });
    } catch (error) {
        console.error('Error getting and rendering products', error);
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error });
    }
});

ProductRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getOne(id);
        res.json({ payload: product });
    } catch (error) {
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error });
    }
});

ProductRouter.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category
        } = req.body;
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category
        };
        const product = await ProductService.insertOne(newProduct);
        res.status(HTTP_RESPONSES.CREATED).json({ payload: product });
    } catch (error) {
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error });
    }
});

ProductRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = await ProductService.update({ _id: id, status: true }, body);
        res.status(HTTP_RESPONSES.OK).json({ payload: product });
    } catch (error) {
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error });
    }
});

// SOFT DELETE
ProductRouter.delete('/:id', async (req, res) => {
    try {
        // Implementa lógica de eliminación suave (soft delete) aquí
    } catch (error) {
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error });
    }
});

module.exports = ProductRouter;
