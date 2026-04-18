require('dotenv').config()
const db = require('./config/db')
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/', productRoutes);
app.use('/', authRoutes);
app.use('/',orderRoutes);

app.get('/', (req, res) => {
    res.send('Server Jalan Bro!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


