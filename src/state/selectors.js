// import { createSelector } from 'reselect';
// import d3 from '../d3';

export const getSelected = state => state.selected;

export const getAggregations = state => state.summary.aggregations;

export const getIsFetching = state => [
  'questions',
  'responses',
  'summary'
].reduce((isFetching, storeKey) => isFetching || state[storeKey].isFetching, false);

export const getQuestions = state => state.questions.dictionary;

export const getQuestionsAsList = (state) => {
  const questions = getQuestions(state);
  return questions ?
    Object.keys(questions).map(qId => questions[qId]) :
    [];
};

/**
 * Return an array of emoji multiple-choice answer objects with `.answer` and
 * `.id` keys
 *
 * @param {Object} state The state object
 * @returns {Object[]} An array of `{ answer, id }` objects
 */
export const getEmojiList = (state) => {
  const questions = getQuestionsAsList(state);
  const emojiQuestion = questions.find(question => question.group_by);
  return emojiQuestion ?
    emojiQuestion.options :
    [];
};

export const getEmojiCounts = (state) => {
  const aggregations = getAggregations(state);
  return getEmojiList(state).forEach(emoji => Object.assign({
    count: aggregations[emoji.id].count
  }, emoji));
};

export const getResponses = (state, props) => {
  const responses = Object.keys(state.responses.dictionary)
    .map(key => state.responses.dictionary[key]);

  if (props) {
    return responses.filter(response => Object.keys(props)
        .reduce((isMatch, key) => isMatch || props[key] === response[key], false));
  }

  return responses;
};
