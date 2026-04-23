const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')

const { body } = require('express-validator');

router.post('/products',authMiddleware,
    upload.single('image'),[
    body('name').notEmpty().withMessage('Nama wajib diisi'),
    body('price').isInt({ min: 1}).withMessage('Harga harus angka > 0')],
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
router.get('/products',productController.getAllProducts);
router.get('/products/:id',productController.getProductById);
router.put('/products/:id',authMiddleware,upload.single('image'),productController.updateProduct);
router.delete('/products/:id',authMiddleware,roleMiddleware("admin"),productController.deleteProduct);
router.get('/my-products',authMiddleware,productController.getMyProducts);

module.exports = router