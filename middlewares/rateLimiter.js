const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        message: 'Terlalu banyak request, coba lagi nanti',
    },
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60  * 1000,
    max: 5,
    message: {
        message: 'Terlalu banyak percobaan login', 
    },
});

module.exports = { limiter,loginLimiter };