const videoDao = require('../daos/video');
const cameraDao = require('../daos/camera');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { ROLE } = require('../constants');

const getVideos = async ({ cameraId, ...condition }, user) => {
  const camera = await cameraDao.getCamera(cameraId);
  if (
    !camera ||
    (user.role === ROLE.OWNER && !user.projectIds.includes(camera.projectId))
  )
    throw new CustomError(errorCodes.CAMERA_NOT_FOUND);

  const result = await videoDao.getVideos({
    ...condition,
    cameraId,
  });
  return result;
};

module.exports = { getVideos };
