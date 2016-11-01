import React, { PropTypes, PureComponent } from 'react';
import twemoji from 'twemoji';
import { emojiSVGUrl } from '../utils/emoji';
import d3 from '../d3';

import './EmojiBarChart.scss';

class EmojiBarChart extends PureComponent {
  static propTypes = {
    emoji: PropTypes.array,
    height: PropTypes.number,
    topic: PropTypes.object
  }

  static defaultProps = {
    height: 45,
    emoji: []
  }

  /**
   * When the react component mounts, setup the d3 vis
   */
  componentDidMount() {
    this.update();
    twemoji.parse(this.root, icon => emojiSVGUrl(icon));
  }

  /**
   * When the react component updates, update the d3 vis
   */
  componentDidUpdate() {
    this.update();
    twemoji.parse(this.root, icon => emojiSVGUrl(icon));
  }

  update() {
    const { emoji } = this.props;

    if (!emoji) {
      return;
    }

    const parent = d3.select(this.root);
    const h = this.props.height;
    const emojiHeight = 32;
    const labelHeight = 18;
    const barWidth = 20;
    const maxBarHeight = h - emojiHeight - labelHeight;

    const sumValues = d3.sum(emoji, d => d.count);
    const percentExtent = d3.extent(emoji, d => (d.count / sumValues));
    const opacityScale = d3.scaleLinear()
      .domain(percentExtent)
      .range([0.25, 1]);

    const heightScale = d3.scaleLinear()
      .domain(d3.extent(emoji, d => d.count))
      .range([0, maxBarHeight]);

    const binding = parent.selectAll('div.emoji-bar-container')
      .data(emoji, d => d.id);

    const entering = binding.enter()
      .append('div')
      .classed('emoji-bar-container', true);

    // Each emoji bar container has:
    // 1. small bar
    // 2. emoji
    // 3. label with value.

    // 1. bars
    const bars = entering.append('div')
      .classed('bar', true)
      .style('height', `${maxBarHeight}px`)
      .append('div')
      .classed('inner-bar', true);

    bars
      .style('top', () => `${maxBarHeight}px`)
      .style('width', `${barWidth}px`)
      .style('left', `${(emojiHeight - barWidth) / 2}px`);

    // on update, animate bars up
    entering.merge(binding)
      .selectAll('div.inner-bar')
      .transition()
      .delay((d, i) => i * 25)
        .style('top', d => `${maxBarHeight - heightScale(d.count)}px`);

    // 2. emoji
    entering.append('div')
      .classed('emoji', true)
      .text(d => d.value)
      .style('opacity', 0);

    // on update, animate opacity
    entering.merge(binding)
      .selectAll('div.emoji')
        .transition()
        .delay((d, i) => i * 100)
          .style('opacity', d => opacityScale(d.count / sumValues));

    entering.append('div')
      .classed('label', true)
      .text(d => d3.format('.0%')(d.count / sumValues));

    binding.exit()
      .transition()
      .delay((d, i) => i * 25)
      .style('opacity', 0)
        .remove();
  }

  render() {
    const { topic } = this.props;

    return (
      <div className="emoji-bar-chart">
        <h5>
          People who care about
          <span className="selectedTopic"> {topic.value} </span>
          feel:
        </h5>
        <div className="emoji-bar-wrapper" ref={(node) => { this.root = node; }} />
      </div>
    );
  }
}

export default EmojiBarChart;
