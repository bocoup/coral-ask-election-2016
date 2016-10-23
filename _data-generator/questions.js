const fs = require('fs');
const path = require('path');
const md5 = require('md5');

const questionIds = require('./question-guids');

const outputPath = path.relative(__dirname, '../public/data/questions.json');

const answerToQuestionObj = val => ({
  id: md5(val),
  answer: val
});

const questions = [{
  id: questionIds.emoji,
  group_by: true,
  order: 0,
  title: 'How do you feel as the new President prepares to take office?',
  type: 'MultipleChoice',
  options: [
    '😍',
    '😀',
    '😐',
    '😟',
    '😡',
    '😳',
    '😞',
    '🤔',
    '🇺🇸'
  ].map(answerToQuestionObj)
}, {
  id: questionIds.issue,
  group_by: false,
  order: 1,
  title: 'Which issue should be highest on the new president’s agenda?',
  type: 'MultipleChoice',
  options: [
    'Cyber Security',
    'The Economy',
    'Trade',
    'Education',
    'Energy and the Environment',
    'Health Care',
    'Crime',
    'Defense and National Security',
    'Immigration',
    'Foreign Policy',
    'Social Issues'
  ].map(answerToQuestionObj)
}, {
  id: questionIds.focus,
  group_by: false,
  order: 2,
  title: 'If the new president achieves one thing in the next four years, what should it be?',
  type: 'TextArea'
}, {
  id: questionIds.name,
  group_by: false,
  order: 3,
  title: 'Please provide your name for display',
  type: 'TextArea'
}, {
  id: questionIds.location,
  group_by: false,
  order: 4,
  title: 'Please provide your location for display',
  type: 'TextArea'
}];

// Convert array to dictionary keyed by ID
module.exports = questions.reduce((questionsObj, q) => Object.assign({
  [q.id]: q
}, questionsObj), {});
