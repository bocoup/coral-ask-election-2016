import React, { PropTypes, PureComponent } from 'react';
import twemoji from 'twemoji';
import { emojiSVGUrl } from '../utils/emoji';
import d3 from '../d3';

import './EmojiBarChart.scss';

class EmojiBarChart extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func,
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
    if (!this.props.topic) {
      return;
    }
    this.update();
    twemoji.parse(this.root, icon => emojiSVGUrl(icon));
  }

  /**
   * When the react component updates, update the d3 vis
   */
  componentDidUpdate() {
    if (!this.props.topic) {
      return;
    }
    this.update();
    twemoji.parse(this.root, icon => emojiSVGUrl(icon));
  }

  update() {
    const { emoji, onSelect } = this.props;

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
      .data(emoji, d => `${d.id}-${d.count}`);

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

    // 2. emoji
    entering.append('div')
      .classed('emoji', true)
      .text(d => d.value)
      .style('opacity', 0);

    // 3. label
    entering.append('div')
      .classed('label', true);

    // on update, animate bars up
    const mergedSelection = entering.merge(binding);

    // Click handlers
    mergedSelection
      .classed('enabled', d => !!d.count)
      .on('click', (d) => {
        if (d.count) {
          onSelect(d.id);
        }
      });

    // 1. animate bars
    mergedSelection
      .selectAll('div.inner-bar')
        .transition()
        .delay((d, i) => i * 25)
          .style('top', d => `${maxBarHeight - heightScale(d.count)}px`);

    // 2. animate emoji opacity
    mergedSelection
      .selectAll('div.emoji')
        .transition()
        .delay((d, i) => i * 100)
          .style('opacity', d => opacityScale(d.count / sumValues));

    // 3. update label
    mergedSelection
      .selectAll('.label')
      .text(d => `${d3.format('.0%')(d.count / sumValues)}`);

    // on exit, transition out.
    binding.exit().remove();
  }

  render() {
    const { topic } = this.props;

    if (!topic) {
      return null;
    }

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
