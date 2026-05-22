const config = require('../config');

const { Pool } = require('pg');

const isProduction = config.nodeEnv === 'production';

console.log(process.env.DB_PASSWORD)
console.log(JSON.stringify(config.dbUrl))
const pool = new Pool({
  connectionString: config.dbUrl,
  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false,
});

pool.connect()
  .then(() => console.log('DB CONNECT SUCCESS'))
  .catch(err => console.log('DB CONNECT ERROR:', err.message));

module.exports = pool;