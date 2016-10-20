import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import EmojiBubbleChart from '../components/EmojiBubbleChart';
import EmojiFilter from '../components/EmojiFilter';
import ShortAnswerList from '../components/ShortAnswerList';

import { fetchDataIfNeeded, selectEmoji } from '../state/reducer';

import {
  getSelected,
  getSummary
} from '../state/selectors';

const mapStateToProps = state => ({
  selectedEmoji: getSelected(state),
  summary: getSummary(state)
});

class App extends Component {
  static propTypes = {
    summary: PropTypes.object,
    selectedEmoji: PropTypes.string,
    dispatch: PropTypes.func
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded());
  }

  render() {
    const { summary, selectedEmoji, dispatch } = this.props;
    const selectedEmojiGroup = summary && summary.emoji.filter(emojiGroup => emojiGroup.emoji === selectedEmoji);
    return (
      <div className="App">
        <div className="container">
          {/* <ul>
            {summary && summary.map(emotion => (
              <li key={emotion.name}>{emotion.count} {emotion.name} respondents</li>
            ))}
          </ul> */}
          {summary && <EmojiBubbleChart emoji={summary.emoji} width={400} height={300} />}
          {summary && <EmojiFilter emoji={summary.emoji} onSelect={emoji => dispatch(selectEmoji(emoji))} />}
          {summary && <ShortAnswerList selectedEmoji={selectedEmojiGroup} />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
