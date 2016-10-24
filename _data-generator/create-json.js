const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');
const UUID = require('uuid-lib');
const uuid = () => UUID.raw();
const GUID = require('guid');
const guid = () => GUID.raw();
const inspect = require('util').inspect;

const log = obj => {
  console.log(obj);
  return obj;
};

const logDeep = obj => {
  console.log(inspect(obj, {
    depth: null
  }));
  return obj;
};

const dataPath = path.join(__dirname, 'sample-data.csv');
const outputPath = path.join(__dirname, '../public/data/mock-data.json');

const csvText = fs.readFileSync(dataPath).toString();

const questions = require('./questions');
const questionIds = require('./question-guids');
const groupby_id = Object.keys(questions).find(key => questions[key].group_by);

const nonGroupingMCQuestions = Object.keys(questions)
  .filter(key => questions[key].type === 'MultipleChoice' && questions[key].id !== groupby_id);

const questionById = guid => questions[guid];

const convertKeysToQuestionIds = obj => Object.keys(obj)
  .reduce((objKeyedByQId, key) => {
    const qId = questionIds[key];
    if (!qId) {
      return objKeyedByQId;
    }
    return Object.assign({
      [questionIds[key]]: obj[key]
    }, objKeyedByQId);
  }, {
    id: guid()
  });

const getAnswerObj = (questionId, answer) => {
  const question = questions[questionId];
  if (!question.options) {
    return;
  }
  const selectedOption = question.options.find(option => option.answer === answer);
  return selectedOption;
};

const getAnswerId = (question, answer) => {
  const selectedOption = getAnswerObj(question, answer);
  return selectedOption && selectedOption.id;
};

const convertToObjects = arr => {
  let keys;
  return arr.reduce((carry, row, idx) => {
    if (idx === 0) {
      keys = row;
      return carry;
    }
    return carry.concat(row.reduce((rowObj, cellValue, rowIdx) => {
      rowObj[keys[rowIdx]] = cellValue;
      return rowObj;
    }, {}));
  }, []);
};

const aggregate = arr => {
  // const groupingQuestion = questionById(groupby_id);

  const aggregations = arr.reduce((carry, submission) => {
    const answer = submission[groupby_id];
    const answerId = getAnswerId(groupby_id, answer);

    if (!answerId) {
      throw new Error(`Invalid answer receieved! ${answer}`);
    }

    // Ensure grouping is present
    carry[answerId] = carry[answerId] || {
      mc: {},
      count: 0
    };

    // Increment overall count
    carry[answerId].count++;

    nonGroupingMCQuestions.forEach(mcQuestionId => {
      const mcQuestion = questions[mcQuestionId];
      const mcQAnswerObj = getAnswerObj(mcQuestionId, submission[mcQuestionId]);
      if (!mcQAnswerObj) {
        throw new Error(`Unrecognized response: ${submission[mcQuestionId]}`);
      }
      const mcQAnswerId = mcQAnswerObj.id;
      console.log(mcQAnswerObj, mcQAnswerId);

      // Ensure answer key is present
      carry[answerId].mc[mcQuestionId] = carry[answerId].mc[mcQuestionId] || {
        question: mcQuestion.title,
        answers: {}
      };

      // Ensure the key on the answers list for the selected answer is present
      carry[answerId].mc[mcQuestionId].answers[mcQAnswerId] = carry[answerId].mc[mcQuestionId].answers[mcQAnswerId] || {
        answer: mcQAnswerObj.answer,
        count: 0
      };

      // Increment count for this question
      carry[answerId].mc[mcQuestionId].answers[mcQAnswerId].count++;
    });

    return carry;
  }, {});

  return {
    aggregations,
    submissions: arr.reverse()
  };
};

const parseComplete = new Promise((resolve, reject) => {
  parse(csvText, {}, (err, output) => {
    if (err) {
      return reject(err);
    }
    resolve(output);
  });
});

parseComplete
  .then(convertToObjects)
  .then(arr => arr.map(convertKeysToQuestionIds))
  .then(aggregate)
  .then(logDeep)
  .then(output => fs.writeFileSync(outputPath, JSON.stringify(output)))
  .then(() => console.log(`\nWrote ${outputPath}`))
  .catch(e => console.error(e));
