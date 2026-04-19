const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/orders', authMiddleware,orderController.createOrder);
router.get('/orders',authMiddleware,orderController.getAllOrders);
router.get('/my-orders',authMiddleware,orderController.getMyOrders);

module.exports = router;