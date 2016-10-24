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

describe.skip('getResponses', () => {
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

describe('getIsFetching', () => {
  const { getIsFetching } = selectors;

  it('is a defined function', () => {
    expect(getIsFetching).toBeDefined();
    expect(getIsFetching).toBeInstanceOf(Function);
  });

  it('returns false if no fetches are in progress', () => {
    const store = {
      questions: { isFetching: false },
      responses: { isFetching: false },
      summary: { isFetching: false }
    };
    const result = getIsFetching(store);
    expect(result).toBe(false);
  });

  it('returns true if a questions fetch is in progress', () => {
    const store = {
      questions: { isFetching: true },
      responses: { isFetching: false },
      summary: { isFetching: false }
    };
    const result = getIsFetching(store);
    expect(result).toBe(true);
  });

  it('returns true if a questions fetch is in progress', () => {
    const store = {
      questions: { isFetching: false },
      responses: { isFetching: true },
      summary: { isFetching: false }
    };
    const result = getIsFetching(store);
    expect(result).toBe(true);
  });

  it('returns true if a summary fetch is in progress', () => {
    const store = {
      questions: { isFetching: false },
      responses: { isFetching: false },
      summary: { isFetching: true }
    };
    const result = getIsFetching(store);
    expect(result).toBe(true);
  });

  it('returns true if multiple fetches are in progress', () => {
    const store = {
      questions: { isFetching: true },
      responses: { isFetching: false },
      summary: { isFetching: true }
    };
    const result = getIsFetching(store);
    expect(result).toBe(true);
  });

});
