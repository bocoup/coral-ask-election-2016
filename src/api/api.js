import fetch from 'isomorphic-fetch';
import Tabletop from 'tabletop';
import { simplifyAggregations } from './transformations';
import getConfig from '../config';

let jsonLocation;
// Helper method
const jsonAddress = fileName => `${jsonLocation}${fileName}`;

// Ensure trailing slash on the jsonURI (depends on config load)
getConfig.then(config => (jsonLocation = config.jsonURI.replace(/\/*$/, '/')));

/**
 * Retrieve the form digest JSON, containing data aggregations, recent
 * form submissions and a dictionary of form questions
 *
 * @returns {Promise} A promise to the JSON data
 */
export function getAggregations() {
  // All API calls depend on config availability: this delay should be minimal
  return getConfig.then((config) => {
    const fileName = `form-${config.formId}-aggregation-digest.json`;
    return fetch(jsonAddress(fileName))
      .then(response => response.json())
      .then(response => ({
        questions: response.questions,
        count: response.aggregations.all.count,
        aggregations: simplifyAggregations(response.aggregations),
        submissions: response.submissions
      }));
  });
}

/**
 * Retrieve a JSON array of responses matching the provided answer
 *
 * @param {answerId} questionId An answer ID for a group_by question
 * @returns {Promise} A promise to the JSON data
 */
export function getResponses(answerId) {
  return getConfig.then((config) => {
    const fileName = `form-${config.formId}-group-${answerId}-submissions.json`;
    return fetch(jsonAddress(fileName))
      .then(response => response.json());
  });
}

/**
 * Retrieve content from a Google Sheets Spreadsheet, which we use as as a
 * lightweight CMS for content we can't get from Ask's JSON export
 *
 * @returns {Promise} A promise to a Tabletop sheets response object
 */
export function getContent() {
  return getConfig.then(config => new Promise((resolve) => {
    Tabletop.init({
      key: config.googleSheetId,
      callback: (data, tb) => {
        // extract fields, and only pass those.
        resolve(tb.sheets('Fields').all());
      },
      simpleSheet: true
    });
  }));
}
