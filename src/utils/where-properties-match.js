export default function wherePropertiesMatch(arr, props) {
  return arr.filter(item => {
    for (const key of Object.keys(props)) {
      if (item[key] !== props[key]) {
        return false;
      }
    }
    return true;
  });
}
