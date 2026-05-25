const response = require('../utils/response');
const logger = require('../config/logger');
const config = require('../config');

const isProduction = config.nodeEnv === 'production';

module.exports = (err, req, res, next) => {
    logger.error(err.stack);

    const statusCode = err.statusCode || 500;

    return response.error(
        res,
        isProduction && statusCode === 500 ? 'Internal server error' : err.message,
        statusCode,
    );
};