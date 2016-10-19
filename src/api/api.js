import fetch from 'isomorphic-fetch';

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
    .then((arr) => {
      // const simplifyObj = question => ({
      //   count: question.count,
      //   group: question.group.answer,
      //   mc: flattenQuestion(question.mc),
      //   text: flattenQuestion(question.text)
      // });

      // const tmp = Object.keys(arr.aggregations).reduce((carry, key) => {
      //   const question = arr.aggregations[key];
      //   if (question.group.answer === 'all') {
      //     carry.all = {
      //       count: question.count,
      //       questions: [].concat(questions.mc.map(q => Object.keys(q)))
      //     };
      //     // console.log(question);
      //     return carry;
      //   }
      //   const simpleQuestion = simplifyObj(question);
      //   const emoji = simpleQuestion.group;
      //   carry.emoji[emoji] = simpleQuestion;
      //   return carry;
      // }, {
      //   emoji: {}
      // });
      // console.log(tmp);

      let all;
      const emojiGroups = Object.keys(arr.aggregations)
        // .reduce((memo, key) => {
        //   const q = arr.aggregations[key];
        // })
        // These two .map statements could be combined
        .map(key => arr.aggregations[key])
        .map(question => ({
          count: question.count,
          group: question.group.answer,
          mc: flattenQuestion(question.mc),
          text: flattenQuestion(question.text)
        }))
        .filter((question) => {
          if (question.group !== 'all') {
            return true;
          }
          all = question;
          return false;
        });
      // console.log(emojiGroups);
      return {
        emojiGroups,
        all
      };
    });
}
