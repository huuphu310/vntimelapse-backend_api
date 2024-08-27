const { Joi } = require('express-validation');
const { customValidate } = require('../utils/validation');
const { ROLE } = require('../constants');

const getUsers = {
  query: Joi.object({
    search: Joi.string().trim().allow(''),
    role: Joi.string().valid(...Object.values(ROLE)),
    page: Joi.number().integer().allow(null),
    limit: Joi.number().integer().allow(null),
  }),
};

const changeStatus = {
  params: Joi.object({
    userId: Joi.string().trim().required(),
  }),
  body: Joi.object({
    active: Joi.bool().required(),
  }),
};

const changePassword = {
  body: Joi.object({
    oldPassword: Joi.string().trim().required(),
    newPassword: Joi.string().trim().required(),
  }),
};

module.exports = {
  getUsersValidate: customValidate(getUsers),
  changeStatusValidate: customValidate(changeStatus),
  changePasswordValidate: customValidate(changePassword),
};
