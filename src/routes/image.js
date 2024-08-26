const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const { getImagesValidate } = require('../validations/image');
const imageController = require('../controllers/image');

/* eslint-disable prettier/prettier */
router.get('/images', auth, getImagesValidate, asyncMiddleware(imageController.getImages));
/* eslint-enable prettier/prettier */

module.exports = router;
