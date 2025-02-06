import express from 'express';
// import asyncHandler from '../middleware/asyncHandler.js';
// import Product from '../models/productModel.js';
// import products from '../data/products.js';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProductById, createReview, getTopProducts } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', getAllProducts);
router.route('/').get(getAllProducts).post(protect, admin, createProduct);  
router.get('/top', getTopProducts); // Must be before /:id, else top will be treated as an id
router.get('/:id', getProductById);
router.delete('/:id', protect, admin, deleteProductById);
router.put('/:id/edit', protect, admin, updateProduct);
router.post('/:id/reviews', protect, createReview);

export default router;