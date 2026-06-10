const ProductRepository = require('../repositories/productRepository');
const ProductService = require('../services/productService');

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

module.exports = productService;