const moment = require('moment');
const {
  Types: { ObjectId },
} = require('mongoose');

const getSelectQuery = (fields) =>
  fields
    ? JSON.parse(`{${fields.map((element) => `"${element}":1`).join(',')}}`)
    : {};

const getSortQuery = (sort = []) =>
  sort.length
    ? JSON.parse(
        `{${sort
          .map((element) => {
            const field = element.substring(0, element.lastIndexOf('_'));
            const value =
              element.substring(element.lastIndexOf('_') + 1) === 'asc'
                ? 1
                : -1;
            return `"${field}":${value}`;
          })
          .join(',')}}`,
      )
    : { _id: 1 };

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === String(id)) {
      return true;
    }
    return false;
  }
  return false;
};

const findDocument = (Model, condition) => {
  let element = null;
  if (isValidObjectId(condition)) {
    element = Model.findById(condition).lean();
  }

  if (condition && typeof condition === 'object') {
    element = Model.findOne(condition).lean();
  }

  return element;
};

const parseCondition = (condition = {}, searchRelativeFields = []) => {
  if (isValidObjectId(condition)) {
    return { _id: new ObjectId(condition) };
  }
  if (condition && typeof condition === 'object') {
    Object.keys(condition).forEach((key) => {
      if (isValidObjectId(condition[key])) {
        condition[key] = new ObjectId(condition[key]);
      } else if (typeof condition[key] === 'string') {
        if (condition[key] === 'null') {
          condition[key] = null;
        } else if (condition[key] === 'undefined') {
          condition[key] = undefined;
        } else if (searchRelativeFields.includes(key))
          condition[key] = new RegExp(condition[key], 'gi');
      }
    });
    return condition;
  }
  return condition;
};

const createOne = async (model, createFields) => {
  try {
    const document = await model.create(createFields);
    return document;
  } catch (error) {
    throw new Error(error);
  }
};

const updateOne = async (model, condition, updateFields) => {
  if (ObjectId.isValid(condition)) {
    const document = await model.findByIdAndUpdate(condition, updateFields, {
      new: true,
      omitUndefined: true,
    });
    return document;
  }

  if (typeof condition === 'object' && condition !== null) {
    const document = await model.findOneAndUpdate(condition, updateFields, {
      new: true,
      omitUndefined: true,
    });
    return document;
  }

  throw new Error();
};

const checkExists = async (model, condition) => {
  const document = await findDocument(model, condition);
  return !!document;
};

const getDateQuery = (startTime, endTime) => {
  const query = {};
  if (startTime) {
    query.$gte = new Date(moment(startTime).startOf('day'));
  }
  if (endTime) {
    query.$lte = new Date(moment(endTime).endOf('day'));
  }
  return query;
};

const getLookup = (collection, key, path, pipeline = []) => [
  {
    $lookup: {
      from: collection,
      localField: key,
      foreignField: '_id',
      pipeline,
      as: path,
    },
  },
  {
    $unwind: { path: `$${path}`, preserveNullAndEmptyArrays: true },
  },
];

module.exports = {
  getSelectQuery,
  getSortQuery,
  parseCondition,
  findDocument,
  createOne,
  updateOne,
  checkExists,
  getDateQuery,
  getLookup,
};
