const express = require('express');
const router = express.Router();
const db = require('../config/db');
const redisClient = require('../config/redis');

/*router.get('/health', async (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date(),
        database: await db.query('SELECT 1'),
        redis: await redisClient.ping(),
    });
});*/

router.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    const redisPing = await redisClient.ping();

    res.json({
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date(),
      database: 'connected',
      redis: redisPing === 'PONG' ? 'connected' : 'unknown'
    });

  } catch (err) {
    res.status(500).json({
      status: 'ERROR',
      database: 'disconnected',
      redis: 'disconnected',
      message: err.message
    });
  }
});

module.exports = router;