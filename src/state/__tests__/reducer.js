import combinedReducer from '../reducer';
import {
  responses,
  questions,
  selected
} from '../reducer';

describe('reducers', () => {
  const irrelevantAction = {
    type: 'IRRELEVANT',
    payload: null
  };
  const combinedReducerDefaultState = combinedReducer(undefined, irrelevantAction);

  describe('rootReducer', () => {
    it('is a defined function', () => {
      expect(combinedReducer).toBeDefined();
      expect(combinedReducer).toBeInstanceOf(Function);
    });
  });

  describe('responses', () => {
    const defaultState = {};

    it('is a defined function', () => {
      expect(responses).toBeDefined();
      expect(responses).toBeInstanceOf(Function);
    });

    it('generates the default state', () => {
      const result = responses(undefined, irrelevantAction);
      expect(result).toEqual(defaultState);
    });

    it('is represented in the combined default state', () => {
      expect(combinedReducerDefaultState.responses).toEqual(defaultState)
    });

    it('populates the state when data is received', () => {
      const result = responses({}, {
        type: 'RECEIVE_AGGREGATIONS',
        payload: {
          latest: [
            {
              response_id: '01234',
              sentiment: 'meh'
            },
            {
              response_id: '56789',
              sentiment: 'woo'
            },
            {
              response_id: '10111',
              sentiment: 'boo'
            },
          ]
        }
      });
      expect(result).toEqual({
        '01234': { sentiment: 'meh' },
        '56789': { sentiment: 'woo' },
        '10111': { sentiment: 'boo' }
      });
    });
  });

  describe('questions', () => {
    const defaultState = {
      questions: {},
      isFetching: false
    };

    it('is a defined function', () => {
      expect(questions).toBeDefined();
      expect(questions).toBeInstanceOf(Function);
    });

    it('sets the correct default state', () => {
      const result = questions(undefined, irrelevantAction);
      expect(result).toEqual(defaultState);
    });

    it('is represented in the combined default state', () => {
      expect(combinedReducerDefaultState.questions).toEqual(defaultState);
    });

    it('sets isFetching when questions are requested', () => {
      const result = questions(defaultState, {
        type: 'REQUEST_QUESTIONS'
      });
      expect(result).toEqual({
        questions: {},
        isFetching: true
      });
    });

    it('clears isFetching when questions are returned', () => {
      const result = questions({
        questions: {},
        isFetching: true
      }, {
        type: 'RECEIVE_QUESTIONS',
        payload: {}
      });
      expect(result.isFetching).toEqual(false);
    });

    it('stores returned questions', () => {
      const result = questions(defaultState, {
        type: 'RECEIVE_QUESTIONS',
        payload: {
          '01234': { question: 'why' },
          '56789': { question: 'how' },
          '10111': { question: 'when' }
        }
      });
      expect(result).not.toBe(defaultState);
      expect(result).toEqual({
        questions: {
          '01234': { question: 'why' },
          '56789': { question: 'how' },
          '10111': { question: 'when' }
        },
        isFetching: false
      });
    });

    it('replaces questions when new questions are returned', () => {
      const result = questions({
        questions: {
          '01234': { question: 'why' },
          '56789': { question: 'how' },
          '10111': { question: 'when' }
        },
        isFetching: true
      }, {
        type: 'RECEIVE_QUESTIONS',
        payload: {
          '10111': { question: 'whether' },
          '56789': { question: 'whence' },
          '01234': { question: 'wherefore' }
        }
      });
      expect(result).not.toBe(defaultState);
      expect(result).toEqual({
        questions: {
          '10111': { question: 'whether' },
          '56789': { question: 'whence' },
          '01234': { question: 'wherefore' }
        },
        isFetching: false
      });
    });
  });

  describe('selected', () => {
    it('is a defined function', () => {
      expect(selected).toBeDefined();
      expect(selected).toBeInstanceOf(Function);
    });

    it('sets the correct default state', () => {
      const result = selected(undefined, irrelevantAction);
      expect(result).toBeNull();
    });

    it('is represented in the combined default state', () => {
      expect(combinedReducerDefaultState.selected).toBeNull();
    });

    it('can set the selected emoji', () => {
      const result = selected(null, {
        type: 'SELECT_EMOJI',
        payload: '✨'
      });
      expect(result).toBe('✨');
    });

    it('can change the selected emoji', () => {
      const result = selected('✨', {
        type: 'SELECT_EMOJI',
        payload: '❄'
      });
      expect(result).toBe('❄');
    });

    it('can deselect the current emoji', () => {
      const result = selected('✨', {
        type: 'SELECT_EMOJI',
        payload: '✨'
      });
      expect(result).toBe(null);
    });
  });

});
