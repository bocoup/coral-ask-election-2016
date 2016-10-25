/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent, PropTypes } from 'react';
import twemoji from 'twemoji';
import d3 from '../d3';
import { emojiSVGUrl } from '../utils/emoji';

import './EmojiGrid.scss';

export default class EmojiGrid extends PureComponent {
  static propTypes = {
    responses: PropTypes.array,
    questionKey: PropTypes.string,
    width: PropTypes.number,
    rows: PropTypes.number,
    height: PropTypes.number
  };

  // TODO: do we need this? not sure.
  static defaultProps = {
    rows: 4,
    responses: []
  };

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
  }

  /**
   * Initialize the d3 chart - this is run once on mount
   */
  update() {
    const { questionKey } = this.props;
    const responses = this.props.responses.map(response => ({
      answer: response[questionKey],
      id: response.id
    }));

    if (!responses || !responses.length) {
      return;
    }

    const chart = d3.select(this.chart);

    const binding = chart.selectAll('div.emoji-cell')
      .data(responses, d => d.id);

    binding.enter()
      .append('div')
      .classed('emoji-cell', true)
      .text(d => d.answer)
      .each(function renderEmoji() {
        twemoji.parse(this, icon => emojiSVGUrl(icon));
        return this;
      })
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 30)
        .style('opacity', 1);

    binding.exit()
      .transition()
      .delay((d, i) => i * 50)
      .style('opacity', 0)
      .remove();
  }

  render() {
    const {
      width,
      height
    } = this.props;

    return (
      <div className={'emoji-grid-chart'}>
        <div
          className={'emoji-grid-container'}
          style={{
            position: 'relative',
            border: '1px solid blue',
            width: `${width}px`,
            height: `${height}px`
          }}
          ref={(node) => { this.chart = node; }}
        />
      </div>
    );
  }
}
