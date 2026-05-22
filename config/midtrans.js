const midtransClient = require('midtrans-client');
const config = require('../config');

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: config.serverKey,
});

module.exports = snap;