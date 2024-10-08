const { Joi } = require('express-validation');
const { customValidate } = require('../utils/validation');

const getVideos = {
  query: Joi.object({
    cameraId: Joi.string().trim().required(),
    startDate: Joi.date().allow(null),
    endDate: Joi.date().allow(null),
    page: Joi.number().integer().allow(null),
    limit: Joi.number().integer().allow(null),
  }),
};

const createVideo = {
  body: Joi.object({
    cameraId: Joi.string().trim().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
};

module.exports = {
  getVideosValidate: customValidate(getVideos),
  createVideoValidate: customValidate(createVideo)
};
