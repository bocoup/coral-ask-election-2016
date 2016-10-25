import objectToList from '../object-to-list';

describe('objectToList', () => {
  const obj = {
    some: 'object',
    obj: 'with',
    a: 'handful',
    of: 'keys'
  };
  Object.freeze(obj);

  it('is a defined function', () => {
    expect(objectToList).toBeDefined();
    expect(objectToList).toBeInstanceOf(Function);
  });

  it('returns an array of the values of the object', () => {
    const result = objectToList(obj);
    expect(result.length).toEqual(4);
    expect(result).toContain('object');
    expect(result).toContain('with');
    expect(result).toContain('handful');
    expect(result).toContain('keys');
  });

  it('returns an empty array if a falsy argument is provided', () => {
    const result = objectToList();
    expect(result).toEqual([]);
  });

});
