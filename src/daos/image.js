const { PAGE_NUMBER_DEFAULT } = require('../constants');
const {
  parseCondition,
  getSortQuery,
  getDateQuery,
} = require('../utils/database');
const Image = require('../models/image');

const getImages = async ({
  limit,
  page = PAGE_NUMBER_DEFAULT,
  sort = ['uploadTime_desc'],
  startDate,
  endDate,
  ...condition
}) => {
  const match = parseCondition(condition);
  match.uploadTime = getDateQuery(startDate, endDate);

  let offset = 0;
  const limitQuery = [];
  if (limit) {
    offset = page > 0 ? (page - 1) * limit : 0;
    limitQuery.push({ $limit: limit });
  }

  const images = await Image.aggregate([
    { $match: match },
    { $sort: getSortQuery(sort) },
    { $skip: offset },
    ...limitQuery,
  ]);

  if (limit) {
    const countImages = await Image.countDocuments(match);
    return { images, total: countImages };
  }

  return images;
};

module.exports = { getImages };
