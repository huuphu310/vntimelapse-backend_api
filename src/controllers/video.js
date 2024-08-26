const videoService = require('../services/video');

const getVideos = async (req, res) => {
  const result = await videoService.getVideos(req.query, req.user);
  return res.send({ status: 1, result });
};

module.exports = { getVideos };
