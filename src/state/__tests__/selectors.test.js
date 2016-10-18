import * as selectors from '../selectors';

describe('getSummary', () => {
  const { getSummary } = selectors;

  it('is a defined function', () => {
    expect(getSummary).toBeDefined();
  });

  it('is a function', () => {
    expect(getSummary).toBeInstanceOf(Function);
  });

  it('returns the proper object from the state', () => {
    const payload = {
      emotions: 'mixed'
    };
    const result = getSummary({
      summary: {
        payload
      }
    });
    expect(result).toEqual(payload);
  });

});
