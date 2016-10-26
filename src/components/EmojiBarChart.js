import React, { PropTypes, PureComponent } from 'react';
import twemoji from 'twemoji';
import { emojiSVGUrl } from '../utils/emoji';
import d3 from '../d3';

import './EmojiBarChart.scss';

class EmojiBarChart extends PureComponent {
  static propTypes = {
    emoji: PropTypes.array,
    height: PropTypes.number,
    topic: PropTypes.string
  }

  static defaultProps = {
    height: 50,
    emoji: []
  }

  /**
   * When the react component mounts, setup the d3 vis
   */
  componentDidMount() {
    this.update();
  }

  /**
   * When the react component updates, update the d3 vis
   */
  componentDidUpdate() {
    this.update();
    twemoji.parse(this.root, icon => emojiSVGUrl(icon));
  }

  update() {
    let { emoji } = this.props;
    // TODO: mock data, remove.
    emoji = [
      { id: '02612e1975f186b11bfb968ca2cf33bd', name: '😍', count: 20 },
      { id: '2a02eac39d716a70ecf37579185927b6', name: '😀', count: 5 },
      { id: '9f27d5a6ed65c4938ede65e536e5f6d4', name: '😐', count: 15 },
      { id: 'bd33d344f8a02afe447fdb64efa32a21', name: '😟', count: 10 },
      { id: '67ec4b5359a5d238ede933a346d04a86', name: '😡', count: 30 },
      { id: 'd1bccc85fc14440d4201e4fa2a7a88a2', name: '😳', count: 20 },
      { id: '6552ee09f5283674b630d0859b2ab68a', name: '😞', count: 14 },
      { id: '07b60a7aea9a8b1079a450cf21ab8f16', name: '🤔', count: 25 },
      { id: '86d88d9e4e39979f13b822d1643a95f4', name: '🇺🇸', count: 3 }
    ];

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
      .text(d => d.name)
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
        <p>
          People who care about
          <span className="selectedTopic"> {topic} </span>
          feel:
        </p>
        <div className="emoji-bar-wrapper" ref={(node) => { this.root = node; }}
        />
      </div>
    );
  }
}

export default EmojiBarChart;
