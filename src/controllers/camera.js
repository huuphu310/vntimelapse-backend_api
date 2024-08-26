const cameraService = require('../services/camera');

const createCamera = async (req, res) => {
  const camera = await cameraService.createCamera(req.body);
  return res.send({ status: 1, result: camera });
};

const updateCamera = async (req, res) => {
  const { cameraId } = req.params;
  const camera = await cameraService.updateCamera(cameraId, req.body);
  return res.send({ status: 1, result: camera });
};

module.exports = { createCamera, updateCamera };
