import combinedReducer from '../reducer';
import {
  responses,
  selected
} from '../reducer';

describe('reducers', () => {
  const irrelevantAction = {
    type: 'IRRELEVANT',
    payload: null
  };

  describe('rootReducer', () => {
    it('is a defined function', () => {
      expect(combinedReducer).toBeDefined();
      expect(combinedReducer).toBeInstanceOf(Function);
    });

    it('generates the default state', () => {
      const result = combinedReducer(undefined, irrelevantAction);
      expect(result).toEqual({
        responses: {},
        selected: null,
        summary: {
          isFetching: false
        }
      });
    });
  });

  describe('responses', () => {
    it('is a defined function', () => {
      expect(responses).toBeDefined();
      expect(responses).toBeInstanceOf(Function);
    });

    it('generates the default state', () => {
      const result = responses(undefined, irrelevantAction);
      expect(result).toEqual({});
    });

    it('populates the state when data is received', () => {
      const result = responses({}, {
        type: 'RECEIVE_DATA',
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

  describe('selected', () => {
    it('is a defined function', () => {
      expect(selected).toBeDefined();
      expect(selected).toBeInstanceOf(Function);
    });

    it('sets the correct default state', () => {
      const result = selected(undefined, irrelevantAction);
      expect(result).toBeNull();
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
