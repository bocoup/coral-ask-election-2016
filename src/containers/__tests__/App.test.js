import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import App from '../App';

import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const mockStore = configureMockStore([thunkMiddleware]);

describe.skip('App component', () => {
  it('renders without crashing', () => {
    const store = mockStore({
      summary: {
        payload: []
      }
    });
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}>
      {/* <App/> */}
    </Provider>, div);
  });
});
