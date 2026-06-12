const db = require('../config/db');
const orderService = require('../container/orderContainer');
const response = require('../utils/response');


exports.createOrder = async (req, res) => {
    const userId = req.user.id;
    const { product_id: productId, } = req.body;

    const order = await orderService.createOrder({ userId, productId });

    return response.success(res, 'Order berhasil', order);
};

exports.getAllOrders = async (req, res) => {
    const order = await orderService.getAllOrders();

    return response.success(res,'Semua order ditemukan', order);
};

exports.getMyOrders = async (req, res) => {
    const userId = req.user.id;

    const order = await orderService.getMyOrders(userId);

    return response.success(res, 'Orderan ditemukan', order)
};