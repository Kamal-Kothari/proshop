import express from 'express';
// import asyncHandler from '../middleware/asyncHandler.js';
// import Product from '../models/productModel.js';
// import products from '../data/products.js';
import { getAllProducts, getProductById, createProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', getAllProducts);
router.route('/').get(getAllProducts).post(protect, admin, createProduct);  
router.get('/:id', getProductById);

export default router;