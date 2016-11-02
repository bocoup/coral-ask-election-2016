import pym from 'pym.js';

const pymChild = new pym.Child();

/**
 * Update pym each time an action is fired.
 */
const pymMiddleware = () => next => (action) => {
  // delay until next tick to let react re-render
  setTimeout(() => {
    pymChild.sendHeight();
  }, 0);

  return next(action);
};

export default pymMiddleware;
