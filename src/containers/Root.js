import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import '../assets/base.scss';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object
};

export default Root;
