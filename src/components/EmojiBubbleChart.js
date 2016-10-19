/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent, PropTypes } from 'react';
import addComputedProps from 'react-computed-props';
import twemoji from 'twemoji';
import d3 from '../d3';

import log from '../utils/log';

const fontFamily = [
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'NotoColorEmoji',
  'Segoe UI Symbol',
  'Android Emoji',
  'EmojiSymbols'
].join();

const computeProps = (props) => {
  const { emoji, min, max } = props;

  const sizeScale = d3.scaleSqrt()
    .range([min, max])
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
    max: PropTypes.number,
    min: PropTypes.number
  }

  static defaultProps = {
    max: 200,
    min: 20
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

    const w = this.props.width;
    const h = this.props.height;

    emojiTree.forEach((e) => {
      if (e.name !== 'root') {
        log(twemoji.parse(e.name, {
          size: e.val
        }));
      }
    });

    const pack = d3.pack()
      .size([w - 2, h - 2])
      .padding(3);

    const root = d3.stratify()
      .id(d => d.name)
      .parentId(d => d.parent)(emojiTree)
      // use the value to render items
      .sum(d => d.val);

    pack(root);

    const ctx = d3.select(this.root).node().getContext('2d');
    ctx.clearRect(0, 0, w, h);

    root.children.forEach((d) => {
      // actual emoji rendering
      // these multipliers are totally arbitrary and render differently
      // on the browser vs mobile devices. I figured it was a good start
      // but we probably need to come up with a more stable way to
      // render these.
      const mult = 1.9;
      ctx.font = `${(d.r * mult)}px ${fontFamily}`;
      ctx.fillText(d.id, d.x - (d.r - (d.r * 0.05)), d.y + (d.r - (d.r * 0.2)));

      // test circles (to try and figure out what the right emoji font size
      // to radius ratio should be... this feels a bit fragile to me.)
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(0, 10, 0, 0.3)';
      ctx.stroke();
    });
  }

  render() {
    const {
      width,
      height
    } = this.props;

    return (
      <canvas
        style={{
          border: '1px solid black'
        }}
        width={width}
        height={height}
        ref={(node) => { this.root = node; }}
      />
    );
  }
}

export default addComputedProps(computeProps, {
  changeInclude: ['emoji', 'min', 'max']
})(EmojiBubbleChart);
