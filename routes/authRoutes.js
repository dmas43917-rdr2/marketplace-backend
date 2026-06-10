const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const { loginLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validate');

const { registerSchema } = require('../validations/authValidation');

const asyncHandler = require('../utils/asyncHandler');

router.post('/register', validate(registerSchema), asyncHandler(authController.register));
router.post('/login', loginLimiter, asyncHandler(authController.login));

module.exports = router;