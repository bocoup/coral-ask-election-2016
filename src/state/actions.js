import { createAction } from 'redux-actions';
import * as api from '../api/api';

/**
 * Action creators for requesting and receiving data. Identity used for payload
 */
export const requestData = createAction('REQUEST_AGGREGATIONS');
export const receiveData = createAction('RECEIVE_AGGREGATIONS');
export const requestQuestions = createAction('REQUEST_QUESTIONS');
export const receiveQuestions = createAction('RECEIVE_QUESTIONS');

/**
 * Action creator for selecting an emoji filter. Identity used for payload
 */
export const selectEmoji = createAction('SELECT_EMOJI');

/**
 * Action creator to fetch questions (form digest) from the API
 */
export const fetchQuestions = () => (dispatch) => {
  dispatch(requestQuestions());
  return api.getQuestions().then(data => dispatch(receiveQuestions(data)));
};

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
