const { PAGE_NUMBER_DEFAULT } = require('../constants');
const Camera = require('../models/camera');
const {
  updateOne,
  createOne,
  getSortQuery,
  parseCondition,
  findDocument,
} = require('../utils/database');

const createCamera = async (data) => {
  const camera = await createOne(Camera, data);
  return camera;
};

const getCamera = async (condition) => {
  const camera = await findDocument(Camera, condition);
  return camera;
};

const updateCamera = async (condition, updateFields) => {
  const camera = await updateOne(Camera, condition, updateFields);
  return camera;
};

const getCameras = async ({
  limit,
  page = PAGE_NUMBER_DEFAULT,
  sort = ['createdAt_desc'],
  ...condition
}) => {
  const match = parseCondition(condition);

  let offset = 0;
  const limitQuery = [];
  if (limit) {
    offset = page > 0 ? (page - 1) * limit : 0;
    limitQuery.push({ $limit: limit });
  }

  const cameras = await Camera.aggregate([
    { $match: match },
    { $sort: getSortQuery(sort) },
    { $skip: offset },
    ...limitQuery,
  ]);

  if (limit) {
    const countCameras = await Camera.countDocuments(match);
    return { cameras, total: countCameras };
  }

  return cameras;
};

module.exports = { createCamera, getCamera, updateCamera, getCameras };
