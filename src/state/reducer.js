import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

/**
 * Summary reducer
 */
export const summary = handleActions({
  REQUEST_FORM_DIGEST: state => ({
    count: state.count,
    aggregations: state.aggregations,
    isFetching: true
  }),

  RECEIVE_FORM_DIGEST: (state, action) => ({
    count: action.payload.count,
    aggregations: action.payload.aggregations,
    isFetching: false
  })
}, {
  count: 0,
  aggregations: null,
  isFetching: false
});

export const questions = handleActions({
  /**
   * Populate the questions dictionary, and compute & store a few useful
   * auxiliary pieces of information in sibling keys. The questions come
   * back in the same action as the form digest aggregations data and the
   * list of 10 latest submissions.
   *
   * - `store.questions.order` is an ordered array of Question IDs, in the order
   *    that they occur in the Ask form.
   * - `store.questions.filters` is an object with `.emoji` and `.topic` keys,
   *    designating the IDs of the questions to use for the Emoji visualizations
   *    and Topic visualizations, respectively.
   * - `store.questions.dictionary` is a dictionary of question objects, keyed
   *    by Question ID.
   *
   * Questions can only be retrieved as a part of the form digest packet, and it
   * is generally assumed that this reducer will only be run once; for that reason
   * no `isFetching` key is used here.
   *
   * @param {Object} state  The previous state object; this is thrown away entirely
   * @param {Object} action The RECEIVE_FORM_DIGEST Redux action
   * @returns {Object} The new state object
   */
  RECEIVE_FORM_DIGEST: (state, action) => {
    const questions = action.payload.questions;
    const order = Object.keys(questions).sort((a, b) => questions[a].order - questions[b].order);

    const isGroupingQuestion = question => question.group_by && question.type === 'MultipleChoice';

    // Emoji question is assumed to be the first grouping multiple choice
    // question with only short text responses
    const emojiQuestionId = order.find((qId) => {
      const question = questions[qId];

      if (!isGroupingQuestion(question)) {
        return false;
      }

      // Check to see if this question's answers are all short (therefore likely to be emoji);
      // No undef check is needed on question.options because all MC ?'s have .options
      return question.options
        .reduce((noLongResponses, option) => noLongResponses && option.value.length <= 4, true);
    });

    // Topic grouping question is first non-emoji multiple-choice question
    const topicQuestionId = order.find((qId) => {
      if (qId === emojiQuestionId) {
        return false;
      }

      const question = questions[qId];

      return isGroupingQuestion(question);
    });

    return {
      dictionary: questions,
      filters: {
        emoji: emojiQuestionId,
        topic: topicQuestionId
      },
      order
    };
  }
}, {
  dictionary: {},
  filters: {
    emoji: null,
    topic: null
  },
  order: []
});

/**
 * Google spreadsheet fields
 */
export const fields = handleActions({
  REQUEST_FIELDS: state => Object.assign({}, state, {
    isFetching: true
  }),

  RECEIVE_FIELDS: (state, action) => ({
    data: action.payload,
    isFetching: false
  })
}, {
  data: {},
  isFetching: false
});

export const selected = handleActions({
  SELECT_EMOJI: (state, action) => {
    if (state.emoji === action.payload) {
      return Object.assign({}, state, {
        emoji: null
      });
    }
    return Object.assign({}, state, {
      emoji: action.payload
    });
  },

  SELECT_TOPIC: (state, action) => {
    if (state.topic === action.payload) {
      return Object.assign({}, state, {
        topic: null
      });
    }
    return Object.assign({}, state, {
      topic: action.payload
    });
  }
}, {
  emoji: null,
  topic: null
});

export const responses = handleActions({
  // Not yet called
  REQUEST_RESPONSES: state => Object.assign({}, state, {
    isFetching: true
  }),

  // Does not currently impact the isFetching state
  RECEIVE_FORM_DIGEST: (state, action) => ({
    dictionary: action.payload.submissions
      .reduce((carry, response) => Object.assign({}, carry, {
        [response.id]: response
      }), state.dictionary),
    isFetching: state.isFetching
  })
}, {
  dictionary: {},
  isFetching: false
});

export default combineReducers({
  summary,
  fields,
  selected,
  questions,
  responses
});
