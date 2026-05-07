const config = require('./env');

const { Pool } = require('pg');

const isProduction = config.nodeEnv === 'production';

const pool = new Pool({
    connectionString: config.dbUrl,
    ssl: isProduction
    ? { rejectUnauthorized: false }
    : false,
});

module.exports = pool;