const db = require('../config/db');

const orderRepository = {
    async findByUserIdAndProductId({ userId, productId, client = db }) {
        const result = await db.query(
            'SELECT * FROM orders WHERE user_id = $1 AND  product_id = $2',
            [userId, productId]
        );

        return result.rows[0];
    },

    async create({ userId, productId, client = db }) {
         const result = await client.query(
            'INSERT INTO orders (user_id, product_id) VALUES ($1, $2) RETURNING*',
            [userId, productId]
        );

        return result.rows[0];
    },

    async findAll() {
        const result = await db.query (`
            SELECT 
              orders.id AS order_id,
              buyer.email AS buyer_email,
              products.name AS product_name,
              products.price,
              seller.email AS seller_email
            FROM orders
            JOIN users AS buyer ON
        orders.user_id = buyer.id
            JOIN products ON
        orders.product_id = products.id
            JOIN users AS seller ON
        products.user_id = seller.id
        `);

        return result.rows;
    },

    async findByUserId(userId) {
        const result = await db.query(`
            SELECT
               orders.id AS order_id,
               products.name AS product_name,
               products.price,
               seller.email AS seller_email,
               orders.created_at 
            FROM orders
            JOIN products ON
        orders.product_id = products.id
            JOIN users AS seller ON
        products.user_id = seller.id
            WHERE orders.user_id = $1
            `, [userId]
        );

        return  result.rows;
    }
}

module.exports = orderRepository;