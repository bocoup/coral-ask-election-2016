import { createAction } from 'redux-actions';
import * as api from '../api/api';
import * as content from '../api/content';

/**
 * Action creators for requesting and receiving data.
 * Identity used for payload
 */
export const requestSummary = createAction('REQUEST_AGGREGATIONS');
export const receiveSummary = createAction('RECEIVE_AGGREGATIONS');
export const requestQuestions = createAction('REQUEST_QUESTIONS');
export const receiveQuestions = createAction('RECEIVE_QUESTIONS');
export const requestFields = createAction('REQUEST_FIELDS');
export const receiveFields = createAction('RECEIVE_FIELDS');

/**
 * Action creator for selecting an emoji filter. Identity used for payload
 */
export const selectEmoji = createAction('SELECT_EMOJI');
export const selectTopic = createAction('SELECT_TOPIC');

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
  dispatch(requestSummary());
  return api.getSummary().then(data => dispatch(receiveSummary(data)));
};

/**
 * Helper to check if we have already fetched the data or not
 */
function shouldFetchData(state) {
  return !state.summary.payload && !state.summary.isFetching;
}

/**
 * Action creator to fetch data only if we haven't fetched it before.
 */
export const fetchDataIfNeeded = () => (dispatch, getState) => (
  shouldFetchData(getState()) ? dispatch(fetchData()) : Promise.resolve()
);

/**
 * Helper to check if we already fetched the google spreadsheet
 * fields
 */
function shouldFetchFields(state) {
  return !Object.keys(state.fields.data).length && !state.fields.isFetching;
}

/**
 * Helper to fetch the fields & dispatch appropriate actions
 * @return {Promise} Promise.
 */
const fetchFields = () => (dispatch) => {
  dispatch(requestFields());
  return content.getFields().then(data => dispatch(receiveFields(data)));
};

/**
 * fetches fields if they are needed
 */
export const fetchFieldsIfNeeded = () => (dispatch, getState) => (
  shouldFetchFields(getState()) ? dispatch(fetchFields()) : Promise.resolve()
);
