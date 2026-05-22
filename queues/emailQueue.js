const  { Queue } = require('bullmq');
const redisClient = require('../config/redis');
const config = require('../config')

const emailQueue = new Queue('emailQueue', {
    connection: {
        url: config.redisUrl,
    },
});

module.exports = emailQueue;