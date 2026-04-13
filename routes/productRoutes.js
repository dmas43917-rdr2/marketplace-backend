const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const { body } = require('express-validator');

router.post('/products',authMiddleware,[
    body('name').notEmpty().withMessage('Nama wajib diisi'),
    body('price').isInt({ min: 1}).withMessage('Harga harus angka > 0')],
    productController.createProduct
);

router.get('/products',productController.getAllProducts);
router.get('/products/:id',productController.getProductById);
//router.post('/products',productController.createProduct);
router.put('/products/:id',authMiddleware,productController.updateProduct);
router.delete('/products/:id',authMiddleware,productController.deleteProduct);
router.get('/my-products',authMiddleware,productController.getMyProducts);

module.exports = router