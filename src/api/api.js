import fetch from 'isomorphic-fetch';
import log from '../utils/log';
// import keyedToArray from './transformations';

const publicRoot = process.env.PUBLIC_URL;

const questions = {};

const flattenQuestion = obj => Object.keys(obj).map((key) => {
  questions[key] = Object.keys(questions);
  return {
    question: obj[key].question,
    answers: Object.keys(obj[key].answers).map(answerKey => obj[key].answers[answerKey])
  };
});

export function getSummary() {
  // return fetch(`${publicRoot}/data/mock-data.json`)
  //   .then(response => response.json())
  //   .then(function keyedToArray(arr) {
  //     console.log(arr);
  //     let all;
  //     const emojiGroups = Object.keys(arr.aggregations)
  //       // .reduce((memo, key) => {
  //       //   const q = arr.aggregations[key];
  //       // })
  //       // These two .map statements could be combined
  //       .map(key => arr.aggregations[key])
  //       .map(question => ({
  //         count: question.count,
  //         group: question.group.answer,
  //         mc: flattenQuestion(question.mc),
  //         text: flattenQuestion(question.text)
  //       }))
  //       .filter((question) => {
  //         if (question.group !== 'all') {
  //           return true;
  //         }
  //         all = question;
  //         return false;
  //       });
  //     console.log(emojiGroups);
  //     return {
  //       emojiGroups,
  //       all
  //     };
  //   });
  return fetch(`${publicRoot}/data/mock-data.json`)
    .then(response => response.json())
    .then(log)
    .then((response) => {
      let all;
      const emoji = Object.keys(response.aggregations)
        .reduce((carry, key) => {
          const question = response.aggregations[key];
          const simpleQuestion = {
            count: question.count,
            emoji: question.group.answer,
            mc: flattenQuestion(question.mc),
            text: flattenQuestion(question.text)
          };
          if (question.group.answer === 'all') {
            all = simpleQuestion;
            return carry;
          }
          return carry.concat(simpleQuestion);
        }, []);
      return {
        emoji,
        all
      };
    });
}
