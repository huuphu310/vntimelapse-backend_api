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

const createUser = async ({ email, password, ...data }) => {
  let user = await userDao.findUser({ email });
  if (user) throw new CustomError(errorCodes.USER_EXIST);

  const passwordHash = await bcrypt.hash(password, 12);

  user = await userDao.createUser({
    ...data,
    email,
    passwordHash,
    role: ROLE.OWNER,
  });

  delete user.passwordHash;

  return user;
};

const updateUser = async (userId, { email, password, ...data }) => {
  let user = await userDao.findUser(userId);
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  if (email !== user.email) {
    const userExist = await userDao.findUser({ email });
    if (userExist) throw new CustomError(errorCodes.USER_EXIST);
  }

  let passwordHash;
  if (password) passwordHash = await bcrypt.hash(password, 12);

  user = await userDao.updateUser(userId, {
    ...data,
    email,
    passwordHash,
  });

  delete user.passwordHash;

  return user;
};

module.exports = {
  getUsers,
  changeStatus,
  changePassword,
  createUser,
  updateUser,
};
