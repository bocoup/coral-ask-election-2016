/**
 * Converts an array of objects into an object keyed
 * on a specific property.
 * @param  {String} key Name of property to map to
 * @return {Object} resulting map
 */
export default function listToObject(key) {
  return (data) => {
    if (!data) {
      return {};
    }

    if (!(data instanceof Array)) {
      return data;
    }

    const list = {};
    data.forEach((d) => {
      list[d[key]] = d;
    });
    return list;
  };
}
