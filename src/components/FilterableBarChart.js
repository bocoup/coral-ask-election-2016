import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopicBarChart from '../components/TopicBarChart';

import {
  getAggregations,
  getMultipleChoiceCounts,
  getSelectedEmoji
} from '../state/selectors';

const mapStateToProps = state => ({
  aggregations: getAggregations(state),
  mcQuestions: getMultipleChoiceCounts(state),
  selectedEmoji: getSelectedEmoji(state)
});

class FilterableBarChart extends PureComponent {
  static propTypes = {
    questionId: PropTypes.string,
    mcQuestions: PropTypes.object,
    selectedEmoji: PropTypes.object
  }

  render() {
    const {
      questionId,
      mcQuestions,
      selectedEmoji
    } = this.props;

    if (!questionId || !mcQuestions) {
      return null;
    }

    const questionOptions = mcQuestions[questionId];

    return (
      <TopicBarChart topics={questionOptions} selected={selectedEmoji} width={400} />
    );
  }
}

export default connect(mapStateToProps)(FilterableBarChart);
