import express from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/')
.post(protect, addOrderItems)
.get(protect, admin, getAllOrders);

router.get('/myOrders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);


export default router;