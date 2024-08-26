const { PAGE_NUMBER_DEFAULT } = require('../constants');
const User = require('../models/user');
const {
  createOne,
  updateOne,
  getSortQuery,
  parseCondition,
  findDocument,
} = require('../utils/database');

const findUser = async (condition) => {
  const user = await findDocument(User, condition);
  return user;
};

const createUser = async (data) => {
  const user = await createOne(User, data);
  return user;
};

const updateUser = async (condition, updateFields) => {
  const user = await updateOne(User, condition, updateFields);
  return user;
};

const getUsers = async ({
  limit,
  page = PAGE_NUMBER_DEFAULT,
  sort = ['createdAt_desc'],
  search,
  ...condition
}) => {
  const match = parseCondition(condition);
  if (search) {
    const searchRegex = new RegExp(search, 'gi');
    match.$or = [{ name: searchRegex }, { phoneNumber: searchRegex }];
  }

  let offset = 0;
  const limitQuery = [];
  if (limit) {
    offset = page > 0 ? (page - 1) * limit : 0;
    limitQuery.push({ $limit: limit });
  }

  const users = await User.aggregate([
    { $match: match },
    { $sort: getSortQuery(sort) },
    { $skip: offset },
    ...limitQuery,
  ]);

  if (limit) {
    const countUsers = await User.countDocuments(match);
    return { users, total: countUsers };
  }

  return users;
};

const updateUsers = async (condition, updateFields) => {
  await User.updateMany(parseCondition(condition), updateFields);
};

module.exports = { findUser, createUser, updateUser, getUsers, updateUsers };
