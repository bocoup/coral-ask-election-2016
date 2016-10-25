// Use createSelector for any reducer which returns a computed object
import { createSelector } from 'reselect';

import objectToList from '../utils/object-to-list';

export const getResponses = state => state.responses.dictionary;
export const getSelected = state => state.selected;
export const getAggregations = state => state.summary.aggregations;
export const getQuestions = state => state.questions.dictionary;

export const getIsFetching = state => [
  'questions',
  'responses',
  'summary'
].reduce((isFetching, storeKey) => isFetching || state[storeKey].isFetching, false);

export const getQuestionsList = createSelector(getQuestions, objectToList);

export const getResponsesList = createSelector(getResponses, objectToList);

// This app makes an assumption only Emoji questions will be used to group_by
export const getEmojiQuestion = createSelector(
  getQuestionsList,
  questions => questions.find(question => question.group_by)
);

export const getMultipleChoiceQuestions = createSelector(
  getQuestionsList,
  getEmojiQuestion,
  (questionsList, emojiQuestion) => questionsList
    .filter(question => question.type === 'MultipleChoice' && question.id !== emojiQuestion.id)
);

export const getMultipleChoiceCounts = createSelector(
  getMultipleChoiceQuestions,
  getSelected,
  getAggregations,
  (mcQuestions, selectedEmojiId, aggregations) => mcQuestions
    .map(question => question.options.map((option) => {
      let optionCount = 0;

      if (selectedEmojiId) {
        optionCount = aggregations[selectedEmojiId][question.id][option.id];
      } else if (aggregations) {
        optionCount = Object.keys(aggregations)
          .reduce((count, groupKey) => {
            if (aggregations[groupKey][question.id][option.id]) {
              return count + aggregations[groupKey][question.id][option.id];
            }
            return count;
          }, 0);
      }

      return Object.assign({
        count: optionCount
      }, option);
    }))
);

/**
 * Return an array of emoji multiple-choice answer objects with `.answer` and
 * `.id` keys
 *
 * @param {Object} state The state object
 * @returns {Object[]} An array of `{ answer, id }` objects
 */
export const getEmojiList = createSelector(
  getEmojiQuestion,
  emojiQuestion => (emojiQuestion && emojiQuestion.options) || []
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
  (emojiList, aggregations) => {
    if (!aggregations) {
      return [];
    }
    return emojiList.map(emoji => Object.assign({
      count: aggregations[emoji.id].count
    }, emoji));
  }
);

export const getSelectedEmoji = createSelector(
  getEmojiQuestion,
  getSelected,
  (question, selectedEmojiId) => question && question.options.find(option => option.id === selectedEmojiId)
);
