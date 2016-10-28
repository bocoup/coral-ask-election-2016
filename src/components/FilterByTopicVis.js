import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopicBarChart from '../components/TopicBarChart';
import EmojiBarChart from '../components/EmojiBarChart';
import Letter from '../components/Letter';
// import ShortAnswerList from '../components/ShortAnswerList';

import where from '../utils/where-properties-match';

import { selectTopic } from '../state/actions';

import {
  getEmojiCountsFilteredByTopic,
  getResponsesList,
  getSelectedTopic,
  getTopicCounts
} from '../state/selectors';

const mapStateToProps = state => ({
  selectedTopic: getSelectedTopic(state),
  topics: getTopicCounts(state),
  filteredEmojiCounts: getEmojiCountsFilteredByTopic(state),
  responses: getResponsesList(state)
});

class FilterByTopicVis extends Component {
  static propTypes = {
    selectedTopic: PropTypes.object,
    topics: PropTypes.array,
    filteredEmojiCounts: PropTypes.array,
    responses: PropTypes.array,
    dispatch: PropTypes.func
  }

  render() {
    const {
      responses,
      topics,
      selectedTopic,
      filteredEmojiCounts,
      dispatch
    } = this.props;

    if (!topics || !topics.length) {
      return null;
    }

    console.log(responses);

    const matchingResponses = selectedTopic ? where(responses, {
      [selectedTopic.id]: selectedTopic.value
    }) : [];

    console.log(matchingResponses.length);

    return (
      <div>
        <TopicBarChart
          onSelect={topicId => dispatch(selectTopic(topicId))}
          topics={topics}
          selectedTopic={selectedTopic}
        />
        {selectedTopic && <EmojiBarChart height={70} emoji={filteredEmojiCounts} topic={selectedTopic} />}
        {responses && <Letter response={responses} width={400} />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterByTopicVis);
