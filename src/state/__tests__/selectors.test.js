import * as selectors from '../selectors';

describe('getSummary', () => {
  const { getSummary } = selectors;

  it('is a defined function', () => {
    expect(getSummary).toBeDefined();
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

describe('getResponses', () => {
  const { getResponses } = selectors;
  const store = {
    responses: {
      aaa: {
        emoji: '🚌'
      },
      bbb: {
        emoji: '🍩'
      },
      ccc: {
        emoji: '🍸'
      },
      ddd: {
        emoji: '🍸'
      },
      ddd: {
        emoji: '🍩'
      },
      fff: {
        emoji: '🍩'
      }
    }
  };

  it('is a defined function', () => {
    expect(getResponses).toBeDefined();
    expect(getResponses).toBeInstanceOf(Function);
  });

  it('returns an array of responses from the state with the provided answers', () => {
    const payload = {
      emotions: 'mixed'
    };
    const result = getResponses(store);
    expect(result).toEqual(payload);
  });
})
