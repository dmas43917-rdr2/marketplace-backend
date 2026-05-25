const response = require('../utils/response');
const logger = require('../config/logger');
const config = require('../config');

const isProduction = config.nodeEnv === 'production';

module.exports = (err, req, res, next) => {
    logger.error(err.stack);

    return response.error(
        res,
        isProduction
          ? 'Internal server error'
          : err.message,
        500
    );
};