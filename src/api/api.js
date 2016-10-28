import fetch from 'isomorphic-fetch';
import Tabletop from 'tabletop';
import log from '../utils/log';
import { simplifyAggregations } from './transformations';
import config from '../config';

const publicRoot = process.env.PUBLIC_URL;

export function getSummary() {
  return fetch(`${publicRoot}/data/mock-data.json`)
    .then(response => response.json())
    .then(response => ({
      aggregations: simplifyAggregations(response.aggregations),
      submissions: response.submissions
    }));
}

export function getQuestions() {
  return fetch(`${publicRoot}/data/questions.json`)
    .then(response => response.json())
    .then(response => response.questions)
    .then(log);
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
