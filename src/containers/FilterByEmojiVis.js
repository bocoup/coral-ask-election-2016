import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import where from '../utils/where-properties-match';

import EmojiBubbleChart from '../components/EmojiBubbleChart';
import Letter from '../components/Letter';

import { selectEmoji } from '../state/actions';

import {
  getEmojiCounts,
  getEmojiQuestion,
  getQuestionsOrder,
  getResponsesList,
  getSelectedEmoji
} from '../state/selectors';

const mapStateToProps = state => ({
  emoji: getEmojiCounts(state),
  emojiQuestion: getEmojiQuestion(state),
  questionsOrder: getQuestionsOrder(state),
  responses: getResponsesList(state),
  selectedEmoji: getSelectedEmoji(state)
});

class FilterByEmojiVis extends Component {
  static propTypes = {
    emoji: PropTypes.array,
    emojiQuestion: PropTypes.object,
    questionsOrder: PropTypes.array,
    responses: PropTypes.array,
    selectedEmoji: PropTypes.object,
    dispatch: PropTypes.func
  }

  render() {
    const {
      emoji,
      emojiQuestion,
      responses,
      questionsOrder,
      selectedEmoji,
      dispatch
    } = this.props;

    const matchingResponses = selectedEmoji ? where(responses, {
      [emojiQuestion.id]: selectedEmoji.value
    }) : responses;

    return (
      <div>
        {emoji && <EmojiBubbleChart
          emoji={emoji}
          selectedEmoji={selectedEmoji}
          onSelect={emoji => dispatch(selectEmoji(emoji))}
          width={400}
          height={400}
        />}
        <Letter responses={matchingResponses} questionsOrder={questionsOrder} width={400} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByEmojiVis);
