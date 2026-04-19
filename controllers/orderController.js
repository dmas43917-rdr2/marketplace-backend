const db = require('../config/db');

exports.createOrder = async (req, res) => {
    const userId = req.user.id;
    const { product_id } = req.body;

    try {
        const productResult = await db.query(
            'SELECT * FROM products WHERE id = $1',
            [product_id]
        );

        if (productResult.rows.length === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        const product = productResult.rows[0];

        if (Number(product.user_id) === Number(userId)) {
            return res.status(403).json({ message: 'Tidak bisa membeli produk sendiri' });
        }

        const existingOrders = await db.query(
            'SELECT * FROM orders WHERE user_id = $1 AND  product_id = $2',
            [userId, product_id]
        );

        if (existingOrders.rows.length > 0) {
            return res.status(400).json({ message: 'Kamu sudah membeli produk ini' });
        }

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

exports.getMyOrders = async (req, res) => {
    const userId = req.user.id;

    try {
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
            `, [userId]);

            res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};