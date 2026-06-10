const db = require('../config/db');
const productRepository = require('../repositories/productRepository');
const orderRepository = require('../repositories/orderRepository');
const AppError = require('../utils/appError');
const { getMyOrders } = require('../controllers/orderController');

const orderService = {
    async createOrder({ userId, productId }) {
        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const product = await productRepository.findById({ productId, client });

            if (!product) {
                throw new AppError('Produk tidak ditemukan', 404);
            }

            if (Number(product.user_id) === Number(userId)) {
                throw new AppError('Tidak bisa membeli produk sendiri', 403);
            }

            const existingOrders = await orderRepository.findByUserIdAndProductId({ userId, productId, client });

            if (existingOrders) {
                throw new AppError('Kamu sudah membeli produk ini', 400);
            }

            const order = await orderRepository.create({ userId, productId, client });

            await client.query('COMMIT');

            return order;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },

    async getAllOrders() {
        return orderRepository.findAll();
    },

    async getMyOrders(userId) {
        return orderRepository.findByUserId(userId);
    }
};

module.exports = orderService;