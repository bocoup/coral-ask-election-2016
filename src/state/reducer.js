import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import omitKeys from '../utils/omit-keys';

/**
 * Summary reducer
 */
export const summary = handleActions({
  REQUEST_AGGREGATIONS: state => ({
    aggregations: state.aggregations,
    isFetching: true
  }),

  RECEIVE_AGGREGATIONS: (state, action) => ({
    aggregations: action.payload.aggregations,
    isFetching: false
  })
}, {
  aggregations: null,
  isFetching: false
});

export const questions = handleActions({
  REQUEST_QUESTIONS: state => Object.assign({}, state, {
    isFetching: true
  }),

  RECEIVE_QUESTIONS: (state, action) => ({
    questions: action.payload,
    isFetching: false
  })
}, {
  dictionary: {},
  isFetching: false
});

export const selected = handleActions({
  SELECT_EMOJI: (state, action) => {
    if (state === action.payload) {
      return null;
    }
    return action.payload;
  }
}, null);

export const responses = handleActions({
  // Not yet called
  REQUEST_RESPONSES: state => Object.assign({}, state, {
    isFetching: true
  }),

  // Does not currently impact the isFetching state
  RECEIVE_AGGREGATIONS: (state, action) => ({
    dictionary: action.payload.submissions
      .reduce((carry, response) => Object.assign({}, carry, {
        [response.response_id]: omitKeys(response, ['response_id'])
      }), state.dictionary),
    isFetching: state.isFetching
  })
}, {
  dictionary: {},
  isFetching: false
});

export default combineReducers({
  summary,
  selected,
  questions,
  responses
});
