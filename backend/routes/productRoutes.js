import express from 'express';
// import asyncHandler from '../middleware/asyncHandler.js';
// import Product from '../models/productModel.js';
// import products from '../data/products.js';
import { getAllProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
// router.route('/').get(getProducts);  
router.get('/:id', getProductById);

export default router;