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

module.exports = { getMe, getUsers, changeStatus };
