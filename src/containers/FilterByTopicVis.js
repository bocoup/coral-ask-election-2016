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

  // Ensure the view loads with one topic selected, so that the full UI is available
  componentWillReceiveProps(nextProps) {
    // If we do not have topics yet, or a topic has already been selected, do nothing
    if (!nextProps.topics || !nextProps.topics.length || nextProps.selectedTopic) {
      return;
    }
    const { topics } = nextProps;
    for (let i = 0; i < topics.length; i += 1) {
      if (topics[i].count) {
        this.selectTopic(topics[i].id);
        return;
      }
    }
  }

  // Event handlers
  selectTopic(topicId) {
    const { dispatch } = this.props;
    dispatch(fetchResponsesIfNeeded(topicId));
    dispatch(selectTopic(topicId));
    this.showNextLetter(topicId);
  }

  selectEmoji(emojiId) {
    const { dispatch } = this.props;
    dispatch(fetchResponsesIfNeeded(emojiId));
    dispatch(selectTopicEmoji(emojiId));
    this.showNextLetter(undefined, emojiId);
  }

  showNextLetter(topicId, emojiId) {
    const { dispatch, selectedTopic, selectedTopicEmoji } = this.props;
    topicId = topicId || (selectedTopic && selectedTopic.id);

    if (selectedTopicEmoji) {
      emojiId = emojiId || selectedTopicEmoji.id;
      dispatch(showNextLetter(topicId, emojiId));
    } else {
      dispatch(showNextLetter(topicId));
    }
  }

  render() {
    const {
      questionsOrder,
      topics,
      topicLetter,
      selectedTopic,
      selectedTopicEmoji,
      filteredEmojiCounts
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
          onSelect={topicId => this.selectTopic(topicId)}
          topics={topics}
          selectedTopic={selectedTopic}
        />
        <EmojiBarChart
          onSelect={emojiId => this.selectEmoji(emojiId)}
          selectedTopicEmoji={selectedTopicEmoji}
          height={70}
          emoji={filteredEmojiCounts}
          topic={selectedTopic}
        />
        <Letter
          showMore={() => this.showNextLetter()}
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
