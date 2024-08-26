const { PAGE_NUMBER_DEFAULT } = require('../constants');
const {
  parseCondition,
  getSortQuery,
  getDateQuery,
} = require('../utils/database');
const Video = require('../models/video');

const getVideos = async ({
  limit,
  page = PAGE_NUMBER_DEFAULT,
  sort = ['uploadTime_desc'],
  startDate,
  endDate,
  ...condition
}) => {
  const match = parseCondition(condition);
  match.uploadTime = getDateQuery(startDate, endDate);

  console.log('match', match);

  let offset = 0;
  const limitQuery = [];
  if (limit) {
    offset = page > 0 ? (page - 1) * limit : 0;
    limitQuery.push({ $limit: limit });
  }

  const videos = await Video.aggregate([
    { $match: match },
    { $sort: getSortQuery(sort) },
    { $skip: offset },
    ...limitQuery,
  ]);

  if (limit) {
    const countVideos = await Video.countDocuments(match);
    return { videos, total: countVideos };
  }

  return videos;
};

module.exports = { getVideos };
