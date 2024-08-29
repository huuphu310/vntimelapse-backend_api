const imageDao = require('../daos/image');
const cameraDao = require('../daos/camera');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { ROLE } = require('../constants');

const getImages = async ({ cameraId, ...condition }, user) => {
  const camera = await cameraDao.getCamera(cameraId, { lookupProject: true });
  if (
    !camera ||
    (user.role === ROLE.OWNER &&
      String(camera.project.ownerId) !== String(user._id))
  )
    throw new CustomError(errorCodes.CAMERA_NOT_FOUND);

  const result = await imageDao.getImages({
    ...condition,
    imageUrl: { $regex: /.jpg$/ },
    cameraId,
  });
  return result;
};

module.exports = { getImages };
