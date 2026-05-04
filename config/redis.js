const { createClient } = require('redis');

const client = createClient({
    url: 'redis://localhost:6379',
});

client.on('error', (err) => {
    console.log('Redis Error:', err);
});

client.connect();

client.on('connect', () => {
    console.log('Redis Connected');
});

module.exports = client