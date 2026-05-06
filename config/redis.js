const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
    url: redisUrl,
});

client.on('error', (err) => {
    console.log('Redis Error:', err);
});

client.on('connect', () => {
    console.log('Redis Connected');
});

client.connect().catch((err) => {
    console.log('Redis connect failed:', err.message);
});

module.exports = client;