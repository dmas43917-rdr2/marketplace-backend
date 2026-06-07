const productRepository = require('../repositories/productRepository');
const AppError = require('../utils/appError');

const productService = {
    async getAllProducts(params) {
        return productRepository.findAll(params);
    },

    async getProductById(productId) {
        const product = await productRepository.findById(productId);

        if (!product) {
        throw new AppError('Produk tidak ditemukan', 404);
        }

        return product
    },

    async createProduct(params) {
        return productRepository.create(params);
    },

    async updateProduct(params) {
        const {
            productId,
            userId,
            name,
            price,
            image,
        } = params;

        const product = await this.getProductById(productId);

        if (Number(product.user_id) !== Number(userId)) {
            throw new AppError('Kamu tidak berhak mengedit produk ini',403);
        }

        return productRepository.update(params);
    },

    async deleteProduct({ productId, userId, role }) {

        const product = await this.getProductById(productId);

        if (role === 'admin') {
            return productRepository.delete(productId)
        }

        if (role === 'seller') {
            if (product.user_id !== userId) {
                throw new AppError('kamu tidak boleh hapus produk ini', 403)
            }

            return productRepository.delete(productId);
        }

        throw new AppError('Forbidden', 403);
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