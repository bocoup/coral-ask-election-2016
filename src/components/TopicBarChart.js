import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import d3 from '../d3';
import GoogleSheetFieldComponent from '../containers/GoogleSheetFieldComponent';

import './TopicBarChart.scss';

class TopicBarChart extends PureComponent {
  static propTypes = {
    topics: PropTypes.array,
    selectedTopic: PropTypes.object,
    onSelect: PropTypes.func
  }

  render() {
    const {
      onSelect,
      selectedTopic,
      topics
    } = this.props;

    if (!topics || !topics.length) {
      return null;
    }

    const responseCount = d3.sum(topics, d => d.count);

    return (
      <div className={'topic-bar-chart'}>
        <h3>
          <GoogleSheetFieldComponent
            fieldId={'elc-text-filter-by-topics-header'}
            defaultValue={'Filter by Topics'}
          />
        </h3>
        <GoogleSheetFieldComponent
          fieldId={'elc-text-filter-by-topics-blurb'}
          defaultValue={'<p>Which issue should be highest on the new president’s agenda?</p>'}
        />

        <div className="bar-group-container">
          <p className="note">
            {responseCount} total responses
          </p>
          {topics.map((topic) => {
            const percentage = topic.count ?
              d3.format('.0%')(topic.count / responseCount) :
              0;
            const isSelected = selectedTopic && (topic.id === selectedTopic.id);
            const classes = classNames('bar-group', {
              selected: isSelected
            });
            return (
              <button
                aria-pressed={isSelected}
                onClick={() => onSelect(topic.id)}
                key={topic.value}
                className={classes}
              >
                <div className="topic-detail-container">
                  <div className="topic-name">{topic.value}</div>
                  <div className="percentage">{percentage}</div>
                </div>
                <div className="topic-bar-container">
                  <div className="topic-bar" style={{ width: percentage }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TopicBarChart;
