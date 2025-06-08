import express from 'express';
import { createNewProduct, createNewProductCategory, deleteProductCategory, getAllProductCategories, updateProduct, updateProductCategory, updateProductStatus } from '../controllers/ProductController.js';
import Upload from '../middleware/Upload.js';

const productRoute = express.Router();

// Product routes
productRoute.post('/', Upload.single('image'), createNewProduct)
productRoute.put('/:id', Upload.single('image'), updateProduct)
productRoute.patch('/:id', updateProductStatus)

// Product categories routes
productRoute.get('/category', getAllProductCategories)
productRoute.post('/category', createNewProductCategory)
productRoute.put('/category/:id', updateProductCategory)
productRoute.delete('/category/:id', deleteProductCategory)

export default productRoute;