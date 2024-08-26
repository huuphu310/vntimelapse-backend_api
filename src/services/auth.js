const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const camelCaseKeys = require('camelcase-keys');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const userDao = require('../daos/user');

const { JWT_SECRET_KEY, JWT_EXPIRES_TIME } = require('../configs');

const login = async (email, password) => {
  const user = await userDao.findUser({ email });
  if (!user) throw new CustomError(errorCodes.CREDENTIAL_INVALID);

  const { _id: userId, passwordHash, active } = user;

  const isCorrectPassword = await bcrypt.compare(password, passwordHash);
  if (!isCorrectPassword) throw new CustomError(errorCodes.CREDENTIAL_INVALID);

  if (!active) throw new CustomError(errorCodes.USER_NOT_ACTIVE);

  const accessToken = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
  return accessToken;
};

const verifyAccessToken = (accessToken) => {
  try {
    const data = jwt.verify(accessToken, JWT_SECRET_KEY);
    return camelCaseKeys(data);
  } catch (error) {
    console.error(`[VerifyAccessToken] ${error.stack}`);
    throw new CustomError(errorCodes.UNAUTHORIZED);
  }
};

module.exports = { login, verifyAccessToken };
