import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import EmojiBubbleChart from '../components/EmojiBubbleChart';
import Letter from '../components/Letter';

import {
  selectEmoji,
  showNextLetter,
  fetchResponsesIfNeeded
} from '../state/actions';

import {
  getEmojiCounts,
  getEmojiLetter,
  getQuestionsOrder,
  getSelectedEmoji
} from '../state/selectors';

const mapStateToProps = state => ({
  emoji: getEmojiCounts(state),
  currentLetter: getEmojiLetter(state),
  questionsOrder: getQuestionsOrder(state),
  selectedEmoji: getSelectedEmoji(state)
});

class FilterByEmojiVis extends PureComponent {
  static propTypes = {
    emoji: PropTypes.array,
    currentLetter: PropTypes.object,
    questionsOrder: PropTypes.array,
    selectedEmoji: PropTypes.object,
    dispatch: PropTypes.func
  }

  render() {
    const {
      emoji,
      currentLetter,
      questionsOrder,
      selectedEmoji,
      dispatch
    } = this.props;

    console.log(currentLetter);

    return (
      <div className="filter-by-feeling">
        {emoji && <EmojiBubbleChart
          emoji={emoji}
          selectedEmoji={selectedEmoji}
          onSelect={(emojiId) => {
            dispatch(selectEmoji(emojiId));
            dispatch(showNextLetter(emojiId));
            dispatch(fetchResponsesIfNeeded(emojiId));
          }}
          width={400}
          height={400}
        />}
        <Letter responses={[currentLetter]} questionsOrder={questionsOrder} width={400} />
        {selectedEmoji && <button
          onClick={() => dispatch(showNextLetter(selectedEmoji.id))}
          type="button"
        >
          Show another {selectedEmoji.value} response
        </button>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByEmojiVis);
