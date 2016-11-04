// Use createSelector for any reducer which returns a computed object
import { createSelector } from 'reselect';
import listToObject from '../utils/list-to-object';
import safeDeepAccess from '../utils/safe-deep-access';

import { combineIds } from '../utils/id-list';

const getCount = (aggregations, key) => (aggregations[key] ? aggregations[key].count : 0);

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
 * @returns {Boolean} Whether any AJAX request is in progress.
 */
export const getIsFetching = state => [
  'responses',
  'summary',
  'fields'
].reduce((isFetching, storeKey) => isFetching || state[storeKey].isFetching, false);

/**
 * Get the list of question objects, ordered as they occur within the Ask form
 *
 * @returns {Object[]} Array of question objects
 */
export const getQuestionsList = createSelector(
  getQuestions,
  getQuestionsOrder,
  (questions, order) => order.map(id => questions[id])
);

/**
 * Get the available question responses as an ordered array of question objects
 * (ordered by the order in which the user clicks on answer filters, then recency)
 *
 * @returns {Object[]} Array of question objects
 */
export const getResponsesList = createSelector(
  getResponses,
  getResponseOrder,
  (responses, order) => order.map(id => responses[id])
);

// Parse out the content fields from the content fields data store
export const getContentFieldsData = createSelector(getContentFields, listToObject('field-id (don\'t change!)'));

/**
 * Get the question object representing the emoji filter question
 *
 * @returns {Object} The question object for the emoji question
 */
export const getEmojiQuestion = createSelector(
  getQuestions,
  getFilterQuestions,
  (questions, filterQuestions) => questions && questions[filterQuestions.emoji]
);

/**
 * Get the question object representing the topic filter question
 *
 * @returns {Object} The question object for the topic question
 */
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

/**
 * Get the currently selected emoji answer object
 *
 * @returns {Object} An answer option object from the emoji question
 */
export const getSelectedEmoji = createSelector(
  getEmojiList,
  getSelected,
  (emojiList, selected) => emojiList.find(emoji => emoji.id === selected.emoji)
);

/**
 * Get the currently selected topic answer object
 *
 * @returns {Object} An answer option object from the topic question
 */
export const getSelectedTopic = createSelector(
  getTopicList,
  getSelected,
  (topicList, selected) => topicList.find(topic => topic.id === selected.topic)
);

/**
 * Get the currently selected topic emoji answer object (the second-dimension
 * filter in bottom topic section)
 *
 * @returns {Object} An answer option object from the topic emoji question
 */
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
  (emojiList, aggregations) => emojiList
    .map(emoji => Object.assign({
      count: getCount(aggregations, emoji.id)
    }, emoji))
    .filter(emoji => emoji.count)
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
  (topicList, aggregations) => topicList
    .map(option => Object.assign({
      count: getCount(aggregations, option.id)
    }, option))
    .sort((a, b) => b.count - a.count)
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

/**
 * Get the letter to display in the Topic filter section
 *
 * @returns {Object} A response letter object
 */
export const getEmojiLetter = createSelector(
  getResponses,
  getSelected,
  getSelectedResponses,
  (responses, selected, selectedResponses) => {
    const emojiId = selected.emoji;
    if (!emojiId) {
      return null;
    }
    return responses[selectedResponses[emojiId]];
  }
);

/**
 * Returns the number of available letters for the current Emoji section filters
 * (does not apply when no emoji is selected; use available response list count
 * in that instance)
 *
 * @returns {Number} An integer count of available responses
 */
export const getEmojiLetterCount = createSelector(
  getAggregations,
  getSelected,
  (aggregations, selected) => {
    const emojiId = selected.emoji;
    if (!emojiId) {
      return 0;
    }
    return aggregations[emojiId] ? aggregations[emojiId].count : 0;
  }
);

/**
 * Get the letter to display in the Topic section
 *
 * @returns {Object} A response letter object
 */
export const getTopicLetter = createSelector(
  getResponses,
  getSelected,
  getSelectedResponses,
  (responses, selected, selectedResponses) => {
    const topicId = selected.topic;
    const emojiId = selected.topicEmoji;
    if (!topicId) {
      return null;
    }
    if (!emojiId) {
      return responses[selectedResponses[topicId]];
    }
    return responses[selectedResponses[combineIds(topicId, emojiId)]];
  }
);

/**
 * Returns the number of available letters for the current Topic section filters
 *
 * @returns {Number} An integer count of available responses
 */
export const getTopicLetterCount = createSelector(
  getAggregations,
  getFilterQuestions,
  getSelected,
  (aggregations, filterQuestions, selected) => {
    const topicId = selected.topic;
    const emojiId = selected.topicEmoji;
    if (!topicId || !aggregations[topicId]) {
      return 0;
    }
    if (!emojiId) {
      return aggregations[topicId].count || 0;
    }
    return safeDeepAccess(aggregations, [
      topicId,
      filterQuestions.emoji,
      emojiId
    ]) || 0;
  }
);
