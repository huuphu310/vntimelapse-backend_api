const convertObjectIdToString = (obj) => {
  if (typeof obj !== 'object') {
    return obj;
  }

  // typeof null = object
  if (obj === null) {
    return null;
  }

  // Check if obj is Mongoose Object
  if (obj._doc) {
    return convertObjectIdToString(obj.toJSON());
  }

  // Check if obj is ObjectId
  if (obj._bsontype === 'ObjectId') {
    return obj.toString();
  }

  Object.keys(obj).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    obj[key] = convertObjectIdToString(obj[key]);
  });

  if (Array.isArray(obj)) return obj;
  if (Object.prototype.toString.call(obj) === '[object Date]') return obj;

  return obj;
};

const normalizeObject = (obj) => convertObjectIdToString(obj);

const updateNestedObjectParser = (nestedUpdateObject) => {
  const final = {};
  Object.keys(nestedUpdateObject).forEach((k) => {
    if (
      typeof nestedUpdateObject[k] === 'object' &&
      !Array.isArray(nestedUpdateObject[k])
    ) {
      const res = updateNestedObjectParser(nestedUpdateObject[k]);
      Object.keys(res).forEach((a) => {
        final[`${k}.${a}`] = res[a];
      });
    } else final[k] = nestedUpdateObject[k];
  });
  return final;
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

module.exports = {
  convertObjectIdToString,
  normalizeObject,
  updateNestedObjectParser,
  mergeDeep,
};
