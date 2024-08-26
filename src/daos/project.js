const { PAGE_NUMBER_DEFAULT } = require('../constants');
const Project = require('../models/project');
const {
  getSortQuery,
  parseCondition,
  getLookup,
  updateOne,
  createOne,
} = require('../utils/database');

const getProjects = async (
  {
    limit,
    page = PAGE_NUMBER_DEFAULT,
    sort = ['createdAt_desc'],
    ...condition
  },
  { lookupOwner = false } = {},
) => {
  const match = parseCondition(condition);

  const lookup = [
    {
      $lookup: {
        from: 'cameras',
        localField: 'cameraIds',
        foreignField: '_id',
        as: 'cameras',
      },
    },
  ];
  if (lookupOwner) {
    lookup.push(...getLookup('users', 'ownerId', 'owner'));
  }

  let offset = 0;
  const limitQuery = [];
  if (limit) {
    offset = page > 0 ? (page - 1) * limit : 0;
    limitQuery.push({ $limit: limit });
  }

  const projects = await Project.aggregate([
    { $match: match },
    ...lookup,
    { $sort: getSortQuery(sort) },
    { $skip: offset },
    ...limitQuery,
  ]);

  if (limit) {
    const countProjects = await Project.countDocuments(match);
    return { projects, total: countProjects };
  }

  return projects;
};

const createProject = async (data) => {
  const project = await createOne(Project, data);
  return project;
};

const getProject = async (condition, { lookupOwner = false } = {}) => {
  const lookup = [
    {
      $lookup: {
        from: 'cameras',
        localField: 'cameraIds',
        foreignField: '_id',
        as: 'cameras',
      },
    },
  ];
  if (lookupOwner) {
    lookup.push(...getLookup('users', 'ownerId', 'owner'));
  }

  const projects = await Project.aggregate([
    { $match: parseCondition(condition) },
    ...lookup,
  ]);

  return projects[0];
};

const updateProject = async (condition, updateFields) => {
  const project = await updateOne(Project, condition, updateFields);
  return project;
};

module.exports = { getProjects, createProject, getProject, updateProject };
