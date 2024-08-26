const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');

const authService = require('../services/auth');
const userDao = require('../daos/user');

const asyncMiddleware = require('./async');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(codes.UNAUTHORIZED);

  const [tokenType, accessToken] = authorization.split(' ');
  if (tokenType !== 'Bearer') throw new CustomError(codes.UNAUTHORIZED);

  const data = authService.verifyAccessToken(accessToken);
  const { userId } = data;

  const user = await userDao.findUser(userId);
  if (!user) throw new CustomError(codes.UNAUTHORIZED);

  req.userId = userId;
  req.user = user;
  return next();
};

module.exports = {
  auth: asyncMiddleware(auth),
};
