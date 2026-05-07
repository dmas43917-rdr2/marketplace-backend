const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
    url: redisUrl,
});

client.on('error', (err) => {
    console.log('Redis Error:', err);
});

const connectRedis = async () => {
    await client.connect();
    console.log('Redis Connected');
};

connectRedis()

module.exports = client;