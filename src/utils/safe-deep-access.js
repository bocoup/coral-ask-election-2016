/**
 * Recursive function to simplify deep queries on objects; avoids wrapping
 * some[deep][object][queries][from][dynamic][keys] in a try/catch
 *
 * @param {Object} obj A deeply-nested object
 * @param {String[]} keys An array of string keys representing nested values
 * @returns {*} The value of the value at the specified location within the
 * object, or else undefined
 */
const safeDeepAccess = (obj, keys) => {
  const key = keys.shift();
  const val = obj[key];

  // No result, we've found a scalar, or we're out of keys: either way, send
  // what we've got back up the chain
  if (typeof val !== 'object' || !keys.length) {
    return val;
  }

  // Recurse if there's further to go
  return safeDeepAccess(val, keys);
};

export default safeDeepAccess;
