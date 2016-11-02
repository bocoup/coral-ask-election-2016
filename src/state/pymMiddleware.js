import pym from 'pym.js';

const pymChild = new pym.Child();

/**
 * Update pym each time an action is fired.
 */
const pymMiddleware = () => next => (action) => {
  pymChild.sendHeight();
  return next(action);
};

export default pymMiddleware;
