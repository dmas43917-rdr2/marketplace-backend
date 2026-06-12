const db = require('../config/db');
const AppError = require('../utils/appError');

class OrderService {
    constructor(orderRepository, productService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
    } 
    async createOrder({ userId, productId }) {
        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const product = await this.productService.getProductById({ productId, client });

            if (Number(product.user_id) === Number(userId)) {
                throw new AppError('Tidak bisa membeli produk sendiri', 403);
            }

            const existingOrders = await this.orderRepository.findByUserIdAndProductId({ userId, productId, client });

            if (existingOrders) {
                throw new AppError('Kamu sudah membeli produk ini', 400);
            }

            const order = await this.orderRepository.create({ userId, productId, client });

            await client.query('COMMIT');

            return order;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async getAllOrders() {
        return this.orderRepository.findAll();
    }

    async getMyOrders(userId) {
        return this.orderRepository.findByUserId(userId);
    }
};

module.exports = OrderService;