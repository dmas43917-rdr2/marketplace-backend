const  { Queue } = require('bullmq');
const redisClient = require('../config/redis');

const emailQueue = new Queue('emailQueue', {
    connection: {
        url: process.env.REDIS_URL
    },
});

module.exports = emailQueue;