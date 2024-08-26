const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const { loginValidate } = require('../validations/auth');
const authController = require('../controllers/auth');

/* eslint-disable prettier/prettier */
router.post('/auth/login', loginValidate, asyncMiddleware(authController.login));
router.get('/auth/logout', auth, asyncMiddleware(authController.logout));
/* eslint-enable prettier/prettier */

module.exports = router;
