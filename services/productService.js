const productRepository = require('../repositories/productRepository');

const productService = {
    async getAllProducts(params) {
        return productRepository.findAll(params);
    },

    async getProductById(productId) {
        return productRepository.findById(productId);
    },

    async createProduct(params) {
        return productRepository.create(params);
    },

    async updateProduct(params) {
        return productRepository.update(params);
    },

    async deleteProduct(productId) {
        return productRepository.delete(productId);
    },

    async getMyProducts(userId) {
        return productRepository.findByUserId(userId);
    },
};

module.exports = productService;

/*class ProductService {
    async getAllProducts(params) {
        return productRepository.findAll(params);
    };

    async getProductById(productId) {
        return productRepository.findById(productId);
    };

    async createProduct(params) {
        return productRepository.create(params);
    };

    async updateProduct(params) {
        return productRepository.update(params);
    };

    async deleteProduct(productId) {
        return productRepository.delete(productId);
    };

    async getMyProducts(userId) {
        return productRepository.findByUserId(userId);
    };
};

module.exports = new ProductService();*/