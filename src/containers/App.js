import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import EmojiBubbleChart from '../components/EmojiBubbleChart';

import { fetchDataIfNeeded } from '../state/reducer';

import {
  getSummary
} from '../state/selectors';

const mapStateToProps = state => ({
  state,
  summary: getSummary(state)
});

class App extends Component {
  static propTypes = {
    summary: PropTypes.object,
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
          {/* <ul>
            {summary && summary.map(emotion => (
              <li key={emotion.name}>{emotion.count} {emotion.name} respondents</li>
            ))}
          </ul> */}
          {summary && <EmojiBubbleChart emoji={summary.emoji} width={500} height={300} />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
