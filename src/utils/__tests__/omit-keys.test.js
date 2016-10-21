import omitKeys from '../omit-keys';

describe('omitKeys', () => {
  const obj = {
    some: 'object',
    obj: 'with',
    a: 'handful',
    of: 'keys'
  };
  Object.freeze(obj);

  it('is a defined function', () => {
    expect(omitKeys).toBeDefined();
    expect(omitKeys).toBeInstanceOf(Function);
  });

  it('returns an object with the same keys when provided no keys to omit', () => {
    const result = omitKeys(obj);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });

  it('returns an object with the same keys when provided empty array', () => {
    const result = omitKeys(obj, []);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });

  it('omits the specified keys', () => {
    const result = omitKeys(obj, [
      'obj',
      'of'
    ]);
    expect(result).not.toBe(obj);
    expect(result).toEqual({
      some: 'object',
      a: 'handful'
    });
  });

});
