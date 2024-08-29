const moment = require('moment');

const videoDao = require('../daos/video');
const cameraDao = require('../daos/camera');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { ROLE, VIDEO_STATUS } = require('../constants');

const getVideos = async ({ cameraId, ...condition }, user) => {
  const camera = await cameraDao.getCamera(cameraId, { lookupProject: true });
  if (
    !camera ||
    (user.role === ROLE.OWNER &&
      String(camera.project.ownerId) !== String(user._id))
  )
    throw new CustomError(errorCodes.CAMERA_NOT_FOUND);

  const result = await videoDao.getVideos({
    ...condition,
    cameraId,
  });
  return result;
};

const createVideo = async ({ cameraId, ...data }, user) => {
  const camera = await cameraDao.getCamera(cameraId, { lookupProject: true });
  if (
    !camera ||
    (user.role === ROLE.OWNER &&
      String(camera.project.ownerId) !== String(user._id))
  )
    throw new CustomError(errorCodes.CAMERA_NOT_FOUND);

  const countVideos = await videoDao.countVideos({
    projectId: camera.projectId,
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day'),
    status: { $in: [VIDEO_STATUS.PROCESSING, VIDEO_STATUS.DONE] },
  });

  if (countVideos >= camera.project.videosPerDay) {
    throw new CustomError(errorCodes.EXCEED_CREATE_VIDEO_PER_DAY);
  }

  const video = await videoDao.createVideo({
    ...data,
    cameraId,
    cameraName: camera.name,
    projectId: camera.projectId,
    projectName: camera.project.name,
  });

  return video;
};

module.exports = { getVideos, createVideo };
