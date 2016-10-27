import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopicBarChart from '../components/TopicBarChart';

import { selectTopic } from '../state/actions';

import {
  getAggregations,
  getMultipleChoiceCounts,
  getSelectedEmoji,
  getSelectedTopic
} from '../state/selectors';

const mapStateToProps = state => ({
  aggregations: getAggregations(state),
  mcQuestions: getMultipleChoiceCounts(state),
  selectedEmoji: getSelectedEmoji(state),
  selectedTopic: getSelectedTopic(state)
});

class FilterableBarChart extends PureComponent {
  static propTypes = {
    questionId: PropTypes.string,
    mcQuestions: PropTypes.object,
    selectedEmoji: PropTypes.object,
    selectedTopic: PropTypes.object,
    dispatch: PropTypes.func
  }

  render() {
    const {
      mcQuestions,
      questionId,
      selectedEmoji,
      selectedTopic,
      dispatch
    } = this.props;

    if (!questionId || !mcQuestions) {
      return null;
    }

    const questionOptions = mcQuestions[questionId];

    return (
      <TopicBarChart
        onSelect={topicId => dispatch(selectTopic(topicId))}
        topics={questionOptions}
        selectedEmoju={selectedEmoji}
        selectedTopic={selectedTopic}
      />
    );
  }
}

export default connect(mapStateToProps)(FilterableBarChart);
