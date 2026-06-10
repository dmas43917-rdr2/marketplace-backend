const AppError = require('../utils/appError');

class ProductService  {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getAllProducts(params) {
        return this.productRepository.findAll(params);
    };

    async getProductById(productId) {
        const product = await this.productRepository.findById({ productId });

        if (!product) {
        throw new AppError('Produk tidak ditemukan', 404);
        }

        return product
    };

    async createProduct(params) {
        return this.productRepository.create(params);
    };

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

        return this.productRepository.update(params);
    };

    async deleteProduct({ productId, userId, role }) {

        const product = await this.getProductById(productId);

        if (role === 'admin') {
            return this.productRepository.delete(productId)
        }

        if (role === 'seller') {
            if (product.user_id !== userId) {
                throw new AppError('kamu tidak boleh hapus produk ini', 403)
            }

            return this.productRepository.delete(productId);
        }

        throw new AppError('Forbidden', 403);
    };

    async getMyProducts(userId) {
        return this.productRepository.findByUserId(userId);
    };
};

module.exports = ProductService;