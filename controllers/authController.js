const db = require('../config/db');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../config/mailer');
const response = require('../utils/response');
const AppError = require('../utils/appError');
const sendEmailJob = require('../jobs/sendEmailJob');
const eventBus = require('../events');
const logger = require('../utils/logger');

const userService = require('../services/userService');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.register({ email, password });

    return response.success(
        res,
        'user berhasil register',
        user
    );
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.login({ email, password });

    logger.info('User login sukses', {
        requestId: req.requestId,
        action: 'login',
        email: user.email,
    });

    response.success(res, 'Login berhasil', user.token);
};

