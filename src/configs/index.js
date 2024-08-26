module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: process.env.JWT_EXPIRES_TIME,
};
