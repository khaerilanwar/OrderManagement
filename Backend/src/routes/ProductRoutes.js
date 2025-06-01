import express from 'express';
import { createNewProductCategory, deleteProductCategory, getAllProductCategories } from '../controllers/ProductController.js';

const productRoute = express.Router();

productRoute.get('/category', getAllProductCategories)
productRoute.post('/category', createNewProductCategory)
productRoute.delete('/category/:id', deleteProductCategory)

export default productRoute;