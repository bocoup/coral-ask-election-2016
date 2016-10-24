/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent, PropTypes } from 'react';
import addComputedProps from 'react-computed-props';
import twemoji from 'twemoji';
import d3 from '../d3';
import { emojiSVGUrl } from '../utils/emoji';

import './EmojiGrid.scss';

const computeProps = (props) => {
  const { responses, rows } = props;

  return {
    responses,
    rows
  };
};

class EmojiGrid extends PureComponent {
  static propTypes = {
    responses: PropTypes.array,
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
    let { responses } = this.props;

    // MOCK DATA
    responses = [
      { id: '134', answer: '😏' },
      { id: 'abcd5437', answer: '😪' },
      { id: 'abcd437', answer: '😪' },
      { id: 'abd25437', answer: '😳' },
      { id: 'awed25437', answer: '😳' },
      { id: 'abcgr437', answer: '😀' },
      { id: 'eef35437', answer: '😪' },
      { id: 'abcd527', answer: '😳' },
      { id: 'arrr437', answer: '😪' },
      { id: 'abcdaaa437', answer: '😪' },
      { id: 'abbbb37', answer: '🇺🇸' },
      { id: '24td5437', answer: '🇺🇸' },
      { id: 'aadt25437', answer: '😀' },
      { id: 'amml25437', answer: '🇺🇸' },
      { id: 'abcd2ssss', answer: '😪' },
      { id: 'abffdd', answer: '😏' },
      { id: 'abf1', answer: '😪' }
    ];

    if (!responses) {
      return;
    }
    const parent = d3.select(this.root);

    const chart = parent.append('div')
      .classed('emoji-grid-container', true);

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
      .delay((d, i) => i * 50)
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
          style={{
            position: 'relative',
            border: '1px solid blue',
            width: `${width}px`,
            height: `${height}px`
          }}
          ref={(node) => { this.root = node; }}
        />
      </div>
    );
  }
}

export default addComputedProps(computeProps, {
  changeInclude: ['responses', 'rows']
})(EmojiGrid);
