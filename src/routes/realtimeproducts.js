import express from 'express';
import ProductManager from '../functions/productManager.js';
export const realTimeProducts = express.Router();
const productManager = new ProductManager('./src/products.json');

realTimeProducts.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts()
        return res.status(200).render('realtimeproducts', {products})
    } catch (error) {
        res.status(500).json({message: 'error'})
    }
});