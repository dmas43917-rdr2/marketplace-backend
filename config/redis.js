require('dotenv').config()
const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
    url: redisUrl,
});

client.on('error', (err) => {
    console.log('Redis Error:', err);
});

client.connect();

client.on('connect', () => {
    console.log('Redis Connected');
});

module.exports = client