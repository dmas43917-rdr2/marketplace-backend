const config = require('./env');

const { Pool } = require('pg');

const isProduction = config.nodeEnv === 'production';

console.log(process.env.DB_PASSWORD)
console.log(JSON.stringify(process.env.DATABASE_URL))
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction
    ? { rejectUnauthorized: false }
    : false,
});

pool.connect()
  .then(() => console.log('DB CONNECT SUCCESS'))
  .catch(err => console.log('DB CONNECT ERROR:', err.message));

module.exports = pool;