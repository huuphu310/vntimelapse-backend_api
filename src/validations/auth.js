const { Joi, validate } = require('express-validation');

const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
  }),
};

module.exports = {
  loginValidate: validate(login, { keyByField: true }),
};
