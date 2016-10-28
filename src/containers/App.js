import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GoogleSheetFieldComponent from '../containers/GoogleSheetFieldComponent';
import EmojiBubbleChart from '../components/EmojiBubbleChart';
// import EmojiGrid from '../components/EmojiGrid';
// import EmojiFilter from '../components/EmojiFilter';
import FilterByTopicVis from '../components/FilterByTopicVis';
// import ShortAnswerList from '../components/ShortAnswerList';

import {
  fetchFormDigestIfNeeded,
  selectEmoji
} from '../state/actions';

import {
  getEmojiCounts,
  // getResponsesList,
  getSelectedEmoji
} from '../state/selectors';

const mapStateToProps = state => ({
  emoji: getEmojiCounts(state),
  // responses: getResponsesList(state),
  selectedEmoji: getSelectedEmoji(state)
});

class App extends Component {
  static propTypes = {
    emoji: PropTypes.array,
    // responses: PropTypes.array,
    // selectedEmoji: PropTypes.object,
    dispatch: PropTypes.func,
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
      selectedEmoji,
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
          <FilterByTopicVis />
          {/* summary && <ShortAnswerList selectedEmoji={selectedEmojiGroup} /> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
