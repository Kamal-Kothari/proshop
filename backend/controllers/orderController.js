import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";


// @desc    create new order
// @route   POST /api/orders
// @access  private
const addOrderItems = asyncHandler(async (req, res) => {
    res.send('add order');
});

// @desc    get my orders
// @route   get /api/orders/myOrders
// @access  private
const getMyOrders = asyncHandler(async (req, res) => {
    res.send('get my orders');
});

// @desc    get order by id
// @route   get /api/orders/:orderId
// @access  private
const getOrderById = asyncHandler(async (req, res) => {
    res.send('get order by id');
});

// @desc    update order to paid
// @route   put /api/orders/:orderId/pay
// @access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid');
});
// @desc    update order to delivered
// @route   put /api/orders/:orderId/deliver
// @access  admin

//ideally this should be a patch request, put means full resource update & patch means partial update
//if user has name , email and we send put with name , it will update name and make email null, 
// whereas patch would update only name and keep email as it is
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});
// @desc    get all orders
// @route   get /api/orders
// @access  admin
const getAllOrders = asyncHandler(async (req, res) => {
    res.send('get all orders');
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
};