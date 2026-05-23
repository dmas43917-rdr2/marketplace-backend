const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { loginLimiter } = require('../middlewares/rateLimiter');

const validate = require('../middlewares/validate');
const { registerSchema } = require('../validations/authValidation')

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', loginLimiter, authController.login);

module.exports = router;