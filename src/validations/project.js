const { Joi } = require('express-validation');
const { customValidate } = require('../utils/validation');

const getProjects = {
  query: Joi.object({
    search: Joi.string().trim().allow(''),
    page: Joi.number().integer().allow(null),
    limit: Joi.number().integer().allow(null),
  }),
};

const getProject = {
  params: Joi.object({
    projectId: Joi.string().trim().required(),
  }),
};

const createProject = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    ownerId: Joi.string().trim().required(),
    duration: Joi.number().integer().min(1).required(),
    videosPerDay: Joi.number().integer().min(1).required(),
  }),
};

const updateProject = {
  params: Joi.object({
    projectId: Joi.string().trim().required(),
  }),
  body: Joi.object({
    name: Joi.string().trim().required(),
    ownerId: Joi.string().trim().required(),
    duration: Joi.number().integer().min(1).required(),
    videosPerDay: Joi.number().integer().min(1).required(),
  }),
};

module.exports = {
  getProjectsValidate: customValidate(getProjects),
  getProjectValidate: customValidate(getProject),
  createProjectValidate: customValidate(createProject),
  updateProjectValidate: customValidate(updateProject),
};
