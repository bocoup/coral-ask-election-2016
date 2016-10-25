export default function objectToList(obj) {
  return obj ?
    Object.keys(obj).map(key => obj[key]) :
    [];
}
