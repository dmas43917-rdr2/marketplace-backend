const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

router.post('/', authMiddleware, asyncHandler(orderController.createOrder));
router.get('/', authMiddleware, asyncHandler(orderController.getAllOrders));
router.get('/my-orders', authMiddleware, asyncHandler(orderController.getMyOrders));

module.exports = router;