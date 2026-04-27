const db = require('../config/db');

exports.getAllProducts = async ({ search, limit, offset, orderQuery }) => {
    const result = await db.query (
        `
        SELECT products.*, users.email
        FROM products
        JOIN users ON products.user_id = users.id
        WHERE products.name ILIKE $1 ${orderQuery} LIMIT $2 OFFSET $3
        `,
        [`%${search}%`, limit, offset]
    );

    return result.rows;
};