const { Joi } = require('express-validation');
const { customValidate } = require('../utils/validation');
const { ROLE } = require('../constants');
const { PHONE_NUMBER_REGEX } = require('../constants/regex');

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

const createUser = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).trim().required(),
    phoneNumber: Joi.string().regex(PHONE_NUMBER_REGEX),
  }),
};

const updateUser = {
  params: Joi.object({
    userId: Joi.string().trim().required(),
  }),
  body: Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).trim().allow(''),
    phoneNumber: Joi.string().regex(PHONE_NUMBER_REGEX),
  }),
};

module.exports = {
  getUsersValidate: customValidate(getUsers),
  changeStatusValidate: customValidate(changeStatus),
  changePasswordValidate: customValidate(changePassword),
  createUserValidate: customValidate(createUser),
  updateUserValidate: customValidate(updateUser),
};
