const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const {
  createCameraValidate,
  updateCameraValidate,
} = require('../validations/camera');
const cameraController = require('../controllers/camera');

/* eslint-disable prettier/prettier */
router.post('/cameras', auth, createCameraValidate, asyncMiddleware(cameraController.createCamera));
router.put('/cameras/:cameraId', auth, updateCameraValidate, asyncMiddleware(cameraController.updateCamera));
/* eslint-enable prettier/prettier */

module.exports = router;
