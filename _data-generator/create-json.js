const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');
const UUID = require('uuid-lib');
const uuid = () => UUID.raw();
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
const outputPath = path.join(__dirname, 'mock-data.json');

const csvText = fs.readFileSync(dataPath).toString();

const questions = require('./questions');
const groupby_id = Object.keys(questions).find(key => questions[key].group_by);

const questionById = guid => questions[guid];

const convertKeysToQuestionIds = obj => Object.keys(questions)
  .reduce((objKeyedByQId, key) => Object.assign({
    [questions[key].question_id]: obj[key]
  }, objKeyedByQId), {
    response_id: uuid()
  });

const optionByAnswer = (question, answer) => {
  if (!question.options) {
    return;
  }
  return question.options.find(option => option.answer === answer);
};

const parseComplete = new Promise((resolve, reject) => {
  parse(csvText, {}, (err, output) => {
    if (err) {
      return reject(err);
    }
    resolve(output);
  });
});

const convertToObjects = arr => {
  let keys;
  return arr.reduce((carry, row, idx) => {
    if (idx === 0) {
      keys = row;
      // console.log(carry, keys);
      return carry;
    }
    return carry.concat(row.reduce((rowObj, cellValue, rowIdx) => {
      rowObj[keys[rowIdx]] = cellValue;
      return rowObj;
    }, {}));
  }, []);
};

const generateAggregations = arr => {
  const groupingQuestion = questionById(groupby_id);

  const aggregations = groupingQuestion.options.reduce((carry, option) => {
    const aggForAnswer = arr.reduce((agg, row) => {
      if (option.answer !== row[groupby_id]) {
        return agg;
      }
      Object.keys(questions).forEach(key => {
        const question = questions[key];
        const question_id = question.question_id;
        if (question_id === groupby_id || !question.options) {
          return;
        };
        agg.mc[question_id] = agg.mc[question_id] || {};
        const answer = optionByAnswer(question, row[question_id]);
        if ( ! answer ) {
          console.log( `Could not find option for answer ${row[question_id]}` );
          return;
        }
        const answer_id = answer.answer_id;
        agg.mc[question_id][answer_id] = agg.mc[question_id][answer_id] || {
          answer: row[question_id],
          count: 0
        };
        agg.mc[question_id][answer_id].count = agg.mc[question_id][answer_id].count + 1;
      });
      agg.count = agg.count + 1;
      return agg;
    }, {
      count: 0,
      mc: {}
    });

    return Object.assign({
      [option.answer_id]: aggForAnswer
    }, carry);
  }, {});
  return {
    groupby: [groupby_id],
    aggregations,
    latest: arr
  };
};

parseComplete
  .then(convertToObjects)
  .then(arr => arr.map(convertKeysToQuestionIds))
  .then(logDeep)
  .then(generateAggregations)
  .then(logDeep)
  .then(output => fs.writeFileSync(outputPath, JSON.stringify(output)))
  // .then(output => console.log(output))
  .catch(e => console.error(e));
