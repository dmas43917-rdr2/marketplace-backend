require('dotenv').config()
const config = require('./env');

const { Pool } = require('pg');

const isProduction = config.nodeEnv === 'production';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction
    ? { rejectUnauthorized: false }
    : false,
});

module.exports = pool;