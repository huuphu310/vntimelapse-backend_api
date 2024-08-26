const cameraDao = require('../daos/camera');
const projectDao = require('../daos/project');

const projectService = require('./project');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const createCamera = async ({ projectId, ...data }) => {
  const project = await projectDao.getProject(projectId);
  if (!project) throw new CustomError(errorCodes.PROJECT_NOT_FOUND);

  const camera = await cameraDao.createCamera({ ...data, projectId });
  await projectService.updateProjectCameras(projectId);
  return camera;
};

const updateCamera = async (cameraId, data) => {
  let camera = await cameraDao.getCamera(cameraId);
  if (!camera) throw new CustomError(errorCodes.CAMERA_NOT_FOUND);

  camera = await cameraDao.updateCamera(cameraId, data);
  await projectService.updateProjectCameras(camera.projectId);
  return camera;
};

module.exports = { createCamera, updateCamera };
