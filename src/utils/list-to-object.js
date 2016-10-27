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
