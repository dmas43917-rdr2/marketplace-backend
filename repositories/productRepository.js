const db = require('../config/db');

class ProductRepository {
    async findById({ productId, client = db }) {
        const result = await client.query(
            'SELECT * FROM products WHERE id = $1',
            [productId]
        );

        return result.rows[0];
    }
    
    async findAll({
        search,
        limit,
        offset,
        orderQuery,
    }) {
        const result = await db.query(
            `
            SELECT products.*, users.email
            FROM products
            JOIN users ON products.user_id = users.id
            WHERE products.name ILIKE $1 ${orderQuery} LIMIT $2 OFFSET $3
            `,
            [`%${search}%`, limit, offset]
        );

        return result.rows;
    }

    async findByUserId(userId) {
        const result = await db.query(
            'SELECT * FROM products WHERE user_id = $1',
            [userId]
        );

        return result.rows;
    }

    async create({
        name,
        price,
        userId,
        image,
    }) {
        const result = await db.query(
            'INSERT INTO products (name, price, user_id, image) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, userId, image]
        );

        return result.rows[0];
    }

    async update({
        productId,
        name,
        price,
        image,
    }) {
        const result = await db.query(
            'UPDATE products SET name = $1, price = $2, image = $3 WHERE id = $4 RETURNING *',
            [name, price, image, productId]
        );

        return result.rows[0];
    }

    async delete(productId) {
        const result = await db.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [productId]
        );

        return result.rows[0];
    }
};

module.exports = ProductRepository;