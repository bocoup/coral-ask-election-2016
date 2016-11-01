import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import uniq from 'lodash.uniq';

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
  data: null,
  isFetching: false
});

export const selected = handleActions({
  // Top emoji bubble chart
  SELECT_EMOJI: (state, action) => Object.assign({}, state, {
    emoji: action.payload
  }),

  // Topic bar graph below bubble chart
  SELECT_TOPIC: (state, action) => Object.assign({}, state, {
    topic: action.payload,
    topicEmoji: null
  }),

  // Nested bar graph of emoji activated by topic bar graph
  SELECT_TOPIC_EMOJI: (state, action) => Object.assign({}, state, {
    topicEmoji: action.payload
  })
}, {
  emoji: null,
  topic: null,
  topicEmoji: null
});

const toDictionaryById = submissions => submissions
  .reduce((dict, s) => Object.assign(dict, {
    [s.id]: s
  }), {});

const getResponseIsFetchingObject = questions => Object.keys(questions)
  .reduce((isFetching, qId) => {
    const question = questions[qId];
    if (!question.group_by || question.type !== 'MultipleChoice') {
      return isFetching;
    }

    // Add keys to the dictionary for all group_by question answerIds
    return question.options.reduce((dict, option) => Object.assign(dict, {
      [option.id]: false
    }), isFetching);
  }, {});

export const responses = handleActions({
  REQUEST_RESPONSES: (state, action) => Object.assign({}, state, {
    isFetching: Object.assign({}, state.isFetching, {
      [action.payload]: true
    })
  }),

  RECEIVE_RESPONSES: (state, action) => {
    const { submissions } = action.payload;
    const order = submissions.map(s => s.id);
    const dictionary = toDictionaryById(submissions);
    return Object.assign({}, state, {
      order: uniq(state.order.concat(order)),
      dictionary: Object.assign({}, state.dictionary, dictionary),
      collections: Object.assign({}, state.collections, {
        [action.payload.answerId]: order
      }),
      selected: Object.assign({}, state.selected, {
        // Always start w/ the first response
        [action.payload.answerId]: order[0]
      }),
      isFetching: Object.assign({}, state.isFetching, {
        [action.payload.answerId]: false
      })
    });
  },

  // Does not currently impact the isFetching state
  RECEIVE_FORM_DIGEST: (state, action) => {
    const { submissions, questions } = action.payload;
    const order = submissions.map(s => s.id);
    const dictionary = toDictionaryById(submissions);
    const isFetching = getResponseIsFetchingObject(questions);
    return Object.assign({}, state, {
      dictionary: Object.assign({}, state.dictionary, dictionary),
      order,
      isFetching
    });
  },

  SHOW_NEXT_LETTER: (state, action) => {
    const answerId = action.payload;
    const letterId = state.selected[answerId];
    const collection = state.collections[answerId];
    const letterIdx = collection.indexOf(letterId);
    // Wrap around to 0 when done with a collection
    const nextLetterId = collection[letterIdx + 1] || collection[0];
    return Object.assign({}, state, {
      selected: Object.assign({}, state.selected, {
        [answerId]: nextLetterId
      })
    });
  }
}, {
  // Array of unique, ordered response IDs for _all_ responses
  order: [],
  // Dictionary of responses, keyed by response ID
  dictionary: {},
  // Dictionary of the answer IDs for which responses have been returned,
  // containing arrays of unique, ordered response IDs for responses that
  // match that answer ID
  collections: {},
  // Dictionary of the active (most recently displayed) ID within each
  // answer-specific collection
  selected: {},
  // Dictionary of response collections of isFetching booleans for each
  // question response collection, keyed by the same answer IDs
  isFetching: null
});

export default combineReducers({
  summary,
  fields,
  selected,
  questions,
  responses
});
