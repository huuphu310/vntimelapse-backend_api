const { Joi } = require('express-validation');
const { customValidate } = require('../utils/validation');

const createCamera = {
  body: Joi.object({
    projectId: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    apiKey: Joi.string().trim().required(),
    apiSecret: Joi.string().trim().required(),
    sshLink: Joi.string().trim().allow(null),
    shutterSpeed: Joi.number().integer().min(1).required(),
    frameTime: Joi.object({
      startTime: Joi.string().trim().required(),
      endTime: Joi.string().trim().required(),
    }).required(),
  }),
};

const updateCamera = {
  params: Joi.object({
    cameraId: Joi.string().trim().required(),
  }),
  body: Joi.object({
    name: Joi.string().trim().required(),
    apiKey: Joi.string().trim().required(),
    apiSecret: Joi.string().trim().required(),
    sshLink: Joi.string().trim().allow(null),
    shutterSpeed: Joi.number().integer().min(1).required(),
    frameTime: Joi.object({
      startTime: Joi.string().trim().required(),
      endTime: Joi.string().trim().required(),
    }).required(),
  }),
};

module.exports = {
  createCameraValidate: customValidate(createCamera),
  updateCameraValidate: customValidate(updateCamera),
};
