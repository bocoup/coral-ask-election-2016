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

let questions = {
  emoji: {
    question_id: uuid(),
    order: 0,
    question: 'How do you feel as the new President prepares to take office?',
    type: 'mc',
    options: []
  },
  issue: {
    question_id: uuid(),
    order: 1,
    question: 'Which issue should be highest on the new president’s agenda?',
    type: 'mc',
    options: []
  },
  message: {
    question_id: uuid(),
    order: 2,
    question: 'If the new president achieves one thing in the next four years, what should it be?',
    type: 'text'
  },
  name: {
    question_id: uuid(),
    order: 3,
    question: 'Please provide your name for display',
    type: 'text'
  },
  location: {
    question_id: uuid(),
    order: 3,
    question: 'Please provide your location for display',
    type: 'text'
  }
};
const groupby_id = questions.emoji.question_id;

const questionById = uuid => {
  const key = Object.keys(questions)
    .find(key => questions[key].question_id === uuid);
  return key && questions[key];
};

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

const populateQuestionsOptions = arr => {
  arr.forEach(row => {
    Object.keys(questions).forEach(key => {
      if (!questions[key].options) {
        return;
      }
      if (!questions[key].options.includes(row[key])) {
        questions[key].options.push(row[key]);
      }
    });
  });
  Object.keys(questions).forEach(key => {
    if (!questions[key].options) {
      return;
    }
    questions[key].options = questions[key].options.map(answer => ({
      answer: answer,
      answer_id: uuid()
    }));
    // console.log( questions[key].options );
  });
  return arr;
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
  .then(populateQuestionsOptions)
  .then(arr => arr.map(convertKeysToQuestionIds))
  .then(generateAggregations)
  .then(logDeep)
  .then(output => fs.writeFileSync(outputPath, JSON.stringify(output)))
  // .then(output => console.log(output))
  .catch(e => console.error(e));
