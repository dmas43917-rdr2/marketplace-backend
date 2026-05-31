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

    return response.error(
        res,
        isProduction && statusCode === 500 ? 'Internal server error' : err.message,
        statusCode,
    );
};