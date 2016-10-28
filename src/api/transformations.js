import uuid from 'node-uuid';

/**
 * Convert a full nested aggregations object into a simpler subset that
 * can be more easily queried for specific results, by removing intermediate
 * keys.
 *
 * The resulting format is
 *
 * [Grouping Q Answer ID][ID of non-grouping MC Q][Answer ID from that MC Q]: count
 *
 * Original JSON:
 *
 *     "aggregations": {
 *       "9f27d5a6ed65c4938ede65e536e5f6d4": {
 *         "mc": {
 *           "c873a345-185c-cdb1-aeeb-32b04cf4fc9a": {
 *             "question": "Which issue should be highest on the new presidentâ€™s agenda?",
 *             "answers": {
 *               "b1cc14fffa31a73de64ba82e99ecfbe6": {
 *                 "answer": "Social Issues",
 *                 "count": 2
 *
 * Revised JSON:
 *
 *     "aggregations": {
 *       [groupKey]
 *       "9f27d5a6ed65c4938ede65e536e5f6d4": {
 *         [mcQId]
 *         "c873a345-185c-cdb1-aeeb-32b04cf4fc9a": {
 *           [answerId]
 *           "b1cc14fffa31a73de64ba82e99ecfbe6": 2
 *
 * @param {Object} aggregations The aggregations property of the root JSON file
 * @returns {Object} A simplified aggregations object
 */
export const simplifyAggregations = aggregations => Object.keys(aggregations)
  .reduce((carry, groupKey) => {
    const group = aggregations[groupKey];

    if (groupKey === 'all') {
      // The "all" key is omitted from these results; only the count is
      // exposed on the store, and that assignment is done directly in the
      // API response processing chain.
      return carry;
    }

    // Create a new object with the key "count", and with a string key for
    // each non-grouping multiple choice question ID
    return Object.assign(carry, {
      // Keyed by Answer ID for the Grouping Question
      [groupKey]: Object.keys(group.MultipleChoice)
        .reduce((carry, mcQId) => Object.assign(carry, {
          // Keyed by Non-Grouping Multiple Choice Question Id
          [mcQId]: Object.keys(group.MultipleChoice[mcQId].answers)
            .reduce((carry, answerId) => Object.assign(carry, {
              // Keyed by Answer ID for that Multiple Choice Question
              [answerId]: group.MultipleChoice[mcQId].answers[answerId].count
            }), {})
        }), {
          count: group.count
        })
    });
  }, {});

export const applyArbitraryIds = submissions => submissions.map(s => Object.assign({}, s, {
  id: uuid.v1()
}));
