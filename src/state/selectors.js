// Use createSelector for any reducer which returns a computed object
import { createSelector } from 'reselect';
import objectToList from '../utils/object-to-list';
import listToObject from '../utils/list-to-object';

export const getResponses = state => state.responses.dictionary;
export const getSelected = state => state.selected;
export const getAggregations = state => state.summary.aggregations;
export const getQuestions = state => state.questions.dictionary;
export const getFilterQuestions = state => state.questions.filters;
export const getContentFields = state => state.fields.data;

/**
 * This selector can be used to display a global fetching-state indicator,
 * such as an activity spinner.
 *
 * @param {Object} state The state
 * @returns {Boolean} Whether any AJAX request is in progress.
 */
export const getIsFetching = state => [
  'responses',
  'summary',
  'fields'
].reduce((isFetching, storeKey) => isFetching || state[storeKey].isFetching, false);

export const getQuestionsList = createSelector(getQuestions, objectToList);
export const getResponsesList = createSelector(getResponses, objectToList);
export const getContentFieldsData = createSelector(getContentFields, listToObject('field-id (don\'t change!)'));

export const getEmojiQuestion = createSelector(
  getQuestions,
  getFilterQuestions,
  (questions, filterQuestions) => questions && questions[filterQuestions.emoji]
);

export const getTopicQuestion = createSelector(
  getQuestions,
  getFilterQuestions,
  (questions, filterQuestions) => questions && questions[filterQuestions.topic]
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

/**
 * Return an array of emoji multiple-choice question objects with `.value` and
 * `.id` keys
 *
 * @param {Object} state The state object
 * @returns {Object[]} An array of `{ value, id }` objects
 */
export const getEmojiList = createSelector(
  getEmojiQuestion,
  emojiQuestion => (emojiQuestion && emojiQuestion.options) || []
);

/**
 * Return an array of topic (or focus area; "non-emoji") multiple-choice
 * question objects with `.value` and `.id` keys
 *
 * @param {Object} state The state object
 * @returns {Object[]} An array of `{ value, id }` objects
 */
export const getTopicList = createSelector(
  getTopicQuestion,
  topicQuestion => (topicQuestion && topicQuestion.options) || []
);

export const getSelectedEmoji = createSelector(
  getEmojiList,
  getSelected,
  (emojiList, selected) => emojiList.find(emoji => emoji.id === selected.emoji)
);

export const getSelectedTopic = createSelector(
  getTopicList,
  getSelected,
  (topicList, selected) => topicList.find(topic => topic.id === selected.topic)
);

/**
 * Return an array of emoji multiple-choice question objects with counts for
 * how often each emoji occurs in the response data
 *
 * @param {Object} state The state object
 * @returns {Object[]} An array of `{ value, id, count }` objects
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

/**
 * Return an array of topic multiple-choice question objects ("topic" is the
 * grouping question that isn't emoji) with counts for how often each emoji
 * occurs in the response data
 *
 * @param {Object} state The state object
 * @returns {Object[]} An array of `{ value, id, count }` objects
 */
export const getTopicCounts = createSelector(
  getTopicList,
  getAggregations,
  (topicList, aggregations) => topicList.map(option => Object.assign({
    count: aggregations[option.id].count
  }, option))
);
