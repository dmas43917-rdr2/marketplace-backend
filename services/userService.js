const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');
const eventBus = require('../events');

const userService = {
    async register({ email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);

        return userRepository.create({
            email,
            password: hashedPassword,
        });
    },

    async login({ email, password }) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
             throw new AppError('User tidak ditemukan', 404);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw new AppError('Password salah', 404);
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        eventBus.emit('USER_LOGIN', {
            userId: user.id,
            email: user.email,
        });

        return {token, user};

    },
};

module.exports = userService;