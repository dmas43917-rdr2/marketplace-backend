require('dotenv-safe').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

const redisClient = require('./config/redis');
const db = require('./config/db');
const logger = require('./utils/logger');
const { limiter } = require('./middlewares/rateLimiter');


/*const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const healthRoutes = require('./routes/healthRoutes');*/
const errorMiddleware = require('./middlewares/errorMiddleware');
const apiRoutes = require('./routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const morgan = require('morgan');

require('./listeners/userListener');

app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use(express.json({
    limit: '10kb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}));
app.set('trust proxy', 1);

app.use(morgan('combined', { stream: logger.stream }));

app.use(limiter);

app.use('/uploads', express.static('uploads'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/v1', apiRoutes);

/*app.use('/', productRoutes);
app.use('/', authRoutes);
app.use('/', orderRoutes);
app.use('/', paymentRoutes);
app.use('/', healthRoutes);*/
app.use(errorMiddleware);

module.exports = app;