import safeDeepAccess from '../safe-deep-access';

describe('safeDeepAccess', () => {
  const obj = {
    some: {
      deeply: {
        nested: 'object'
      },
      numeric: {
        count: 6
      }
    }
  };

  it('is a defined function', () => {
    expect(safeDeepAccess).toBeDefined();
    expect(safeDeepAccess).toBeInstanceOf(Function);
  });

  it('returns undefined without erroring if an invalid path is supplied', () => {
    const result = safeDeepAccess(obj, ['some', 'invalid', 'keys']);
    expect(result).toBeUndefined();
  });

  it('returns the value at the provided nested location in the object', () => {
    const result = safeDeepAccess(obj, ['some', 'deeply', 'nested']);
    expect(result).toEqual('object');
  });

  it('returns a less-nested value within the same object', () => {
    const result = safeDeepAccess(obj, ['some', 'numeric', 'count']);
    expect(result).toEqual(6);
  });

});
