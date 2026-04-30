const nodeCache = require('node-cache');

const cache = new nodeCache({
    stdTTL: 60,
});

module.exports = cache;