const db = require('../config/db');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const productService = require('../services/productService')

exports.getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;
    const sort = req.query.sort || 'newest';

    let orderQuery = 'ORDER BY products.id DESC';

    if (sort === 'price_asc') {
        orderQuery ='ORDER BY products.price ASC';
    } else if (sort === 'price_desc') {
        orderQuery = 'ORDER BY products.price DESC';
    }

    try {
        const result = await productService.getAllProducts({
            search,
            limit,
            offset,
            orderQuery,
        });

        const products = result.map((product) => {
            return {
                ...product,
                image_url: product.image ?`http://localhost:3000/uploads/${product.image}` : null
            };
        });

        res.json({
            page,
            limit,
            data: products
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
    const image = req.file ? req.file.filename : null;

    try {
        const result = await db.query(
            'INSERT INTO products (name, price, user_id, image) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, userId, image] 
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
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    const userId = req.user.id;

    try {
        const productResult = await db.query(
            'SELECT * FROM products WHERE id = $1',
            [productId]
        );

        if (productResult.rows.length === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        const product = productResult.rows[0];

        if (Number(product.user_id) !== Number(userId)) {
            return res.status(403).json({ message: 'Kamu tidak berhak mengedit produk ini' });
        } 

        const image = req.file ? req.file.filename : product.image;

        if (req.file && product.image) {
            const oldImagePath = path.join(__dirname, '../uploads',product.image);

            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

         const result = await db.query('UPDATE products SET name = $1, price = $2, image =$3 WHERE id = $4 RETURNING *',
            [name, price, image, productId]
        );

        res.json({
            message: 'Produk berhasil diupdate',
            data: result.rows[0]
         });

    } catch (err) {
        res.status(500),json({ message: err.message });
    }
};

exports.deleteProduct = async (req,res) => {
    const productId = parseInt(req.params.id);
    const userId = req.user.id;

    try {
        const productResult = await db.query(
            'SELECT * FROM products WHERE id = $1',
            [productId]
        );

        if (productResult.rows.length === 0) {
            return res.status(404).json({ message: 'produk tidak ditemukan' });
        }

        const product = productResult.rows[0];

        /*if (Number(product.user_id) !== Number(userId)) {
            return res.status(403).json({ message: 'kamu tidak berhak menghapus produk ini' });
        }*/

        if (product.image) {
            const imagePath = path.join(__dirname, '../uploads', product.image);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        const result = await db.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [productId]
        );

        res.json({
            message: 'Produk berhasil dihapus',
            data: result.rows[0]
         });
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