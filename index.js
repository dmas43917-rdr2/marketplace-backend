require('dotenv').config()
const db = require('./config/db')
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/', productRoutes);
app.use('/', authRoutes);
app.use('/',orderRoutes);

app.get('/', (req, res) => {
    res.send('Server Jalan Bro!');
});

/*app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            message: 'Produk tidak ditemukan'
        });
    }
    res.json(product);
});

app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            message: 'Produk tidak ditemukan'
        });
    };

    product.name = name;
    product.price = price;

    res.json({
        message: 'Produk berhasil diupdate',
        data: product
    });
});

let products = [];
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    const newProduct = {
        id: products.length + 1,
        name,
        price
    };

    products.push(newProduct);

    res.json({
        message: 'Produk berhasil ditambahkan',
        data: newProduct
    });
});

app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({
            message: 'Produk tidk ditemukan'
        });
    }

    const deleteProduct = products[productIndex];
    products.splice(productIndex, 1);

    res.json({
        message: 'Produk berhasil dihapus',
        data: deleteProduct
    })
})*/

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


