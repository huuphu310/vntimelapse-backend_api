const bcrypt = require('bcrypt');

const { ROLE } = require('../constants');
const userDao = require('../daos/user');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const getUsers = async (condition) => {
  const users = await userDao.getUsers(condition);
  return users;
};

const changeStatus = async (userId, active) => {
  const user = await userDao.findUser(userId);
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);
  if (user.role === ROLE.ADMIN) throw new CustomError(errorCodes.FORBIDDEN);

  await userDao.updateUser(userId, { active });
};

const changePassword = async (user, oldPassword, newPassword) => {
  const isCorrectPassword = await bcrypt.compare(
    oldPassword,
    user.passwordHash,
  );
  if (!isCorrectPassword) throw new CustomError(errorCodes.PASSWORD_INVALID);

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await userDao.updateUser(user._id, { passwordHash });
};

module.exports = {
  getUsers,
  changeStatus,
  changePassword,
};
