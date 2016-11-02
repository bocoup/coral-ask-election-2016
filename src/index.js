import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';

import store from './state/store';
import Root from './containers/Root';

import getConfig from './config';

getConfig.then(() => {
  ReactDOM.render(
    <AppContainer errorReporter={Redbox}>
      <Root store={store} />
    </AppContainer>,
    document.getElementById('election-vis-root')
  );

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      const RootReloaded = require('./containers/Root').default; // eslint-disable-line global-require

      ReactDOM.render(
        <AppContainer errorReporter={Redbox}>
          <RootReloaded store={store} />
        </AppContainer>,
        document.getElementById('election-vis-root')
      );
    });
  }
});
