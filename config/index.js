require('dotenv-safe').config();

module.exports = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv : process.env.NODE_ENV || 'development',
    redisUrl: process.env.REDIS_URL,

    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apikey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },

    mail: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    midtrans: {
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
    },
};