import React, { PureComponent, PropTypes } from 'react';
import d3 from '../d3';

// import './AxisTooltip.scss';

const randSize = (min, max) => Math.floor(Math.random() * max) + min;

export default class EmojiBubbleChart extends PureComponent {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number
  }

  static defaultProps = {
    max: 80,
    min: 10
  }

  /**
   * When the react component mounts, setup the d3 vis
   */
  componentDidMount() {
    this.setup();
  }

  /**
   * When the react component updates, update the d3 vis
   */
  componentDidUpdate() {
    // this.update();
  }

  /**
   * Initialize the d3 chart - this is run once on mount
   */
  setup() {
    const {
      min,
      max
    } = this.props;

    const w = this.props.width;
    const h = this.props.height;

    const emojiArr = {
      tree: [
        {
          parent: '',
          name: 'root'
        },
        {
          parent: 'root',
          name: '😀',
          val: randSize(min, max)
        },
        {
          parent: 'root',
          name: '😐',
          val: randSize(min, max)
        },
        {
          parent: 'root',
          name: '😏',
          val: randSize(min, max)
        },
        {
          parent: 'root',
          name: '😥',
          val: randSize(min, max)
        },
        {
          parent: 'root',
          name: '😮',
          val: randSize(min, max)
        },
        {
          parent: 'root',
          name: '😱',
          val: randSize(min, max)
        },
        {
          parent: 'root',
          name: '😡',
          val: randSize(min, max)
        },
        {
          parent: 'root',
          name: '😬',
          val: randSize(min, max)
        },
        {
          parent: 'root',
          name: '🇺🇸',
          val: randSize(min, max)
        }
      ]
    };

    const pack = d3.pack()
      .size([w - 2, h - 2])
      .padding(3);

    const root = d3.stratify()
      .id(d => d.name)
      .parentId(d => d.parent)(emojiArr.tree)
      // use the value to render items
      .sum(d => d.val);

    pack(root);

    const fontFamily = [
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'NotoColorEmoji',
      'Segoe UI Symbol',
      'Android Emoji',
      'EmojiSymbols'
    ].join();

    const ctx = d3.select(this.root).node().getContext('2d');

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
      ctx.strokeStyle = '#003300';
      ctx.stroke();
    });

    // var fontFamily = ''Apple Color Emoji','Segoe UI Emoji','NotoColorEmoji','Segoe UI Symbol','Android Emoji','EmojiSymbols'';
    // var ctx = d3.select('.emojis').node().getContext('2d');
    // emojiArr.forEach(function(d) {
    //   var size = Math.floor(Math.random() * 40) + 20;
    //   inc += size;
    //   ctx.font = size + 'px ' + fontFamily;
    //   ctx.fillText(d, prev, h/2);
    //   prev = inc;
    // });
  }

  render() {
    const {
      width,
      height
    } = this.props;

    return (
      <canvas
        width={width}
        height={height}
        ref={(node) => { this.root = node; }}
      />
    );
  }
}
