const db = require('../config/db');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../config/mailer');
const response = require('../utils/response');
const AppError = require('../utils/appError');
const sendEmailJob = require('../jobs/sendEmailJob');
const eventBus = require('../events');
const logger = require('../utils/logger');

exports.register = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );

        res.json({
            message: 'user berhasil register',
            user: result.rows[0]
        });
    } catch (err) {
        next(err)
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            throw new AppError('User tidak ditemukan', 404);
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

        /*await emailQueue.add('sendEmail', {
            to: 'test@mail.com',
            subject: 'Hello Dani',
            text: 'Email dari queue berhasil',
        });*/

        /*console.log('masuk controller email job');

        await sendEmailJob({
            to: user.email,
            subject: 'wellcome',
            text: 'login success',
        });*/

        eventBus.emit('USER_LOGIN', {
            userId: user.id,
            email: user.email,
        })

        logger.info('User login sukses',{
            action: 'login',
            email: user.email,
        })

        response.success(res, 'Login berhasil', token)

        /*res.json({
            message: 'Login berhasil',
            token
        });*/
    } catch (err) {
        next(err);
    }
};

