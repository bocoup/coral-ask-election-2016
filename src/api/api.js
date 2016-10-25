import fetch from 'isomorphic-fetch';
import log from '../utils/log';
import { simplifyAggregations } from './transformations';

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
