const response = require('../utils/response');
const logger = require('../config/logger');

module.exports = (err, req, res, next) => {
    logger.error(err.stack);

    return response.error(res, err.message, 500);
};