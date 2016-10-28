import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GoogleSheetFieldComponent from '../containers/GoogleSheetFieldComponent';
import EmojiBubbleChart from '../components/EmojiBubbleChart';
// import EmojiGrid from '../components/EmojiGrid';
// import EmojiFilter from '../components/EmojiFilter';
import FilterableBarChart from '../components/FilterableBarChart';
import Letter from '../components/Letter';
import EmojiBarChart from '../components/EmojiBarChart';
// import ShortAnswerList from '../components/ShortAnswerList';

import {
  fetchFormDigestIfNeeded,
  selectEmoji
} from '../state/actions';

import {
  getAggregations,
  getEmojiCounts,
  // getEmojiQuestion,
  // getResponsesList,
  getEmojiCountsFilteredByTopic,
  getSelectedTopic,
  getSelectedEmoji
} from '../state/selectors';

const mapStateToProps = state => ({
  emoji: getEmojiCounts(state),
  selectedEmoji: getSelectedEmoji(state),
  selectedTopic: getSelectedTopic(state),
  filteredEmojiCounts: getEmojiCountsFilteredByTopic(state),
  // emojiQuestion: getEmojiQuestion(state),
  // responses: getResponsesList(state),
  aggregations: getAggregations(state)
});

class App extends Component {
  static propTypes = {
    emoji: PropTypes.array,
    aggregations: PropTypes.object,
    // emojiQuestion: PropTypes.object,
    // responses: PropTypes.array,
    // selectedEmoji: PropTypes.object,
    filteredEmojiCounts: PropTypes.array,
    dispatch: PropTypes.func,
    selectedTopic: PropTypes.object,
    selectedEmoji: PropTypes.object
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchFormDigestIfNeeded());
  }

  render() {
    const {
      emoji,
      // responses,
      aggregations,
      selectedTopic,
      selectedEmoji,
      filteredEmojiCounts,
      // emojiQuestion,
      dispatch
    } = this.props;

    return (
      <div className="App" ref={(node) => { this.root = node; }}>

        <div className={'intro-container'}>
          <div>
            <h1 className={'intro-title'}>
              <GoogleSheetFieldComponent
                fieldId={'elc-text-title'}
                defaultValue={'Word to the President'}
              />

            </h1>

            <div className={'intro-blurb'}>
              <GoogleSheetFieldComponent
                fieldId={'elc-text-intro-blurb'}
                defaultValue={'The election is over. It’s time to plan for a new administration.'}
              />
            </div>
          </div>
        </div>

        <div className="container">
          {emoji && <EmojiBubbleChart
            emoji={emoji}
            selectedEmoji={selectedEmoji}
            onSelect={emoji => dispatch(selectEmoji(emoji))}
            width={400}
            height={400}
          />}
          {/*
            emojiQuestion && <EmojiGrid questionKey={emojiQuestion.id} responses={responses} width={400} height={300} />
          */}
          {/*
            emoji && <EmojiFilter emoji={emoji} onSelect={emoji => dispatch(selectEmoji(emoji))} />
          */}
          <FilterableBarChart />
          {selectedTopic && <EmojiBarChart height={70} emoji={filteredEmojiCounts} topic={selectedTopic} />}
          {aggregations && <Letter response={[]} width={400} />}
          {/* summary && <ShortAnswerList selectedEmoji={selectedEmojiGroup} /> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
