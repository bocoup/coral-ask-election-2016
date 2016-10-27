import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

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
    dictionary: action.payload,
    isFetching: false
  })
}, {
  dictionary: {},
  isFetching: false
});

/**
 * Google spreadsheet fields
 */
export const fields = handleActions({
  REQUEST_FIELDS: state => Object.assign({}, state, {
    isFetching: true
  }),

  RECEIVE_FIELDS: (state, action) => ({
    data: action.payload,
    isFetching: false
  })
}, {
  data: {},
  isFetching: false
});

export const selected = handleActions({
  SELECT_EMOJI: (state, action) => {
    if (state.emoji === action.payload) {
      return Object.assign({}, state, {
        emoji: null
      });
    }
    return Object.assign({}, state, {
      emoji: action.payload
    });
  },

  SELECT_TOPIC: (state, action) => {
    if (state.topic === action.payload) {
      return Object.assign({}, state, {
        topic: null
      });
    }
    return Object.assign({}, state, {
      topic: action.payload
    });
  }
}, {
  emoji: null,
  topic: null
});

export const responses = handleActions({
  // Not yet called
  REQUEST_RESPONSES: state => Object.assign({}, state, {
    isFetching: true
  }),

  // Does not currently impact the isFetching state
  RECEIVE_AGGREGATIONS: (state, action) => ({
    dictionary: action.payload.submissions
      .reduce((carry, response) => Object.assign({}, carry, {
        [response.id]: response
      }), state.dictionary),
    isFetching: state.isFetching
  })
}, {
  dictionary: {},
  isFetching: false
});

export default combineReducers({
  summary,
  fields,
  selected,
  questions,
  responses
});
