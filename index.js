require('dotenv').config();

const db = require('./config/db');
const config = require('./config/env');
const logger = require('./config/logger');
const express = require('express');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const morgan = require('morgan');

const app = express();
app.use(express.json());

app.use(morgan('combined', { stream: logger.stream }));

app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use('/uploads',express.static('uploads'));

app.use('/', productRoutes);
app.use('/', authRoutes);
app.use('/',orderRoutes);

app.use((err, req, res, next) => {
    logger.error(err.message)

    if(err.message.includes('Hanya file gambar')) {
        return res.status(400).json({ message: err.message });
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File terlalu besar (max 2MB)' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
});

app.get('/', (req, res) => {
    res.send('Server Jalan Bro!');
});

app.listen(config.port, '0.0.0.0',() => {
    logger.info(`Server running on port ${config.port}`);
});




