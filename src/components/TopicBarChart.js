import React, { PureComponent, PropTypes } from 'react';
import d3 from '../d3';
import { inlineEmoji } from '../utils/emoji';
import GoogleSheetFieldComponent from '../containers/GoogleSheetFieldComponent';

import './TopicBarChart.scss';

class TopicBarChart extends PureComponent {
  static propTypes = {
    topics: PropTypes.array,
    selectedEmoji: PropTypes.object,
    selectedTopic: PropTypes.object,
    onSelect: PropTypes.func
  }

  render() {
    const {
      onSelect,
      selectedEmoji,
      selectedTopic,
      topics
    } = this.props;

    if (!topics || !topics.length) {
      return null;
    }

    const responseCount = d3.sum(topics, d => d.count);

    const emojiImageElement = selectedEmoji && inlineEmoji(selectedEmoji.answer);

    /* eslint-disable no-confusing-arrow */
    const pluralizePeople = count => (count === 1) ? 'person' : 'people';
    /* eslint-enable no-confusing-arrow */

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
            {selectedEmoji && `${responseCount} ${pluralizePeople(responseCount)} said `}
            {selectedEmoji && emojiImageElement}
            {!selectedEmoji && `${responseCount} total responses`}
          </p>
          {topics.map((topic) => {
            const percentage = topic.count ?
              d3.format('.0%')(topic.count / responseCount) :
              0;
            return (
              <button
                aria-pressed={selectedTopic && (topic.id === selectedTopic.id)}
                onClick={() => onSelect(topic.id)}
                key={topic.answer}
                className="bar-group"
              >
                <div className="topic-detail-container">
                  <div className="topic-name">{topic.answer}</div>
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
