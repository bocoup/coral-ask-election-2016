// Use createSelector for any reducer which returns a computed object
import { createSelector } from 'reselect';

export const getResponses = state => state.responses.dictionary;
export const getSelected = state => state.selected;
export const getAggregations = state => state.summary.aggregations;
export const getQuestions = state => state.questions.dictionary;

export const getIsFetching = state => [
  'questions',
  'responses',
  'summary'
].reduce((isFetching, storeKey) => isFetching || state[storeKey].isFetching, false);

export const getQuestionsList = createSelector(
  getQuestions,
  (questions) => {
    if (questions) {
      return Object.keys(questions).map(qId => questions[qId]);
    }
    return [];
  }
);

/**
 * Return an array of emoji multiple-choice answer objects with `.answer` and
 * `.id` keys
 *
 * @param {Object} state The state object
 * @returns {Object[]} An array of `{ answer, id }` objects
 */
export const getEmojiList = createSelector(
  getQuestionsList,
  (questions) => {
    const emojiQuestion = questions.find(question => question.group_by);
    return emojiQuestion ?
      emojiQuestion.options :
      [];
  }
);

/**
 * Return an array of emoji multiple-choice answer objects with counts for
 * how often each emoji occurs in the response data
 *
 * @param {Object} state The state object
 * @returns {Object[]} An array of `{ answer, id, count }` objects
 */
export const getEmojiCounts = createSelector(
  getEmojiList,
  getAggregations,
  (emojiList, aggregations) => emojiList.map(emoji => Object.assign({
    count: aggregations[emoji.id].count
  }, emoji))
);

export const getResponsesList = (state, props) => {
  const responses = Object.keys(state.responses.dictionary)
    .map(key => state.responses.dictionary[key]);

  if (props) {
    return responses.filter(response => Object.keys(props)
      .reduce((isMatch, key) => isMatch || props[key] === response[key], false));
  }

  return responses;
};
