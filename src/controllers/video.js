const videoService = require('../services/video');

const getVideos = async (req, res) => {
  const result = await videoService.getVideos(req.query, req.user);
  return res.send({ status: 1, result });
};

const createVideo = async (req, res) => {
  const video = await videoService.createVideo(req.body, req.user);
  return res.send({ status: 1, result: video });
}

module.exports = { getVideos, createVideo };
