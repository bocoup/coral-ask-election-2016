export default (obj, keysToOmit) => Object.keys(obj).reduce((carry, key) => {
  if (keysToOmit && keysToOmit.includes(key)) {
    return carry;
  }
  return Object.assign({
    [key]: obj[key]
  }, carry);
}, {});
