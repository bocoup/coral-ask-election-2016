import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import log from '../utils/log';
import fieldValue from '../utils/fields';

import EmojiBubbleChart from '../components/EmojiBubbleChart';
// import EmojiGrid from '../components/EmojiGrid';
// import EmojiFilter from '../components/EmojiFilter';
import FilterableBarChart from '../components/FilterableBarChart';
import Letter from '../components/Letter';
import EmojiBarChart from '../components/EmojiBarChart';
// import ShortAnswerList from '../components/ShortAnswerList';

import {
  fetchDataIfNeeded,
  fetchFieldsIfNeeded,
  fetchQuestions,
  selectEmoji
} from '../state/actions';

import {
  getAggregations,
  getEmojiCounts,
  // getEmojiQuestion,
  getMultipleChoiceCounts,
  getFieldsDictionary
  // getResponsesList,
  // getSelectedEmoji
} from '../state/selectors';

const mapStateToProps = state => ({
  emoji: getEmojiCounts(state),
  // selectedEmoji: getSelectedEmoji(state),
  // emojiQuestion: getEmojiQuestion(state),
  mcQuestions: getMultipleChoiceCounts(state),
  // responses: getResponsesList(state),
  aggregations: getAggregations(state),

  // google spreadsheet fields
  fields: getFieldsDictionary(state)
});

class App extends Component {
  static propTypes = {
    emoji: PropTypes.array,
    aggregations: PropTypes.object,
    // emojiQuestion: PropTypes.object,
    // responses: PropTypes.array,
    mcQuestions: PropTypes.object,
    // selectedEmoji: PropTypes.object,
    dispatch: PropTypes.func,

    // google spreadhseet fields
    fields: PropTypes.object
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchFieldsIfNeeded());
    dispatch(fetchDataIfNeeded());
    dispatch(fetchQuestions());
  }

  render() {
    const {
      emoji,
      // responses,
      aggregations,
      // selectedEmoji,
      // emojiQuestion,
      mcQuestions,
      fields,
      dispatch
    } = this.props;

    log(['We got fields!', fields]);
    return (
      <div className="App" ref={(node) => { this.root = node; }}>

        <h1 className={'intro-title'}>
          {
            fieldValue(
              fields,
              'elc-text-title',
              'Word to the President'
            )
          }
        </h1>

        <div className={'intro-blurb'}>
          {
            fieldValue(
              fields,
              'elc-text-intro-blurb',
              'The election is over. It’s time to plan for a new administration.'
            )
          }
        </div>

        <div className="container">
          {emoji && <EmojiBubbleChart
            emoji={emoji}
            onSelect={emoji => dispatch(selectEmoji(emoji))}
            width={400}
            height={300}
          />}
          {/*
            emojiQuestion && <EmojiGrid questionKey={emojiQuestion.id} responses={responses} width={400} height={300} />
          */}
          {/*
            emoji && <EmojiFilter emoji={emoji} onSelect={emoji => dispatch(selectEmoji(emoji))} />
          */}
          {mcQuestions && Object.keys(mcQuestions).map(key => (
            <FilterableBarChart key={key} questionId={key} />
          ))}
          <EmojiBarChart height={70} emoji={[]} topic={'Health Care'} />
          {aggregations && <Letter response={[]} width={400} />}
          {/* summary && <ShortAnswerList selectedEmoji={selectedEmojiGroup} /> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
