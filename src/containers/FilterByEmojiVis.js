import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import where from '../utils/where-properties-match';

import EmojiBubbleChart from '../components/EmojiBubbleChart';
import Letter from '../components/Letter';

import {
  selectEmoji,
  fetchResponsesIfNeeded
} from '../state/actions';

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

class FilterByEmojiVis extends PureComponent {
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
      <div className="filter-by-feeling">
        {emoji && <EmojiBubbleChart
          emoji={emoji}
          selectedEmoji={selectedEmoji}
          onSelect={(emojiId) => {
            dispatch(selectEmoji(emojiId));
            dispatch(fetchResponsesIfNeeded(emojiId));
          }}
          width={400}
          height={400}
        />}
        <Letter responses={matchingResponses} questionsOrder={questionsOrder} width={400} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByEmojiVis);
