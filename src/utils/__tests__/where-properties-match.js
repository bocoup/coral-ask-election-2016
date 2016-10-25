import wherePropertiesMatch from '../where-properties-match';

describe('wherePropertiesMatch', () => {
  const arr = [
    { prop1: 'a', prop2: 1, order: 0 },
    { prop1: 'b', prop2: 1, order: 1 },
    { prop1: 'a', prop2: 2, order: 2 },
    { prop1: 'c', prop2: 3, order: 3 },
    { prop1: 'a', prop2: 3, order: 4 },
    { prop1: 'c', prop2: 3, order: 5 },
    { prop1: 'c', prop2: 2, order: 6 },
    { prop1: 'b', prop2: 1, order: 7 },
    { prop1: 'a', prop2: 1, order: 8 }
  ];

  it('is a defined function', () => {
    expect(wherePropertiesMatch).toBeDefined();
    expect(wherePropertiesMatch).toBeInstanceOf(Function);
  });

  it('filters an array down to elements which match the provided props', () => {
    const result = wherePropertiesMatch(arr, {
      prop1: 'b'
    });
    expect(result).toEqual([
      { prop1: 'b', prop2: 1, order: 1 },
      { prop1: 'b', prop2: 1, order: 7 }
    ]);
  });

  it('can match on more than one property', () => {
    const result = wherePropertiesMatch(arr, {
      prop1: 'c',
      prop2: 3
    });
    expect(result).toEqual([
      { prop1: 'c', prop2: 3, order: 3 },
      { prop1: 'c', prop2: 3, order: 5 }
    ]);
  });

});
