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

module.exports = {
  getUsers,
  changeStatus,
};
