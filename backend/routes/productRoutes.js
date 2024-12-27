import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
// import products from '../data/products.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  }));
  
router.get('/:id', asyncHandler(async (req, res) => {
    // const product = products.find((p) => p._id === req.params.id);
    const product = await Product.findById(req.params.id);

    if(product){
        res.json(product);
    } else {
        res.status(404).send('Product not found');
        // throw new Error('Product not found');
    }
}));

export default router;