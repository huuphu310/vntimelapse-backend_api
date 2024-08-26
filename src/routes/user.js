const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const {
  getUsersValidate,
  changeStatusValidate,
} = require('../validations/user');
const userController = require('../controllers/user');

/* eslint-disable prettier/prettier */
router.get('/users/me', auth, asyncMiddleware(userController.getMe));
router.get('/users', auth, getUsersValidate, asyncMiddleware(userController.getUsers));
router.put('/users/:userId/change-status', auth, changeStatusValidate, asyncMiddleware(userController.changeStatus));
/* eslint-enable prettier/prettier */

module.exports = router;
