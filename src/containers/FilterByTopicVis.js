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
  getTopicResponses,
  getSelectedTopic,
  getSelectedTopicEmoji,
  getTopicCounts
} from '../state/selectors';

const mapStateToProps = state => ({
  questionsOrder: getQuestionsOrder(state),
  selectedTopic: getSelectedTopic(state),
  selectedTopicEmoji: getSelectedTopicEmoji(state),
  filteredResponses: getTopicResponses(state),
  topics: getTopicCounts(state),
  filteredEmojiCounts: getEmojiCountsFilteredByTopic(state)
});

class FilterByTopicVis extends PureComponent {
  static propTypes = {
    questionsOrder: PropTypes.array,
    selectedTopic: PropTypes.object,
    selectedTopicEmoji: PropTypes.object,
    filteredResponses: PropTypes.array,
    topics: PropTypes.array,
    filteredEmojiCounts: PropTypes.array,
    dispatch: PropTypes.func
  }

  render() {
    const {
      questionsOrder,
      filteredResponses,
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

    // TODO: Improve this so that we page through consistently; requires new data structure
    const randomIdx = filteredResponses && Math.floor(Math.random() * filteredResponses.length);
    const randomFilteredResponse = filteredResponses && filteredResponses[randomIdx];

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
          showMore={() => dispatch(showNextLetter(selectedTopic.id))}
          buttonText={showMoreButtonText}
          buttonDisabled={!filteredResponses || filteredResponses.length <= 1}
          response={randomFilteredResponse}
          questionsOrder={questionsOrder}
          width={400}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByTopicVis);
