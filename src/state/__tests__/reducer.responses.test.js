import combinedReducer from '../reducer';
import { responses } from '../reducer';

describe('reducers', () => {
  const irrelevantAction = {
    type: 'IRRELEVANT',
    payload: null
  };
  const combinedReducerDefaultState = combinedReducer(undefined, irrelevantAction);

  describe('responses', () => {
    const defaultState = {
      dictionary: {},
      isFetching: false
    };

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
      const result = responses({
        dictionary: {},
        isFetching: false
      }, {
        type: 'RECEIVE_AGGREGATIONS',
        payload: {
          submissions: [
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
        dictionary: {
          '01234': { sentiment: 'meh' },
          '56789': { sentiment: 'woo' },
          '10111': { sentiment: 'boo' }
        },
        isFetching: false
      });
    });
  });

});
