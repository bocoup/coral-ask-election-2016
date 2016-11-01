import combinedReducer from '../reducer';
import { summary } from '../reducer';

describe('reducers', () => {
  const irrelevantAction = {
    type: 'IRRELEVANT',
    payload: null
  };
  const combinedReducerDefaultState = combinedReducer(undefined, irrelevantAction);

  describe('summary', () => {
    const defaultState = {
      count: 0,
      aggregations: null,
      isFetching: false
    };

    it('is a defined function', () => {
      expect(summary).toBeDefined();
      expect(summary).toBeInstanceOf(Function);
    });

    it('generates the default state', () => {
      const result = summary(undefined, irrelevantAction);
      expect(result).toEqual(defaultState);
    });

    it('is represented in the combined default state', () => {
      expect(combinedReducerDefaultState.summary).toEqual(defaultState)
    });

    it('sets isFetching on data request', () => {
      const result = summary(defaultState, {
        type: 'REQUEST_FORM_DIGEST'
      });
      expect(result.isFetching).toBe(true);
    });

    it('clears isFetching when data is received', () => {
      const result = summary(defaultState, {
        type: 'RECEIVE_FORM_DIGEST',
        payload: {}
      });
      expect(result.isFetching).toBe(false);
    });

    it('populates the aggregations from the action payload', () => {
      const result = summary(defaultState, {
        type: 'RECEIVE_FORM_DIGEST',
        payload: {
          aggregations: {
            dictionary: 'object'
          },
          submissions: []
        }
      });
      expect(result).toEqual({
        aggregations: {
          dictionary: 'object'
        },
        isFetching: false
      });
    });

    it('does not modify aggregations when requesting new data', () => {
      const aggregations = {
        dictionary: 'object'
      };
      const result = summary({
        aggregations,
        isFetching: false
      }, {
        type: 'REQUEST_FORM_DIGEST'
      });
      expect(result.aggregations).toEqual(aggregations);
    });

    it('overwrites the aggregations when new data is retrieved', () => {
      const result = summary({
        aggregations: {
          dictionary: 'object'
        },
        isFetching: true
      }, {
        type: 'RECEIVE_FORM_DIGEST',
        payload: {
          aggregations: {
            different: 'aggregation dictionary'
          },
          submissions: []
        }
      });
      expect(result).toEqual({
        aggregations: {
          different: 'aggregation dictionary'
        },
        isFetching: false
      });
    });
  });

});
