const OrderRepository = require('../repositories/orderRepository');
const OrderService = require('../services/orderService');
const ProductRepository = require('../repositories/productRepository');
const ProductService = require('../services/productService');

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, productService);

module.exports = orderService;