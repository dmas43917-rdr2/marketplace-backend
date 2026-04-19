const db = require('../config/db');
const { validationResult } = require('express-validator');

exports.getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    try {
        const result = await db.query(
            `SELECT
              products.*,
              users.email 
            FROM products
            JOIN users ON 
        products.user_id = users.id
            WHERE products.name ILIKE $1
            LIMIT $2 OFFSET $3
            `, [`%${search}%`, limit, offset]
        );

        res.json({
            page,
            limit,
            data: result.rows
        });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const result = await db.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProduct = async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { name, price } = req.body;
    const  userId = req.user.id;

    try {
        const result = await db.query(
            'INSERT INTO products (name, price, user_id) VALUES ($1, $2, $3) RETURNING *',
            [name, price, userId] 
        );

        res.json({
            message: 'Produk berhasil ditambahkan',
            data: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const userId = req.user.id;

    try {
        const result = await db.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        const product = result.rows[0];

        if (Number(product.user_id) !== Number(userId)) {
            return res.status(403).json({ message: 'Kamu tidak berhak mengedit produk ini' });
        } 

        await db.query('UPDATE products SET name = $1, price = $2 WHERE id = $3',
            [name, price, id]
        );

        res.json({ message: 'Produk berhasil diupdate' });
    } catch (err) {
        res.status(500),json({ message: err.message });
    }
};

exports.deleteProduct = async (req,res) => {
    const id = parseInt(req.params.id);
    const userId = req.user.id;

    try {
        const result = await db.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'produk tidak ditemukan' });
        }

        const product = result.rows[0];

        if (Number(product.user_id) !== Number(userId)) {
            return res.status(403).json({ message: 'kamu tidak berhak menghapus produk ini' });
        }

        await db.query(
            'DELETE FROM products WHERE id = $1',
            [id]
        );

        res.json({ message: 'Produk berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
};

exports.getMyProducts = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await db.query(
            'SELECT * FROM products WHERE user_id = $1',
            [userId]
        );

    res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};