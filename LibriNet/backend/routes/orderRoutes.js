const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to get all orders
router.get('/', orderController.getAllOrders);

// Route to get a single order by ID
router.get('/:id', orderController.getOrderById);

// Route to update order status
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router;