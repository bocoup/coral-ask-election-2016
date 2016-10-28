import { createAction } from 'redux-actions';
import * as api from '../api/api';

/**
 * Action creators for requesting and receiving data. Identity used for payload
 */
export const requestFormDigest = createAction('REQUEST_FORM_DIGEST');
export const receiveFormDigest = createAction('RECEIVE_FORM_DIGEST');
export const requestFields = createAction('REQUEST_FIELDS');
export const receiveFields = createAction('RECEIVE_FIELDS');

/**
 * Action creator for selecting an emoji filter. Identity used for payload
 */
export const selectEmoji = createAction('SELECT_EMOJI');
export const selectTopic = createAction('SELECT_TOPIC');

/**
 * Action creator to fetch aggregated form data from the API
 */
const fetchFormDigest = () => (dispatch) => {
  dispatch(requestFormDigest());
  return api.getAggregations().then(data => dispatch(receiveFormDigest(data)));
};

/**
 * Helper to check if we have already fetched the aggregation data or not
 */
function shouldFetchFormDigest(state) {
  return !state.summary.aggregations && !state.summary.isFetching;
}

/**
 * Action creator to fetch root aggregation data only if we haven't fetched it
 * before (it can be considered static for the lifetime of one page/app view).
 */
export const fetchFormDigestIfNeeded = () => (dispatch, getState) => (
  shouldFetchFormDigest(getState()) ? dispatch(fetchFormDigest()) : Promise.resolve()
);

/**
 * Helper to check if we already fetched the google spreadsheet
 * fields
 */
function shouldFetchFields(state) {
  return !state.fields.data && !state.fields.isFetching;
}

/**
 * Helper to fetch the fields & dispatch appropriate actions
 * @return {Promise} Promise.
 */
const fetchFields = () => (dispatch) => {
  dispatch(requestFields());
  return api.getContent().then(data => dispatch(receiveFields(data)));
};

/**
 * fetches fields if they are needed
 */
export const fetchFieldsIfNeeded = () => (dispatch, getState) => (
  shouldFetchFields(getState()) ? dispatch(fetchFields()) : Promise.resolve()
);
