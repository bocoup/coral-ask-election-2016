// Helper utilities to make sure we combine and split IDs consistently (needed
// for filtering responses based on multiple dimensions of data)
const sep = '|';

export const combineIds = (...args) => args.sort().join(sep);
export const splitIds = idCombination => idCombination.split(sep);
export const isCombinedId = (answerId, idCombination) => (
  idCombination.indexOf(sep) > -1 && idCombination.indexOf(answerId) > -1
);
