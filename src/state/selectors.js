// Use createSelector for any reducer which returns a computed object
import { createSelector } from 'reselect';
import objectToList from '../utils/object-to-list';
import listToObject from '../utils/list-to-object';

export const getResponses = state => state.responses.dictionary;
export const getSelected = state => state.selected;
export const getAggregations = state => state.summary.aggregations;
export const getQuestions = state => state.questions.dictionary;
export const getContentFields = state => state.fields.data;

export const getIsFetching = state => [
  'questions',
  'responses',
  'summary',
  'fields'
].reduce((isFetching, storeKey) => isFetching || state[storeKey].isFetching, false);

export const getQuestionsList = createSelector(getQuestions, objectToList);
export const getResponsesList = createSelector(getResponses, objectToList);
export const getContentFieldsData = createSelector(getContentFields, listToObject('field-id (don\'t change!)'));

// This app makes an assumption only Emoji questions will be used to group_by
export const getEmojiQuestion = createSelector(
  getQuestionsList,
  questions => questions.find(question => question.group_by)
);

export const getMultipleChoiceQuestions = createSelector(
  getQuestions,
  getEmojiQuestion,
  (questions, emojiQuestion) => Object.keys(questions).reduce((mcQuestions, key) => {
    const question = questions[key];
    if (question.type !== 'MultipleChoice' || question.id === emojiQuestion.id) {
      return mcQuestions;
    }
    return Object.assign(mcQuestions, {
      [key]: question
    });
  }, {})
);

export const getMultipleChoiceCounts = createSelector(
  getMultipleChoiceQuestions,
  getSelected,
  getAggregations,
  (mcQuestions, selected, aggregations) => Object.keys(mcQuestions).reduce((carry, key) => {
    const question = mcQuestions[key];
    const optionsWithCounts = question.options.map((option) => {
      let optionCount = 0;

      if (selected.emoji) {
        optionCount = aggregations[selected.emoji][question.id][option.id];
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
    });
    return Object.assign(carry, {
      [key]: optionsWithCounts
    });
  }, {})
);

export const getMultipleChoiceCountsList = createSelector(getMultipleChoiceCounts, objectToList);

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
  (question, selected) => question && question.options.find(option => option.id === selected.emoji)
);

export const getSelectedTopic = createSelector(
  getMultipleChoiceQuestions,
  getSelected,
  (mcQuestions, selected) => {
    const questionIds = Object.keys(mcQuestions);
    for (let i = 0; i < questionIds.length; i += 1) {
      const question = mcQuestions[questionIds[i]];
      const match = question && question.options.find(option => option.id === selected.topic);
      if (match) {
        return match;
      }
    }
    return null;
  }
);
