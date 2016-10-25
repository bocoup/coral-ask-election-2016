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
  getAggregations,
  getEmojiCounts,
  getEmojiQuestion,
  getResponsesList
} from '../state/selectors';

const mapStateToProps = state => ({
  emoji: getEmojiCounts(state),
  selectedEmoji: getSelected(state),
  emojiQuestion: getEmojiQuestion(state),
  responses: getResponsesList(state),
  summary: getAggregations(state)
});

class App extends Component {
  static propTypes = {
    emoji: PropTypes.array,
    summary: PropTypes.object,
    emojiQuestion: PropTypes.object,
    responses: PropTypes.array,
    selectedEmoji: PropTypes.string,
    dispatch: PropTypes.func
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded());
    dispatch(fetchQuestions());
  }

  render() {
    const {
      emoji,
      responses,
      summary,
      selectedEmoji,
      emojiQuestion,
      dispatch
    } = this.props;
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
          {emoji && <EmojiBubbleChart emoji={emoji} width={400} height={300} />}
          {emojiQuestion && <EmojiGrid questionKey={emojiQuestion.id} responses={responses} width={400} height={300} />}
          {emoji && <EmojiFilter emoji={emoji} onSelect={emoji => dispatch(selectEmoji(emoji))} />}
          {summary && <TopicBarChart topics={[]} width={400} />}
          {summary && <Letter response={[]} width={400} />}
          {summary && <ShortAnswerList selectedEmoji={selectedEmojiGroup} />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
