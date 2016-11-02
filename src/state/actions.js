import { createAction } from 'redux-actions';
import * as api from '../api/api';
import { combineIds } from '../utils/id-list';

/**
 * Action creators for toggling the form visibility
 */
export const showForm = createAction('SHOW_FORM');
export const hideForm = createAction('HIDE_FORM');


/**
 * Action creators for requesting and receiving data. Identity used for payload
 */
export const requestFormDigest = createAction('REQUEST_FORM_DIGEST');
export const receiveFormDigest = createAction('RECEIVE_FORM_DIGEST');
export const requestFields = createAction('REQUEST_FIELDS');
export const receiveFields = createAction('RECEIVE_FIELDS');
export const requestResponses = createAction('REQUEST_RESPONSES');
export const receiveResponses = createAction('RECEIVE_RESPONSES');

/**
 * Action creator for selecting an emoji filter. Identity used for payload
 */
export const selectEmoji = createAction('SELECT_EMOJI');
export const selectTopic = createAction('SELECT_TOPIC');
export const selectTopicEmoji = createAction('SELECT_TOPIC_EMOJI');

/**
 * Action creator for showing another letter for a specific response.
 * Identity used for payload
 */
export const showNextLetter = createAction('SHOW_NEXT_LETTER', combineIds);

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

/**
 * Action creator to fetch response lists with a specific answer from the API
 */
const fetchResponses = answerId => (dispatch) => {
  dispatch(requestResponses());
  return api.getResponses(answerId).then(data => dispatch(receiveResponses({
    submissions: data,
    answerId
  })));
};

/**
 * Helper to check if we have already fetched the aggregation data or not
 */
function shouldFetchResponses(state, answerId) {
  const { collections, isFetching } = state.responses;

  const currentlyFetching = isFetching[answerId];
  // if the form digest doesn't even return this as a key it will be null, so consider it already fetched.
  // otherwise, we have it, so see if it is empty.
  const alreadyHaveIt = !collections[answerId] || (collections[answerId] && collections[answerId].length);
  return !alreadyHaveIt && !currentlyFetching;
}

/**
 * Action creator to fetch answer responses only if we haven't fetched them
 * before for this answer (the data can be considered static for the lifetime
 * of one page view/app session).
 */
export const fetchResponsesIfNeeded = answerId => (dispatch, getState) => (
  shouldFetchResponses(getState(), answerId) ? dispatch(fetchResponses(answerId)) : Promise.resolve()
);
