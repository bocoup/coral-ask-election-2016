import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import EmojiBubbleChart from '../components/EmojiBubbleChart';
import Letter from '../components/Letter';

import { emojiSVGImageTag } from '../utils/emoji';
import DangerousInline from '../components/DangerousInline';

import {
  selectEmoji,
  showNextLetter,
  fetchResponsesIfNeeded
} from '../state/actions';

import {
  getEmojiCounts,
  getEmojiLetter,
  getQuestionsOrder,
  getResponsesList,
  getSelectedEmoji
} from '../state/selectors';

const mapStateToProps = state => ({
  emoji: getEmojiCounts(state),
  currentLetter: getEmojiLetter(state),
  responses: getResponsesList(state),
  questionsOrder: getQuestionsOrder(state),
  selectedEmoji: getSelectedEmoji(state)
});

class FilterByEmojiVis extends PureComponent {
  static propTypes = {
    emoji: PropTypes.array,
    currentLetter: PropTypes.object,
    questionsOrder: PropTypes.array,
    responses: PropTypes.array,
    selectedEmoji: PropTypes.object,
    dispatch: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    const { emoji, selectedEmoji, responses } = nextProps;

    // If we have no aggregations data yet, or we already have a selected emoji,
    // skip this step entirely
    if (!emoji || selectedEmoji) {
      return;
    }

    // When the component has loaded but we do not yet have a selected emoji
    // for which to show responses, start out by showing a random entry from
    // the most recent responses
    this.setState({
      response: responses[Math.floor(Math.random() * responses.length)]
    });
  }

  // Helper to page through the default responses; only used if an emoji has
  // yet to be selected
  showNextLetter() {
    const { responses } = this.props;
    const { response } = this.state;
    const currentIdx = responses.indexOf(response);
    const nextIdx = currentIdx + 1;
    this.setState({
      response: responses[nextIdx] || responses[0]
    });
  }

  render() {
    const {
      emoji,
      currentLetter,
      questionsOrder,
      selectedEmoji,
      dispatch
    } = this.props;

    if (!emoji) {
      return null;
    }

    const unfilteredResponse = this.state && this.state.response;

    let showMoreButtonText;
    if (selectedEmoji) {
      const emojiImg = emojiSVGImageTag(selectedEmoji.value);
      showMoreButtonText = (
        <DangerousInline html={`Show another ${emojiImg} response`} />
      );
    }

    return (
      <div className="filter-by-feeling">
        <EmojiBubbleChart
          emoji={emoji}
          selectedEmoji={selectedEmoji}
          onSelect={(emojiId) => {
            dispatch(selectEmoji(emojiId));
            dispatch(fetchResponsesIfNeeded(emojiId));
            dispatch(showNextLetter(emojiId));
          }}
          width={400}
          height={400}
        />
        {/* Pivot between filtered & most recent responses, prioritizing filtered */}
        {selectedEmoji ? <Letter
          showMore={() => dispatch(showNextLetter(selectedEmoji.id))}
          buttonText={showMoreButtonText}
          responses={[currentLetter]}
          questionsOrder={questionsOrder}
          width={400}
        /> : <Letter
          showMore={() => this.showNextLetter()}
          buttonText="Show another recent response"
          responses={[unfilteredResponse]}
          questionsOrder={questionsOrder}
          width={400}
        />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByEmojiVis);
