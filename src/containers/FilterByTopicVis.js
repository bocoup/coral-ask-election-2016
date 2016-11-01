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
  getSelectedTopic,
  getTopicLetter,
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
    topics: PropTypes.array,
    topicLetter: PropTypes.object,
    filteredEmojiCounts: PropTypes.array,
    dispatch: PropTypes.func
  }

  render() {
    const {
      questionsOrder,
      topics,
      topicLetter,
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
            dispatch(fetchResponsesIfNeeded(topicId));
            dispatch(selectTopic(topicId));
          }}
          topics={topics}
          selectedTopic={selectedTopic}
        />
        <EmojiBarChart
          onSelect={(emojiId) => {
            dispatch(fetchResponsesIfNeeded(emojiId));
            dispatch(selectTopicEmoji(emojiId));
          }}
          height={70}
          emoji={filteredEmojiCounts}
          topic={selectedTopic}
        />
        <Letter
          showMore={() => dispatch(showNextLetter(selectedTopic.id, selectedTopicEmoji.id))}
          buttonText={showMoreButtonText}
          response={topicLetter}
          questionsOrder={questionsOrder}
          width={400}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByTopicVis);
