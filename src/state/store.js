import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducer';
import pymMiddleware from './pymMiddleware';

const loggerMiddleware = createLogger({
  collapsed: true,
  level: 'debug'
});

// define which middleware to use depending on environment
let composeEnhancers = compose;
const middleware = [thunkMiddleware, pymMiddleware];

// when not in production enable redux tools and add logger middleware
if (process.env.NODE_ENV !== 'production') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
  middleware.push(loggerMiddleware);
}

// create the redux store with middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

global.store = store;

export default store;
