const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');

const authService = require('../services/auth');
const userDao = require('../daos/user');

const asyncMiddleware = require('./async');
const { ROLE } = require('../constants');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(codes.UNAUTHORIZED);

  const [tokenType, accessToken] = authorization.split(' ');
  if (tokenType !== 'Bearer') throw new CustomError(codes.UNAUTHORIZED);

  const data = authService.verifyAccessToken(accessToken);
  const { userId } = data;

  const user = await userDao.findUser(userId);
  if (!user) throw new CustomError(codes.UNAUTHORIZED);
  if (!user.active) throw new CustomError(codes.UNAUTHORIZED);

  req.userId = userId;
  req.user = user;
  return next();
};

const authorize = (req, res, next) => {
  if (req.user.role === ROLE.OWNER) throw new CustomError(codes.FORBIDDEN);
  return next();
};

module.exports = {
  auth: asyncMiddleware(auth),
  authorize: asyncMiddleware(authorize),
};
