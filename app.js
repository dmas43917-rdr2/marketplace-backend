require('dotenv-safe').config();
const express = require('express');
const app = express();

const redisClient = require('./config/redis');
const db = require('./config/db');
const logger = require('./config/logger');
const { limiter } = require('./middlewares/rateLimiter');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const healthRoutes = require('./routes/healthRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const morgan = require('morgan');

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('combined', { stream: logger.stream }));

app.use(limiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/uploads', express.static('uploads'));

app.use('/', productRoutes);
app.use('/', authRoutes);
app.use('/', orderRoutes);
app.use('/', paymentRoutes);
app.use('/', healthRoutes);
app.use(errorMiddleware);

module.exports = app;