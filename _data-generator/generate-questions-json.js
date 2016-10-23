const fs = require('fs');
const path = require('path');

const outputPath = path.relative(__dirname, '../public/data/questions.json');
const questions = require('./questions');

fs.writeFileSync(outputPath, JSON.stringify({
  questions
}));
