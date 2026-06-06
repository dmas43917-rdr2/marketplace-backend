const response = require('../utils/response');
const logger = require('../utils/logger');
const config = require('../config');

const isProduction = config.nodeEnv === 'production';

module.exports = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
    });

    const statusCode = err.statusCode || 500;

    const message =
        isProduction && !err.isOperational 
            ? 'Internal server error' 
            : err.message;

    return response.error(res, message, statusCode);
};