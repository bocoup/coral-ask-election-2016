import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import * as api from '../api/api';

/**
 * Action creators for requesting and receiving data. Identity used for payload
 */
export const requestData = createAction('REQUEST_DATA');
export const receiveData = createAction('RECEIVE_DATA');

/**
 * Action creator to fetch summary data from the API
 */
const fetchData = () => (dispatch) => {
  dispatch(requestData());
  return api.getSummary().then(data => dispatch(receiveData(data)));
};

/**
 * Helper to check if we have already fetched the data or not
 */
function shouldFetchData(state) {
  return !state.summary.payload || !state.summary.isFetching;
}

/**
 * Action creator to fetch data only if we haven't fetched it before.
 */
export const fetchDataIfNeeded = () => (dispatch, getState) => (
  shouldFetchData(getState()) ? dispatch(fetchData()) : Promise.resolve()
);

/**
 * Summary reducer
 */
const summary = handleActions({
  REQUEST_DATA: () => ({
    isFetching: true
  }),

  RECEIVE_DATA: (state, action) => ({
    payload: action.payload.emotions,
    isFetching: false
  })
}, {
  isFetching: false
});

export default combineReducers({
  summary
});
