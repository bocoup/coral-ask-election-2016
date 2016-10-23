import React, { PureComponent, PropTypes } from 'react';
import addComputedProps from 'react-computed-props';
import d3 from '../d3';

import './TopicBarChart.scss';

const computeProps = (props) => {
  const { topics } = props;

  return {
    topics
  };
};

class TopicBarChart extends PureComponent {
  static propTypes = {
    topics: PropTypes.array,
    width: PropTypes.number
  }

  static defaultProps = {
    topics: []
  };

  /**
   * When the react component mounts, setup the d3 vis
   */
  componentDidMount() {
    this.update();
  }

  /**
   * Initialize the d3 chart - this is run once on mount
   */
  update() {
    let { topics } = this.props;

    // MOCK DATA
    topics = [
      {
        id: '4690cd84196b0a4e3f84f2cc3bf79ac7',
        answer: 'Cyber Security',
        count: 40
      },
      {
        id: '98a6399d1a49d929e8403bf9fce897e5',
        answer: 'The Economy',
        count: 10
      },
      {
        id: '5f390d80b20daad8f5d2f483fb0ae9d8',
        answer: 'Trade',
        count: 80
      },
      {
        id: 'de7a22a0c94aa64ba2449e520aa20c99',
        answer: 'Education',
        count: 20
      },
      {
        id: 'd91b20b62997b6bfe27473dd16675cfb',
        answer: 'Energy and the Environment',
        count: 10
      },
      {
        id: '745ce5bc6e3557b01bf4cfbd90721ae7',
        answer: 'Health Care',
        count: 100
      },
      {
        id: 'c967a0dbb29151be23e4d79805a1da02',
        answer: 'Crime',
        count: 60
      },
      {
        id: 'e03aac50cc66ce2b2b0eeaf57cb68d0a',
        answer: 'Defense and National Security',
        count: 30
      },
      {
        id: 'b306b60e6d0b6a265e0914a60ac48867',
        answer: 'Immigration',
        count: 20
      },
      {
        id: '8deaa8bde66cc6bf6ffc7d4e48c82f68',
        answer: 'Foreign Policy',
        count: 40
      },
      {
        id: 'b1cc14fffa31a73de64ba82e99ecfbe6',
        answer: 'Social Issues',
        count: 20
      }
    ];


    if (!topics.length) {
      return;
    }

    const parent = d3.select(this.root);

    const chart = parent.append('div')
      .classed('bar-group-container', true);

    const w = this.props.width;
    const labelWidth = 150;
    const innerPadding = 10;
    const padding = 20;
    const remainingWidth = w - (padding * 2) - (innerPadding * 2);
    const countScale = d3.scaleLinear()
      .domain(d3.extent(topics, d => d.count))
      .range([5, w - labelWidth]);

    const sumCounts = d3.sum(topics, d => d.count);

    const binding = chart.selectAll('div.bar-group')
      .data(topics, d => d.id);

    const entering = binding.enter()
      .append('div')
      .classed('bar-group', true)
      .style('width', `${remainingWidth}px`);

    const labelContainer = entering.append('div')
      .classed('topic-detail-container', true);

    // name of topic
    labelContainer.append('div')
      .classed('topic-name', true)
      .text(d => d.answer);

    // % label
    labelContainer.append('div')
      .classed('percentage', true)
      .text(d => d3.format('.0%')(d.count / sumCounts));

    const barContainer = entering.append('div')
      .classed('topic-bar-container', true);

    // bar - background
    barContainer.append('div')
        .classed('topic-bar-background', true)
        .style('width', `${remainingWidth}px`);

    // bar - value
    barContainer.append('div')
      .classed('topic-bar', true)
      .style('width', d => `${countScale(d.count)}px`);
  }

  render() {
    const { width } = this.props;

    return (
      <div className={'topic-bar-chart'}>
        <h3>Topics</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque eu velit orci. Donec in aliquet nunc. Duis pretium
          vulputate nunc id elementum. Vivamus commodo eros nisl,
          vel pretium lectus ultricies id. Curabitur eu dui malesuada,
          rutrum libero at, lacinia mauris. Quisque a fermentum nisi.
          Praesent porta ante eu congue placerat. Aliquam semper ligula
          x, id cursus lectus lobortis in. In hac habitasse platea dictumst.
          Sed a ipsum ac magna volutpat laoreet. Aenean ultricies venenatis
          velit, facilisis sollicitudin eros vehicula sed.
        </p>
        <div
          style={{
            position: 'relative',
            width: `${width}px`
          }}
          ref={(node) => { this.root = node; }}
        />
      </div>
    );
  }
}

export default addComputedProps(computeProps, {
  changeInclude: ['topics']
})(TopicBarChart);
