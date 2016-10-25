import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import EmojiBubbleChart from '../components/EmojiBubbleChart';
import EmojiGrid from '../components/EmojiGrid';
import EmojiFilter from '../components/EmojiFilter';
import TopicBarChart from '../components/TopicBarChart';
import Letter from '../components/Letter';
// import ShortAnswerList from '../components/ShortAnswerList';

import {
  fetchDataIfNeeded,
  fetchQuestions,
  selectEmoji
} from '../state/actions';

import {
  getSelectedEmoji,
  getAggregations,
  getEmojiCounts,
  getEmojiQuestion,
  getMultipleChoiceCounts,
  getResponsesList
} from '../state/selectors';

const mapStateToProps = state => ({
  emoji: getEmojiCounts(state),
  selectedEmoji: getSelectedEmoji(state),
  emojiQuestion: getEmojiQuestion(state),
  mcQuestions: getMultipleChoiceCounts(state),
  responses: getResponsesList(state),
  aggregations: getAggregations(state)
});

class App extends Component {
  static propTypes = {
    emoji: PropTypes.array,
    aggregations: PropTypes.object,
    emojiQuestion: PropTypes.object,
    responses: PropTypes.array,
    mcQuestions: PropTypes.array,
    selectedEmoji: PropTypes.object,
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
      aggregations,
      selectedEmoji,
      emojiQuestion,
      mcQuestions,
      dispatch
    } = this.props;
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
          {mcQuestions && mcQuestions.map((questionOptions, idx) => (
            <TopicBarChart
              key={`topicbarchart${idx}`}
              topics={questionOptions}
              selected={selectedEmoji}
              width={400}
            />
          ))}
          {aggregations && <Letter response={[]} width={400} />}
          {/* summary && <ShortAnswerList selectedEmoji={selectedEmojiGroup} /> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
