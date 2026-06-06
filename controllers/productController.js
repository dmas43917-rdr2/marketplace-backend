const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const redisClient = require('../config/redis');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');
const response = require('../utils/response');

const productService = require('../services/productService');

exports.getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;
    const sort = req.query.sort || 'newest';
    
    const cacheKey = `products:page:${page}:limit:${limit}:sort:${sort}`;
    let cacheData = null;
    
    if (redisClient.isOpen) {
    try {
        cacheData = await redisClient.get(cacheKey);
    } catch (err) {
        console.log('Redis GET error:', err.message);
        }
    }

    if (cacheData) {
        
        logger.info(`Products served from redis. key=${cacheKey}`);
        
        return response.success(
            res,
            'Produk berhasil diambil',
            {
            source: 'redis',
            ...JSON.parse(cacheData),
            }
        );
    }

    let orderQuery = 'ORDER BY products.id DESC';

    if (sort === 'price_asc') {
        orderQuery ='ORDER BY products.price ASC';
    } else if (sort === 'price_desc') {
        orderQuery = 'ORDER BY products.price DESC';
    }

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

    const responseData = {
        page,
        limit,
        data: products
    };

    try {
        await redisClient.setEx(
        cacheKey,
        60,
        JSON.stringify(responseData)
        );
    } catch (err) {
        console.log('Redis SET error:', err.message)
    }

    logger.info(`Products served from database. key=${cacheKey}`);

    return response.success(
        res,
        'Produk berhasil diambil',
        {
        source: 'database',
        ...responseData,
        }
    );
        
};

exports.getProductById = async (req, res) => {
    const productId = parseInt(req.params.id);

    const product = await productService.getProductById(productId);

    if (!product) {
        throw new AppError('Produk tidak ditemukan', 404);
    }

    return response.success(res, 'produk ditemukan', product);
    
};

exports.createProduct = async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new AppError(errors.array()[0].msg, 400);
    }

    const { name, price } = req.body;
    const  userId = req.user.id;
    const image = req.file ? req.file.filename : null;

    const product = await productService.createProduct({
        name,
        price,
        userId,
        image,
    });

    const keys = await redisClient.keys('products:*');

    for (const key of keys) {
          await redisClient.del(key);
    }

    logger.info(`Product created: ${product.id} by user ${userId}`);

    return response.success(res, 'Produk berhasil ditambahkan', product)
};

exports.updateProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    const userId = req.user.id;

    
    const product = await productService.getProductById(productId);
        
    if (!product) {
        throw new AppError('Produk tidak ditemukan',404)
    }

    if (Number(product.user_id) !== Number(userId)) {
        throw new AppError('Kamu tidak berhak mengedit produk ini', 403);
    } 

    const image = req.file ? req.file.filename : product.image;

    if (req.file && product.image) {
        const oldImagePath = path.join(__dirname, '../uploads',product.image);

        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }
    }

    const result = await productService.updateProduct({
        name,
        price,
        image,
        productId,
    })

    const keys = await redisClient.keys('products:*');

    for (const key of keys) {
        await redisClient.del(key);
    }

    logger.info(`Product updated: ${productId} by user ${userId}`);

    return response.success(res, 'Produk berhasil diupdate', result);
};

exports.deleteProduct = async (req,res) => {
    const productId = parseInt(req.params.id);
    const userId = req.user.id;

    const product = await productService.getProductById(productId);

    if (!product) {
        throw new AppError('produk tidak ditemukan', 404);
    }

        

    if (product.image) {
        const imagePath = path.join(__dirname, '../uploads', product.image);

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    const result = await productService.deleteProduct(productId);

    const keys = await redisClient.keys('products:*');

    for (const key of keys) {
        await redisClient.del(key);
    }

    logger.info(`Product deleted: ${productId} by user ${userId}`);

    return response.success(res, 'Produk berhasil dihapus', result);
    
};

exports.getMyProducts = async (req, res) => {
    const userId = req.user.id;

    const result = await productService.getMyProducts(userId)

    return response.success(res, 'Produk ditemukan', result)
};