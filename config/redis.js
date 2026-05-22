const { createClient } = require('redis');
const config = require('../config');

const redisUrl = config.redisUrl;

const client = createClient({
    url: redisUrl,
});
console.log(redisUrl)
client.on('error', (err) => {
    console.log('Redis Error:', err);
});

const connectRedis = async () => {
    await client.connect();
    console.log('Redis Connected');
};

connectRedis()

module.exports = client;