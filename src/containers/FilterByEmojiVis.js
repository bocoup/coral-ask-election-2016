import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import EmojiBubbleChart from '../components/EmojiBubbleChart';
import FilteredEmojiLetter from './FilteredEmojiLetter';

import {
  selectEmoji,
  showNextLetter,
  fetchResponsesIfNeeded
} from '../state/actions';

import {
  getEmojiCounts,
  getSelectedEmoji
} from '../state/selectors';

const mapStateToProps = state => ({
  emojiCounts: getEmojiCounts(state),
  selectedEmoji: getSelectedEmoji(state)
});

class FilterByEmojiVis extends PureComponent {
  static propTypes = {
    emojiCounts: PropTypes.array,
    selectedEmoji: PropTypes.object,
    dispatch: PropTypes.func
  }

  render() {
    const {
      emojiCounts,
      selectedEmoji,
      dispatch
    } = this.props;

    if (!emojiCounts) {
      return null;
    }

    return (
      <div className="filter-by-feeling">
        <EmojiBubbleChart
          emoji={emojiCounts}
          selectedEmoji={selectedEmoji}
          onSelect={(emojiId) => {
            dispatch(selectEmoji(emojiId));
            dispatch(fetchResponsesIfNeeded(emojiId));
            dispatch(showNextLetter(emojiId));
          }}
          width={400}
          height={400}
        />
        <FilteredEmojiLetter />
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByEmojiVis);
