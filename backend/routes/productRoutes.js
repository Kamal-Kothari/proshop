import express from 'express';
// import asyncHandler from '../middleware/asyncHandler.js';
// import Product from '../models/productModel.js';
// import products from '../data/products.js';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProductById } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', getAllProducts);
router.route('/').get(getAllProducts).post(protect, admin, createProduct);  
router.get('/:id', getProductById);
router.delete('/:id', protect, admin, deleteProductById);
router.put('/:id/edit', protect, admin, updateProduct);

export default router;