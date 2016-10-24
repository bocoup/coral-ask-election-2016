// import { createSelector } from 'reselect';
// import d3 from '../d3';

export const getSelected = state => state.selected;

export const getSummary = state => state.summary.payload;

export const getIsFetching = state => [
  'questions',
  'responses',
  'summary'
].reduce((isFetching, storeKey) => isFetching || state[storeKey].isFetching, false);
