require('dotenv').config();

const app = require('./app');
const config = require('./config/env');
const logger = require('./config/logger');



/*app.use((err, req, res, next) => {
    logger.error(err.message)

    if (err.message.includes('Hanya file gambar')) {
        return res.status(400).json({ message: err.message });
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File terlalu besar (max 2MB)' });
    }
    res.status(500).json({ message: err.message });
});

app.get('/', (req, res) => {
    res.send('Server Jalan Bro!');
});*/

app.listen(config.port, '0.0.0.0', () => {
    logger.info(`Server running on port ${config.port}`);
});




