const imageService = require('../services/image');

const getImages = async (req, res) => {
  const result = await imageService.getImages(req.query, req.user);
  return res.send({ status: 1, result });
};

module.exports = { getImages };
