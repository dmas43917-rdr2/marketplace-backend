const db = require('../config/db');

exports.createOrder = async (req, res) => {
    const userId = req.user.id;
    const { product_id } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO orders (user_id, product_id) VALUES ($1, $2) RETURNING*',
            [userId, product_id]
        );

        res.json({
            message: 'Order berhasil',
            data: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
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

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};