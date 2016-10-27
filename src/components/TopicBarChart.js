import React, { PureComponent, PropTypes } from 'react';
import d3 from '../d3';
import { inlineEmoji } from '../utils/emoji';

import './TopicBarChart.scss';


class TopicBarChart extends PureComponent {
  static propTypes = {
    topics: PropTypes.array,
    selected: PropTypes.object
  }

  render() {
    const { topics, selected } = this.props;

    if (!topics || !topics.length) {
      return null;
    }

    const responseCount = d3.sum(topics, d => d.count);

    const emojiImageElement = selected && inlineEmoji(selected.answer);

    /* eslint-disable no-confusing-arrow */
    const pluralizePeople = count => (count === 1) ? 'person' : 'people';
    /* eslint-enable no-confusing-arrow */

    return (
      <div className={'topic-bar-chart'}>
        <h3>Filter by Topics</h3>
        <p>
         Which issue should be highest on the new president’s agenda?
        </p>
        <div className="bar-group-container">
          <p className="note">
            {selected && `${responseCount} ${pluralizePeople(responseCount)} said `}
            {selected && emojiImageElement}
            {!selected && `${responseCount} total responses`}
          </p>
          {topics.map((topic) => {
            const percentage = topic.count ?
              d3.format('.0%')(topic.count / responseCount) :
              0;
            return (
              <div key={topic.answer} className="bar-group">
                <div className="topic-detail-container">
                  <div className="topic-name">{topic.answer}</div>
                  <div className="percentage">{percentage}</div>
                </div>
                <div className="topic-bar-container">
                  <div className="topic-bar" style={{ width: percentage }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TopicBarChart;
