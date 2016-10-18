import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Root from '../Root';
import rootReducer from '../../state/reducer';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunkMiddleware))
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Root store={store} />, div);
});
