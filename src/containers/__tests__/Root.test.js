import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../Root';

import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const mockStore = configureMockStore([thunkMiddleware]);

it('renders without crashing', () => {
  const store = mockStore({
    summary: {
      payload: []
    }
  });
  const div = document.createElement('div');
  ReactDOM.render(<Root store={store} />, div);
});
