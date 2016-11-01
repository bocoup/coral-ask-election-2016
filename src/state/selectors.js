// Use createSelector for any reducer which returns a computed object
import { createSelector } from 'reselect';
import intersection from 'lodash.intersection';
import listToObject from '../utils/list-to-object';
import safeDeepAccess from '../utils/safe-deep-access';

export const getResponses = state => state.responses.dictionary;
export const getResponseOrder = state => state.responses.order;
export const getSelected = state => state.selected;
export const getAggregations = state => state.summary.aggregations;
export const getQuestions = state => state.questions.dictionary;
export const getQuestionsOrder = state => state.questions.order;
export const getFilterQuestions = state => state.questions.filters;
export const getResponseCollections = state => state.responses.collections;
export const getSelectedResponses = state => state.responses.selected;
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

export const getQuestionsList = createSelector(
  getQuestions,
  getQuestionsOrder,
  (questions, order) => order.map(id => questions[id])
);

export const getResponsesList = createSelector(
  getResponses,
  getResponseOrder,
  (responses, order) => order.map(id => responses[id])
);

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

export const getSelectedTopicEmoji = createSelector(
  getEmojiList,
  getSelected,
  (emojiList, selected) => emojiList.find(emoji => emoji.id === selected.topicEmoji)
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

/**
 * Return an array of emoji multiple-choice question objects with counts for
 * how often each emoji occurs in the selected topic
 *
 * @param {Object} state The state object
 * @returns {Object[]} An array of `{ value, id, count }` objects
 */
export const getEmojiCountsFilteredByTopic = createSelector(
  getSelected,
  getFilterQuestions,
  getEmojiList,
  getAggregations,
  (selected, filterQuestions, emojiList, aggregations) => {
    const topicId = selected.topic;
    if (!topicId) {
      return null;
    }

    return emojiList.map((option) => {
      const count = safeDeepAccess(aggregations, [
        topicId,
        filterQuestions.emoji,
        option.id
      ]) || 0;

      return Object.assign({ count }, option);
    });
  }
);

export const getEmojiLetter = createSelector(
  getResponses,
  getSelected,
  getSelectedResponses,
  (responses, selected, selectedResponses) => {
    const emojiId = selected.emoji;
    if (!emojiId) {
      return null;
    }
    const letterId = selectedResponses[emojiId];
    return responses[letterId];
  }
);

// Unlike getEmojiLetter, which only returns one letter object, this method
// always returns an array of responses: either the collection
export const getTopicResponses = createSelector(
  getResponses,
  getSelected,
  getResponseCollections,
  (responses, selected, collections) => {
    const topicId = selected.topic;
    const emojiId = selected.topicEmoji;
    if (!topicId) {
      return null;
    }
    if (!emojiId) {
      return collections[topicId] && collections[topicId].map(id => responses[id]);
    }
    const overlap = intersection(collections[topicId], collections[emojiId]);
    return overlap.map(id => responses[id]);
  }
);
