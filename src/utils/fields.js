export default function fieldValue(fields, key, defaultValue = '') {
  if (fields[key]) {
    return fields[key].Value;
  }
  return defaultValue;
}
