const authService = require('../services/auth');

const login = async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await authService.login(email, password);
  return res.send({ status: 1, result: { accessToken } });
};

const logout = (req, res) => {
  res.clearCookie('accessToken');
  return res.send({ status: 1 });
};

module.exports = { login, logout };
