import deepFreeze from 'deep-freeze';
import * as selectors from '../selectors';
import combinedReducer from '../reducer';

const defaultState = combinedReducer(undefined, {
  type: 'IRRELEVANT',
  payload: null
});
deepFreeze(defaultState);

const populatedState = {
  selected: {
    emoji: null,
    topic: 'econ'
  },
  questions: {
    filters: {
      emoji: 'emoji',
      topic: 'focus'
    },
    dictionary: {
      emoji: {
        id: 'emoji',
        type: 'MultipleChoice',
        group_by: true,
        options: [
          { id: 'happy', value: '✨' },
          { id: 'hungry', value: '🍩' }
        ]
      },
      focus: {
        id: 'focus',
        type: 'MultipleChoice',
        group_by: true,
        options: [
          { id: 'econ', value: 'Economy' },
          { id: 'edu', value: 'Education' },
          { id: 'env', value: 'Environment' }
        ]
      }
    }
  },
  summary: {
    aggregations: {
      happy: {
        count: 12,
        focus: {
          econ: 2,
          env: 6,
          edu: 4
        }
      },
      hungry: {
        count: 7,
        focus: {
          econ: 1,
          env: 6
        }
      },
      econ: {
        count: 3,
        emoji: {
          happy: 2,
          hungry: 1
        }
      },
      edu: {
        count: 4,
        emoji: {
          happy: 4
        }
      },
      env: {
        count: 12,
        emoji: {
          happy: 6,
          hungry: 6
        }
      }
    }
  },
  fields: {
    data: [{
      Description: 'Interactive Title',
      Value: 'Tell Our next President',
      'field-id (don\'t change!)': 'elc-text-title'
    }, {
      Description: 'Filter by Feeling Title',
      Value: 'Filter by Feeling',
      'field-id (don\'t change!)': 'elc-text-filter-by-feeling-header'
    }],
    isFetching: false
  },
  responses: {
    order: [ 'aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff' ],
    dictionary: {
      bbb: {
        id: 'bbb',
        emoji: '🍩'
      },
      ccc: {
        id: 'ccc',
        emoji: '🍸'
      },
      aaa: {
        id: 'aaa',
        emoji: '🚌'
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
    }
  }
};
deepFreeze(populatedState);

describe('getResponses', () => {
  const { getResponses } = selectors;

  it('is a defined function', () => {
    expect(getResponses).toBeDefined();
    expect(getResponses).toBeInstanceOf(Function);
  });

  it('returns the proper value from the default state', () => {
    const result = getResponses(defaultState);
    expect(result).toEqual({});
  });

  it('returns the proper value from the state', () => {
    const result = getResponses(populatedState);
    expect(result).toBe(populatedState.responses.dictionary);
    expect(result.aaa).toEqual({
      id: 'aaa',
      emoji: '🚌'
    });
  });
});

describe('getSelected', () => {
  const { getSelected } = selectors;

  it('is a defined function', () => {
    expect(getSelected).toBeDefined();
    expect(getSelected).toBeInstanceOf(Function);
  });

  it('returns the proper value from the default state', () => {
    const result = getSelected(defaultState);
    expect(result).toEqual({
      emoji: null,
      topic: null
    });
  });

  it('returns the proper value from the state', () => {
    const result = getSelected({
      selected: {
        emoji: '156be6',
        topic: 'ae9815'
      }
    });
    expect(result).toEqual({
      emoji: '156be6',
      topic: 'ae9815'
    });
  });
});

describe('getAggregations', () => {
  const { getAggregations } = selectors;

  it('is a defined function', () => {
    expect(getAggregations).toBeDefined();
    expect(getAggregations).toBeInstanceOf(Function);
  });

  it('returns the proper value from the default state', () => {
    const result = getAggregations(defaultState);
    expect(result).toBeNull();
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

  it('returns the proper value from the default state', () => {
    const result = getQuestions(defaultState);
    expect(result).toEqual({});
  });

  it('returns the dictionary of questions from the state', () => {
    const result = getQuestions(populatedState);
    expect(result).toBe(populatedState.questions.dictionary);
    expect(result.emoji).toEqual({
      id: 'emoji',
      type: 'MultipleChoice',
      group_by: true,
      options: [
        { id: 'happy', value: '✨' },
        { id: 'hungry', value: '🍩' }
      ]
    });
  });
});

describe('getFilterQuestions', () => {
  const { getFilterQuestions } = selectors;

  it('is a defined function', () => {
    expect(getFilterQuestions).toBeDefined();
    expect(getFilterQuestions).toBeInstanceOf(Function);
  });

  it('returns the proper value from the default state', () => {
    const result = getFilterQuestions(defaultState);
    expect(result).toEqual({
      emoji: null,
      topic: null
    });
  });

  it('returns the filter question IDs from the state', () => {
    const result = getFilterQuestions(populatedState);
    expect(result).toBe(populatedState.questions.filters);
    expect(result).toEqual({
      emoji: 'emoji',
      topic: 'focus'
    });
  });
});

describe('getContentFields', () => {
  const { getContentFields } = selectors;

  it('is a defined function', () => {
    expect(getContentFields).toBeDefined();
    expect(getContentFields).toBeInstanceOf(Function);
  });

  it('returns the proper value from the default state', () => {
    const result = getContentFields(defaultState);
    expect(result).toEqual(null);
  });

  it('returns the filter question IDs from the state', () => {
    const result = getContentFields(populatedState);
    expect(result).toBe(populatedState.fields.data);
    expect(result).toEqual([{
      Description: 'Interactive Title',
      Value: 'Tell Our next President',
      'field-id (don\'t change!)': 'elc-text-title'
    }, {
      Description: 'Filter by Feeling Title',
      Value: 'Filter by Feeling',
      'field-id (don\'t change!)': 'elc-text-filter-by-feeling-header'
    }]);
  });
});

describe('getResponsesList', () => {
  const { getResponsesList } = selectors;

  it('is a defined function', () => {
    expect(getResponsesList).toBeDefined();
    expect(getResponsesList).toBeInstanceOf(Function);
  });

  it('returns an array of all available responses, in order', () => {
    const result = getResponsesList(populatedState);
    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual([
      { id: 'aaa', emoji: '🚌' },
      { id: 'bbb', emoji: '🍩' },
      { id: 'ccc', emoji: '🍸' },
      { id: 'ddd', emoji: '🍸' },
      { id: 'eee', emoji: '🍩' },
      { id: 'fff', emoji: '🍩' }
    ]);
  });

});

describe('getIsFetching', () => {
  const { getIsFetching } = selectors;

  it('is a defined function', () => {
    expect(getIsFetching).toBeDefined();
    expect(getIsFetching).toBeInstanceOf(Function);
  });

  it('returns false if no fetches are in progress', () => {
    const store = {
      fields: { isFetching: false },
      responses: { isFetching: false },
      summary: { isFetching: false }
    };
    const result = getIsFetching(store);
    expect(result).toBe(false);
  });

  it('returns true if a fields fetch is in progress', () => {
    const store = {
      fields: { isFetching: true },
      responses: { isFetching: false },
      summary: { isFetching: false }
    };
    const result = getIsFetching(store);
    expect(result).toBe(true);
  });

  it('returns true if a responses fetch is in progress', () => {
    const store = {
      fields: { isFetching: false },
      responses: { isFetching: true },
      summary: { isFetching: false }
    };
    const result = getIsFetching(store);
    expect(result).toBe(true);
  });

  it('returns true if a summary fetch is in progress', () => {
    const store = {
      fields: { isFetching: false },
      responses: { isFetching: false },
      summary: { isFetching: true }
    };
    const result = getIsFetching(store);
    expect(result).toBe(true);
  });

  it('returns true if multiple fetches are in progress', () => {
    const store = {
      fields: { isFetching: true },
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
    expect(getEmojiList(defaultState)).toEqual([]);
  });

  it('returns a list of the emoji specified in the grouping question', () => {
    const result = getEmojiList(populatedState);
    expect(result).toEqual([{
      id: 'happy',
      value: '✨'
    }, {
      id: 'hungry',
      value: '🍩'
    }]);
  });

});

describe('getEmojiQuestion', () => {
  const { getEmojiQuestion } = selectors;

  it('is a defined function', () => {
    expect(getEmojiQuestion).toBeDefined();
    expect(getEmojiQuestion).toBeInstanceOf(Function);
  });

  it('returns undefined before questions are available', () => {
    const result = getEmojiQuestion(defaultState);
    expect(result).toBeUndefined();
  });

  it('returns the emoji question', () => {
    const result = getEmojiQuestion(populatedState);
    expect(result).toEqual({
      id: 'emoji',
      type: 'MultipleChoice',
      group_by: true,
      options: [
        { id: 'happy', value: '✨' },
        { id: 'hungry', value: '🍩' }
      ]
    });
  });
});

describe('getTopicQuestion', () => {
  const { getTopicQuestion } = selectors;

  it('is a defined function', () => {
    expect(getTopicQuestion).toBeDefined();
    expect(getTopicQuestion).toBeInstanceOf(Function);
  });

  it('returns undefined before questions are available', () => {
    const result = getTopicQuestion(defaultState);
    expect(result).toBeUndefined();
  });

  it('returns the topic question', () => {
    const result = getTopicQuestion(populatedState);
    expect(result).toEqual({
      id: 'focus',
      type: 'MultipleChoice',
      group_by: true,
      options: [
        { id: 'econ', value: 'Economy' },
        { id: 'edu', value: 'Education' },
        { id: 'env', value: 'Environment' }
      ]
    });
  });
});

describe('getSelectedEmoji', () => {
  const { getSelectedEmoji } = selectors;

  it('is a defined function', () => {
    expect(getSelectedEmoji).toBeDefined();
    expect(getSelectedEmoji).toBeInstanceOf(Function);
  });

  it('returns undefined before questions are available', () => {
    const result = getSelectedEmoji(defaultState);
    expect(result).toBeUndefined();
  });

  it('returns the selected option from the emoji question', () => {
    const result = getSelectedEmoji(Object.assign({}, populatedState, {
      selected: {
        emoji: 'happy'
      }
    }));
    expect(result).toEqual({
      id: 'happy',
      value: '✨'
    });
  });
});

describe('getSelectedTopic', () => {
  const { getSelectedTopic } = selectors;

  it('is a defined function', () => {
    expect(getSelectedTopic).toBeDefined();
    expect(getSelectedTopic).toBeInstanceOf(Function);
  });

  it('returns undefined before questions are available', () => {
    const result = getSelectedTopic(defaultState);
    expect(result).toBeUndefined();
  });

  it('returns the selected option from the topic question', () => {
    const result = getSelectedTopic(populatedState);
    expect(result).toEqual({
      id: 'econ',
      value: 'Economy'
    });
  });
});

describe('get____Counts', () => {
  describe('getTopicCounts', () => {
    const { getTopicCounts } = selectors;

    it('is a defined function', () => {
      expect(getTopicCounts).toBeDefined();
      expect(getTopicCounts).toBeInstanceOf(Function);
    });

    it('returns an array', () => {
      const result = getTopicCounts(populatedState);
      expect(result).toBeInstanceOf(Array);
    });

    it('does not blow up if no emoji are loaded', () => {
      expect(getTopicCounts(defaultState)).toEqual([]);
    });

    it('returns a dictionary by question ID of topic object lists, with counts', () => {
      const result = getTopicCounts(populatedState);
      expect(result).toEqual([
        { id: 'econ', value: 'Economy', count: 3 },
        { id: 'edu', value: 'Education', count: 4 },
        { id: 'env', value: 'Environment', count: 12 }
      ]);
    });

  });

  describe('getEmojiCounts', () => {
    const { getEmojiCounts } = selectors;

    it('is a defined function', () => {
      expect(getEmojiCounts).toBeDefined();
      expect(getEmojiCounts).toBeInstanceOf(Function);
    });

    it('returns an array', () => {
      const result = getEmojiCounts(populatedState);
      expect(result).toBeInstanceOf(Array);
    });

    it('does not blow up if no emoji are loaded', () => {
      expect(getEmojiCounts(defaultState)).toEqual([]);
    });

    it('returns a list of the emoji specified in the grouping question', () => {
      const result = getEmojiCounts(populatedState);
      expect(result).toEqual([
        { id: 'happy', value: '✨', count: 12 },
        { id: 'hungry', value: '🍩', count: 7 }
      ]);
    });

  });

  describe('getEmojiCountsFilteredByTopic', () => {
    const { getEmojiCountsFilteredByTopic } = selectors;

    it('is a defined function', () => {
      expect(getEmojiCountsFilteredByTopic).toBeDefined();
      expect(getEmojiCountsFilteredByTopic).toBeInstanceOf(Function);
    });

    it('returns an array', () => {
      const result = getEmojiCountsFilteredByTopic(populatedState);
      expect(result).toBeInstanceOf(Array);
    });

    it('does not blow up if no emoji are loaded', () => {
      expect(getEmojiCountsFilteredByTopic(defaultState)).toEqual(null);
    });

    it('returns a list of the emoji specified in the grouping question', () => {
      const result = getEmojiCountsFilteredByTopic(populatedState);
      expect(result).toEqual([
        { id: 'happy', value: '✨', count: 2 },
        { id: 'hungry', value: '🍩', count: 1 }
      ]);
    });

  });

});
