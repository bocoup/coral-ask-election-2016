import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopicBarChart from '../components/TopicBarChart';

import { selectTopic } from '../state/actions';

import {
  getTopicCounts,
  getSelectedTopic
} from '../state/selectors';

const mapStateToProps = state => ({
  topics: getTopicCounts(state),
  selectedTopic: getSelectedTopic(state)
});

class FilterableBarChart extends PureComponent {
  static propTypes = {
    topics: PropTypes.array,
    selectedTopic: PropTypes.object,
    dispatch: PropTypes.func
  }

  render() {
    const {
      topics,
      selectedTopic,
      dispatch
    } = this.props;

    if (!topics.length) {
      return null;
    }

    return (
      <TopicBarChart
        onSelect={topicId => dispatch(selectTopic(topicId))}
        topics={topics}
        selectedTopic={selectedTopic}
      />
    );
  }
}

export default connect(mapStateToProps)(FilterableBarChart);
