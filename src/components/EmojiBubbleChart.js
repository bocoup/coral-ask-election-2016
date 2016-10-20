/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent, PropTypes } from 'react';
import addComputedProps from 'react-computed-props';
import twemoji from 'twemoji';
import d3 from '../d3';

import './EmojiBubbleChart.scss';

// import log from '../utils/log';

const computeProps = (props) => {
  const { emoji, maxRadius, minRadius } = props;

  const sizeScale = d3.scaleSqrt()
    .range([minRadius, maxRadius])
    .domain(d3.extent(emoji, d => d.count));

  const emojiTree = emoji && emoji.reduce((tree, emojiGroup) => tree.concat({
    parent: 'root',
    name: emojiGroup.emoji,
    val: sizeScale(emojiGroup.count)
  }), [{
    parent: '',
    name: 'root'
  }]);

  return {
    emojiTree
  };
};

class EmojiBubbleChart extends PureComponent {

  static propTypes = {
    emoji: PropTypes.array,
    emojiTree: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    maxRadius: PropTypes.number,
    minRadius: PropTypes.number
  }

  static defaultProps = {
    maxRadius: 60,
    minRadius: 20
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
  }

  /**
   * Initialize the d3 chart - this is run once on mount
   */
  update() {
    const { emojiTree } = this.props;

    if (!emojiTree) {
      return;
    }
    const parent = d3.select(this.root);

    const w = this.props.width;
    const h = this.props.height;

    const pack = d3.pack()
      .size([w - 2, h - 2])
      .padding(3);

    const root = d3.stratify()
      .id(d => d.name)
      .parentId(d => d.parent)(emojiTree)
      // use the value to render items
      .sum(d => d.val);

    pack(root);

    const scaler = 1.5;
    const sumValues = d3.sum(root.children, d => d.value);

    // == render emoji ==
    const emojiBinding = parent.selectAll('div.emoji')
      .data(root.children, d => d.id);

    const enteringEmoji = emojiBinding.enter()
      .append('div')
      .classed('emoji', true)
      .text(d => d.id)
      .style('top', d => `${d.y}px`)
      .style('left', d => `${d.x}px`)
      .style('width', '0px')
      .style('height', '0px');

    enteringEmoji.merge(emojiBinding)
      .each(function renderEmoji() {
        twemoji.parse(this, {
          folder: 'svg', ext: '.svg'
        });
        return this;
      })
      .transition()
        .delay((d, i) => i * 100)
        .style('top', d => `${d.y - ((d.r * scaler) / 2)}px`)
        .style('left', d => `${d.x - ((d.r * scaler) / 2)}px`)
        .style('width', d => `${d.r * scaler}px`)
        .style('height', d => `${d.r * scaler}px`);

    emojiBinding.exit()
      .transition()
      .style('width', '0px')
      .style('height', '0px')
      .remove();

    // render labels
    const labelBinding = parent.selectAll('div.emoji-label')
      .data(root.children, d => d.id);

    const labelEntering = labelBinding.enter()
      .append('div')
      .classed('emoji-label', true)
      .text(d => d3.format('0.0%')(d.value / sumValues))
      .style('top', d => `${d.y}px`)
      .style('left', d => `${d.x}px`)
      .style('width', '0px')
      .style('opacity', 0);

    labelBinding.merge(labelEntering)
      .transition()
      .delay((d, i) => i * 100)
        .style('top', d => `${d.y + ((d.r * scaler) / 2)}px`)
        .style('left', d => `${d.x - ((d.r * scaler) / 2)}px`)
        .style('opacity', 1)
        .style('width', d => `${d.r * scaler}px`);

    labelBinding.exit()
      .transition()
      .style('width', '0px')
      .style('opacity', '0px');
  }

  render() {
    const {
      // emojiTree,
      width,
      height
    } = this.props;

    // const emojiSvgs = emojiTree
    //   .map(e => e.name !== 'root' && twemoji.parse(e.name, {
    //     folder: 'svg',
    //     ext: '.svg'
    //   }));

    return (
      <div className={'emojis-bubble-chart'}>
        {/* emojiSvgs.map(imgTag => imgTag && <div key={imgTag} dangerouslySetInnerHTML={{ __html: imgTag }} />) */}
        <div
          style={{
            position: 'relative',
            border: '1px solid red',
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
  changeInclude: ['emoji', 'minRadius', 'maxRadius']
})(EmojiBubbleChart);
