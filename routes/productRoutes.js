const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const authorize = require('../middlewares/authorize');
const asyncHandler = require('../utils/asyncHandler');

const { body } = require('express-validator');

router.post('/', authMiddleware,
    upload.single('image'), [
    body('name').notEmpty().withMessage('Nama wajib diisi'),
    body('price').isInt({ min: 1 }).withMessage('Harga harus angka > 0')],
    productController.createProduct
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', asyncHandler(productController.getAllProducts));
router.get('/my-products', authMiddleware, productController.getMyProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authMiddleware, upload.single('image'), productController.updateProduct);
router.delete('/:id', authMiddleware, authorize("admin"), productController.deleteProduct);


module.exports = router