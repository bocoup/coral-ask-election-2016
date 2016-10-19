export function keyedToArray(arr) {
  console.log(arr);
  const questions = Object.keys(arr.aggregations).map(key => arr.aggregations[key]);
  console.log(questions);
  return questions;
}
