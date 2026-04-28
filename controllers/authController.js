const db = require('../config/db');
const config = require('../config/env');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query (
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );

        res.json({
            message: 'user berhasil register',
            user: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({ message: 'Password salah' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login berhasil',
            token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

