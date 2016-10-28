import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopicBarChart from '../components/TopicBarChart';
import EmojiBarChart from '../components/EmojiBarChart';
import Letter from '../components/Letter';
// import ShortAnswerList from '../components/ShortAnswerList';

import where from '../utils/where-properties-match';

import { selectTopic } from '../state/actions';

import {
  getEmojiCountsFilteredByTopic,
  getTopicQuestion,
  getQuestionsOrder,
  getResponsesList,
  getSelectedTopic,
  getTopicCounts
} from '../state/selectors';

const mapStateToProps = state => ({
  questionsOrder: getQuestionsOrder(state),
  selectedTopic: getSelectedTopic(state),
  topicQuestion: getTopicQuestion(state),
  topics: getTopicCounts(state),
  filteredEmojiCounts: getEmojiCountsFilteredByTopic(state),
  responses: getResponsesList(state)
});

class FilterByTopicVis extends PureComponent {
  static propTypes = {
    questionsOrder: PropTypes.array,
    selectedTopic: PropTypes.object,
    topicQuestion: PropTypes.object,
    topics: PropTypes.array,
    filteredEmojiCounts: PropTypes.array,
    responses: PropTypes.array,
    dispatch: PropTypes.func
  }

  render() {
    const {
      questionsOrder,
      responses,
      topicQuestion,
      topics,
      selectedTopic,
      filteredEmojiCounts,
      dispatch
    } = this.props;

    if (!topics || !topics.length) {
      return null;
    }

    const matchingResponses = selectedTopic ? where(responses, {
      [topicQuestion.id]: selectedTopic.value
    }) : responses;

    return (
      <div className="filter-by-topic">
        <TopicBarChart
          onSelect={topicId => dispatch(selectTopic(topicId))}
          topics={topics}
          selectedTopic={selectedTopic}
        />
        {selectedTopic && <EmojiBarChart height={70} emoji={filteredEmojiCounts} topic={selectedTopic} />}
        <Letter responses={matchingResponses} questionsOrder={questionsOrder} width={400} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByTopicVis);
