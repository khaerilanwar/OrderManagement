import express from 'express';
import { createNewProductCategory, deleteProductCategory, getAllProductCategories, updateProductCategory } from '../controllers/ProductController.js';

const productRoute = express.Router();

productRoute.get('/category', getAllProductCategories)
productRoute.post('/category', createNewProductCategory)
productRoute.put('/category/:id', updateProductCategory)
productRoute.delete('/category/:id', deleteProductCategory)

export default productRoute;