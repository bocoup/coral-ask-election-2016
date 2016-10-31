import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopicBarChart from '../components/TopicBarChart';
import EmojiBarChart from '../components/EmojiBarChart';
import Letter from '../components/Letter';
// import ShortAnswerList from '../components/ShortAnswerList';

import {
  selectTopic,
  showNextLetter,
  fetchResponsesIfNeeded
} from '../state/actions';

import {
  getEmojiCountsFilteredByTopic,
  getQuestionsOrder,
  getTopicLetter,
  getSelectedTopic,
  getTopicCounts
} from '../state/selectors';

const mapStateToProps = state => ({
  questionsOrder: getQuestionsOrder(state),
  selectedTopic: getSelectedTopic(state),
  topicLetter: getTopicLetter(state),
  topics: getTopicCounts(state),
  filteredEmojiCounts: getEmojiCountsFilteredByTopic(state)
});

class FilterByTopicVis extends PureComponent {
  static propTypes = {
    questionsOrder: PropTypes.array,
    selectedTopic: PropTypes.object,
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
      filteredEmojiCounts,
      dispatch
    } = this.props;

    if (!topics || !topics.length) {
      return null;
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
        {selectedTopic && <EmojiBarChart height={70} emoji={filteredEmojiCounts} topic={selectedTopic} />}
        <Letter responses={[topicLetter]} questionsOrder={questionsOrder} width={400} />
        {selectedTopic && <button
          onClick={() => dispatch(showNextLetter(selectedTopic.id))}
          type="button"
        >
          Show another {selectedTopic.value} response
        </button>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByTopicVis);
