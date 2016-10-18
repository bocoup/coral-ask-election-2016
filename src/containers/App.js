import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchDataIfNeeded } from '../state/reducer';

import {
  getSummary
} from '../state/selectors';

const mapStateToProps = state => ({
  summary: getSummary(state)
});

class App extends Component {
  static propTypes = {
    summary: PropTypes.array,
    dispatch: PropTypes.func
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded());
  }

  render() {
    const { summary } = this.props;
    return (
      <div className="App">
        <div className="container">
          <ul>
            {summary && summary.map(emotion => (
              <li key={emotion.name}>{emotion.count} {emotion.name} respondents</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
