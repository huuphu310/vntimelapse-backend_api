const userService = require('../services/user');

const getMe = (req, res) => {
  const { user } = req;
  delete user.passwordHash;
  return res.send({ status: 1, result: user });
};

const getUsers = async (req, res) => {
  const users = await userService.getUsers(req.query);
  return res.send({ status: 1, result: users });
};

const changeStatus = async (req, res) => {
  const { userId } = req.params;
  const { active } = req.body;
  await userService.changeStatus(userId, active);
  return res.send({ status: 1 });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  await userService.changePassword(req.user, oldPassword, newPassword);
  return res.send({ status: 1 });
};

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  return res.send({ status: 1, result: user });
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const user = await userService.updateUser(userId, req.body);
  return res.send({ status: 1, result: user });
};

module.exports = {
  getMe,
  getUsers,
  changeStatus,
  changePassword,
  createUser,
  updateUser,
};
