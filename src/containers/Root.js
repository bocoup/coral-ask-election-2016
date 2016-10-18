import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import '../assets/base.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object
};

export default Root;
