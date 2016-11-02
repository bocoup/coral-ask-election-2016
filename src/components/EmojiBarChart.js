import React, { PropTypes, PureComponent } from 'react';
import twemoji from 'twemoji';
import { emojiSVGUrl } from '../utils/emoji';
import d3 from '../d3';

import './EmojiBarChart.scss';

class EmojiBarChart extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func,
    selectedTopicEmoji: PropTypes.object,
    emoji: PropTypes.array,
    height: PropTypes.number,
    topic: PropTypes.object
  }

  static defaultProps = {
    height: 45,
    emoji: [],
    selectedTopicEmoji: {}
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
    const { emoji, onSelect, selectedTopicEmoji } = this.props;

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

    const binding = parent.selectAll('button.emoji-bar-container')
      .data(emoji, d => `${d.id}`);

    // add in new containers (buttons) for each emoji
    // Each emoji bar container has:
    // 1. small bar
    // 2. emoji
    // 3. label with value.

    const entering = binding.enter()
      .append('button')
      .attr('type', 'button')
      .classed('emoji-bar-container', true)
      .each(function enterButton(d) {
        const button = d3.select(this);

        // 1. bar
        button.append('div')
          .classed('bar', true)
          .style('height', `${maxBarHeight}px`)
            .append('div')
            .classed('inner-bar', true)
            .style('top', () => `${maxBarHeight}px`)
            .style('width', `${barWidth}px`)
            .style('left', `${(emojiHeight - barWidth) / 2}px`);

        // 2. emoji
        button.append('div')
          .classed('emoji', true)
          .text(d.value)
          .style('opacity', 0);

        // 3. label
        button.append('div')
          .classed('label', true);
      });


    // update the buttons for new data/animation
    binding.merge(entering).each(function updateButton(d, i) {
      const button = d3.select(this);
      const trans = d3.transition().delay(i * 25);

      // add click handlers
      button
        .classed('enabled', !!d.count)
        .attr('disabled', d.count ? null : 1)
        .on('click', () => {
          if (d.count) {
            onSelect(d.id);
          }
        });

      button.classed('selected', d => !!d.count && d.id === selectedTopicEmoji.id);

      // 1. animate bars
      button
        .select('div.inner-bar')
          .transition(trans)
            .style('top', `${maxBarHeight - heightScale(d.count)}px`);

      // 2. animate emoji opacity
      button
        .selectAll('div.emoji')
          .transition(trans)
            .style('opacity', opacityScale(d.count / sumValues));

      // 3. update label
      button
        .selectAll('.label')
        .text(`${d3.format('.0%')(d.count / sumValues)}`);
    });

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
