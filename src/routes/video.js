const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const {
  getVideosValidate,
  createVideoValidate,
} = require('../validations/video');
const videoController = require('../controllers/video');

/* eslint-disable prettier/prettier */
router.get('/videos', auth, getVideosValidate, asyncMiddleware(videoController.getVideos));
router.post('/videos', auth, createVideoValidate, asyncMiddleware(videoController.createVideo));
/* eslint-enable prettier/prettier */

module.exports = router;
