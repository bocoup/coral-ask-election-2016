import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopicBarChart from '../components/TopicBarChart';
import EmojiBarChart from '../components/EmojiBarChart';
import Letter from '../components/Letter';
// import ShortAnswerList from '../components/ShortAnswerList';

import { emojiSVGImageTag } from '../utils/emoji';
import DangerousInline from '../components/DangerousInline';

import {
  selectTopic,
  selectTopicEmoji,
  showNextLetter,
  fetchResponsesIfNeeded
} from '../state/actions';

import {
  getEmojiCountsFilteredByTopic,
  getQuestionsOrder,
  getTopicLetter,
  getSelectedTopic,
  getSelectedTopicEmoji,
  getTopicCounts
} from '../state/selectors';

const mapStateToProps = state => ({
  questionsOrder: getQuestionsOrder(state),
  selectedTopic: getSelectedTopic(state),
  selectedTopicEmoji: getSelectedTopicEmoji(state),
  topicLetter: getTopicLetter(state),
  topics: getTopicCounts(state),
  filteredEmojiCounts: getEmojiCountsFilteredByTopic(state)
});

class FilterByTopicVis extends PureComponent {
  static propTypes = {
    questionsOrder: PropTypes.array,
    selectedTopic: PropTypes.object,
    selectedTopicEmoji: PropTypes.object,
    topicLetter: PropTypes.object,
    topics: PropTypes.array,
    filteredEmojiCounts: PropTypes.array,
    dispatch: PropTypes.func
  }

  render() {
    const {
      questionsOrder,
      topicLetter,
      topics,
      selectedTopic,
      selectedTopicEmoji,
      filteredEmojiCounts,
      dispatch
    } = this.props;

    if (!topics || !topics.length) {
      return null;
    }

    let showMoreButtonText;
    if (selectedTopic) {
      if (selectedTopicEmoji) {
        const emojiImg = emojiSVGImageTag(selectedTopicEmoji.value);
        showMoreButtonText = (
          <DangerousInline html={`Show another ${selectedTopic.value} & ${emojiImg} response`} />
        );
      } else {
        showMoreButtonText = `Show another ${selectedTopic.value} response`;
      }
    }

    return (
      <div className="filter-by-topic">
        <TopicBarChart
          onSelect={(topicId) => {
            dispatch(selectTopic(topicId));
            dispatch(fetchResponsesIfNeeded(topicId));
          }}
          topics={topics}
          selectedTopic={selectedTopic}
        />
        <EmojiBarChart
          onSelect={emoji => dispatch(selectTopicEmoji(emoji))}
          height={70}
          emoji={filteredEmojiCounts}
          topic={selectedTopic}
        />
        <Letter
          showMore={() => dispatch(showNextLetter(selectedTopic.id))}
          buttonText={showMoreButtonText}
          responses={[topicLetter]}
          questionsOrder={questionsOrder}
          width={400}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByTopicVis);
