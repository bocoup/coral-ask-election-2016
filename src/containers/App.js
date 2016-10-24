import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import EmojiBubbleChart from '../components/EmojiBubbleChart';
import EmojiGrid from '../components/EmojiGrid';
import EmojiFilter from '../components/EmojiFilter';
import TopicBarChart from '../components/TopicBarChart';
import Letter from '../components/Letter';
import ShortAnswerList from '../components/ShortAnswerList';

import {
  fetchDataIfNeeded,
  fetchQuestions,
  selectEmoji
} from '../state/actions';

import {
  getSelected,
  getAggregations
} from '../state/selectors';

const mapStateToProps = state => ({
  selectedEmoji: getSelected(state),
  summary: getAggregations(state)
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
    dispatch(fetchQuestions());
  }

  render() {
    const { summary, selectedEmoji, dispatch } = this.props;
    const hasSummary = summary && summary.emoji;
    const selectedEmojiGroup = hasSummary && summary.emoji.filter(emojiGroup => emojiGroup.emoji === selectedEmoji);
    return (
      <div className="App">
        <div className="container">
          {/* <ul>
            {summary && summary.map(emotion => (
              <li key={emotion.name}>{emotion.count} {emotion.name} respondents</li>
            ))}
          </ul> */}
          {summary && <EmojiBubbleChart emoji={summary.emoji} width={400} height={300} />}
          {summary && <EmojiGrid responses={[]} width={400} height={300} />}
          {summary && <EmojiFilter emoji={summary.emoji} onSelect={emoji => dispatch(selectEmoji(emoji))} />}
          {summary && <TopicBarChart topics={[]} width={400} />}
          {summary && <Letter response={[]} width={400} />}
          {summary && <ShortAnswerList selectedEmoji={selectedEmojiGroup} />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
