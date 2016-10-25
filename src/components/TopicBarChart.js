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
    console.log('mount');
    this.update();
  }

  /**
   * When the react component updates, update the d3 vis
   */
  componentDidUpdate() {
    console.log('update');
    this.update();
  }

  /**
   * Initialize the d3 chart - this is run once on mount
   */
  update() {
    const { topics } = this.props;

    if (!topics.length) {
      return;
    }

    console.log(topics);

    const chart = d3.select(this.chart);

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
      .classed('topic-bar', true);

    binding.merge(entering).each(function(d) {
      d3.select(this).selectAll('div.topic-bar')
        .style('width', d => `${countScale(d.count)}px`);
    });
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
          className="bar-group-container"
          style={{
            position: 'relative',
            width: `${width}px`
          }}
          ref={(node) => { this.chart = node; }}
        />
      </div>
    );
  }
}

export default addComputedProps(computeProps, {
  changeInclude: ['topics']
})(TopicBarChart);
