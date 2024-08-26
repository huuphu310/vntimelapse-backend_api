const mung = require('express-mung');
const snakecaseKeys = require('snakecase-keys');
const { convertObjectIdToString } = require('../utils/object');

const sortObject = (obj) => {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
};

const snakecaseRes = () => {
  return mung.json((body, req, res) => {
    return snakecaseKeys(sortObject(convertObjectIdToString(body)), {
      deep: true,
    });
  });
};

module.exports = snakecaseRes;
