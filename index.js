require('dotenv-safe').config();

const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');


app.listen(config.port, '0.0.0.0', () => {
    logger.info(`Server running on port ${config.port}`);
});




