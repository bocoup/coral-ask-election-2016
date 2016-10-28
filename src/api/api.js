import fetch from 'isomorphic-fetch';
import Tabletop from 'tabletop';
import { simplifyAggregations } from './transformations';
import config from '../config';

// Ensure trailing slash on the jsonURI
const jsonLocation = config.jsonURI.replace(/\/*$/, '/');
const digestFile = `${jsonLocation}form-${config.formId}-aggregation-digest.json`;

export function getAggregations() {
  return fetch(digestFile)
    .then(response => response.json())
    .then(response => ({
      questions: response.questions,
      count: response.aggregations.all.count,
      aggregations: simplifyAggregations(response.aggregations),
      submissions: response.submissions
    }));
}

/**
 * Retrieve content from a Google Sheets Spreadsheet, which we use as as a
 * lightweight CMS for content we can't get from Ask's JSON export
 *
 * @returns {Promise} A promise to a Tabletop sheets response object
 */
export function getContent() {
  return new Promise((resolve) => {
    Tabletop.init({
      key: config.googleSheetId,
      callback: (data, tb) => {
        // extract fields, and only pass those.
        resolve(tb.sheets('Fields').all());
      },
      simpleSheet: true
    });
  });
}
