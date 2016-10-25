import React, { PureComponent, PropTypes } from 'react';
import twemoji from 'twemoji';
import d3 from '../d3';
import { emojiSVGUrl } from '../utils/emoji';

import './TopicBarChart.scss';


class TopicBarChart extends PureComponent {
  static propTypes = {
    topics: PropTypes.array,
    selected: PropTypes.object,
    width: PropTypes.number
  }

  render() {
    const { topics, selected, width } = this.props;

    const containerStyles = width ? {
      maxWidth: `${width}px`
    } : null;

    if (!topics || !topics.length) {
      return null;
    }

    const responseCount = d3.sum(topics, d => d.count);

    const emojiImage = selected && twemoji.parse(selected.answer, icon => emojiSVGUrl(icon));
    const emojiImageElement = emojiImage && <span dangerouslySetInnerHTML={{
      __html: emojiImage
    }} />;

    return (
      <div className={'topic-bar-chart'}>
        <h3>Topics</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque eu velit orci. Donec in aliquet nunc. Duis pretium
          vulputate nunc id elementum. Vivamus commodo eros nisl,
          vel pretium lectus ultricies id. Curabitur eu dui malesuada,
          rutrum libero at, lacinia mauris.
        </p>
        <div className="bar-group-container" style={containerStyles}>
          <p className="note">
            {responseCount}
            {emojiImageElement}
            {!selected && ' total '}
            responses</p>
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
