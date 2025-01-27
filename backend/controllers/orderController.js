import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";


// @desc    create new order
// @route   POST /api/orders
// @access  private
const addOrderItems = asyncHandler(async (req, res) => {
    // res.send('add order');
    //get necessary data from req.body
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    // get from frontend 
    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items');
        // return;// cant reach here as return is after throw
    }else{
        //refer to order model
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                // name: x.name,
                // qty: x.qty,
                // image: x.image,
                // price: x.price,
                ...x,   //use spread for rest of the properties which are not changed
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id, // protect middleware will add user to req, and this controller will run after protect middleware
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            //not sending isPaid and isDelivered as its default value is false

        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
    
});

// @desc    get my orders
// @route   get /api/orders/myOrders
// @access  private
const getMyOrders = asyncHandler(async (req, res) => {
    // res.send('get my orders');
    const orders = await Order.find({ user: req.user._id });    //we have user field in order model, which stores user id
    res.status(200).json(orders);
});

// @desc    get order by id
// @route   get /api/orders/:id
// @access  private
const getOrderById = asyncHandler(async (req, res) => {
    // res.send('get order by id');
    const order = await Order.findById(req.params.id).populate('user', 'name email');
        //as we have user field in order model, which stores user id we need to populate it to get name and email
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    update order to paid
// @route   put /api/orders/:id/pay
// @access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // res.send('update order to paid');
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
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
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
};