import * as selectors from '../selectors';

// Re-usable store values
const responsesDictionary = {
  aaa: {
    id: 'aaa',
    emoji: '🚌'
  },
  bbb: {
    id: 'bbb',
    emoji: '🍩'
  },
  ccc: {
    id: 'ccc',
    emoji: '🍸'
  },
  ddd: {
    id: 'ddd',
    emoji: '🍸'
  },
  eee: {
    id: 'eee',
    emoji: '🍩'
  },
  fff: {
    id: 'fff',
    emoji: '🍩'
  }
};

describe('getAggregations', () => {
  const { getAggregations } = selectors;

  it('is a defined function', () => {
    expect(getAggregations).toBeDefined();
    expect(getAggregations).toBeInstanceOf(Function);
  });

  it('returns the proper object from the state', () => {
    const aggregations = {
      emotions: 'mixed'
    };
    const result = getAggregations({
      summary: {
        aggregations
      }
    });
    expect(result).toEqual(aggregations);
  });
});

describe('getQuestions', () => {
  const { getQuestions } = selectors;

  it('is a defined function', () => {
    expect(getQuestions).toBeDefined();
    expect(getQuestions).toBeInstanceOf(Function);
  });

  it('returns the dictionary of questions from the state', () => {
    const result = getQuestions({
      questions: {
        dictionary: {
          a: 1,
          b: 2
        }
      }
    });
    expect(result).toEqual({
      a: 1,
      b: 2
    });
  });
});

describe('getResponsesList', () => {
  const { getResponsesList } = selectors;
  const store = {
    responses: {
      dictionary: responsesDictionary
    }
  };

  it('is a defined function', () => {
    expect(getResponsesList).toBeDefined();
    expect(getResponsesList).toBeInstanceOf(Function);
  });

  it('returns an array of all available responses', () => {
    const result = getResponsesList(store);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toEqual(Object.keys(store.responses.dictionary).length);
    expect(result).toContainEqual({
      id: 'aaa',
      emoji: '🚌'
    });
    expect(result).toContainEqual({
      id: 'bbb',
      emoji: '🍩'
    });
    expect(result).toContainEqual({
      id: 'ccc',
      emoji: '🍸'
    });
    expect(result).toContainEqual({
      id: 'ddd',
      emoji: '🍸'
    });
    expect(result).toContainEqual({
      id: 'eee',
      emoji: '🍩'
    });
    expect(result).toContainEqual({
      id: 'fff',
      emoji: '🍩'
    });
  });

  it('returns an array of responses that match the provided parameters', () => {
    const result = getResponsesList(store, {
      emoji: '🍩'
    });
    expect(result).toBeInstanceOf(Array);
    expect(result.map(r => r.emoji)).toEqual(['🍩', '🍩', '🍩']);
    expect(result.map(r => r.id).sort()).toEqual(['bbb', 'eee', 'fff']);
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

describe('getEmojiList', () => {
  const { getEmojiList } = selectors;

  it('is a defined function', () => {
    expect(getEmojiList).toBeDefined();
    expect(getEmojiList).toBeInstanceOf(Function);
  });

  it('does not blow up if no emoji are loaded', () => {
    expect(getEmojiList({
      questions: {}
    })).toEqual([]);
  });

  it('returns a list of the emoji specified in the grouping question', () => {
    const result = getEmojiList({
      questions: {
        dictionary: {
          emojiQ: {
            group_by: true,
            options: [{
              id: 'a',
              answer: '✨'
            }, {
              id: 'b',
              answer: '🍩'
            }]
          }
        }
      }
    });
    expect(result).toEqual([{
      id: 'a',
      answer: '✨'
    }, {
      id: 'b',
      answer: '🍩'
    }]);
  });

});

describe('getEmojiCounts', () => {
  const { getEmojiCounts } = selectors;

  it('is a defined function', () => {
    expect(getEmojiCounts).toBeDefined();
    expect(getEmojiCounts).toBeInstanceOf(Function);
  });

  it('does not blow up if no emoji are loaded', () => {
    expect(getEmojiCounts({
      summary: {},
      questions: {}
    })).toEqual([]);
  });

  it('returns a list of the emoji specified in the grouping question', () => {
    const result = getEmojiCounts({
      summary: {
        aggregations: {
          a: {
            count: 2
          },
          b: {
            count: 1
          }
        }
      },
      questions: {
        dictionary: {
          emojiQ: {
            group_by: true,
            options: [{
              id: 'a',
              answer: '✨'
            }, {
              id: 'b',
              answer: '🍩'
            }]
          }
        }
      }
    });
    expect(result).toEqual([{
      id: 'a',
      answer: '✨',
      count: 2
    }, {
      id: 'b',
      answer: '🍩',
      count: 1
    }]);
  });

})
