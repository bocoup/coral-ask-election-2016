import React, { PureComponent, PropTypes } from 'react';
import addComputedProps from 'react-computed-props';
import d3 from '../d3';

import { inlineEmoji } from '../utils/emoji';

import './EmojiBubbleChart.scss';

const computeProps = (props) => {
  const { emoji, maxRadius, minRadius } = props;

  if (!emoji || !emoji.length) {
    return {};
  }

  const sizeScale = d3.scaleSqrt()
    .range([minRadius, maxRadius])
    .domain(d3.extent(emoji, d => d.count));

  const emojiTree = [{
    parent: '',
    name: 'root'
  }].concat(emoji.map(emojiGroup => ({
    id: emojiGroup.id,
    parent: 'root',
    name: emojiGroup.answer,
    val: sizeScale(emojiGroup.count)
  })));

  return {
    emojiTree
  };
};

class EmojiBubbleChart extends PureComponent {
  static propTypes = {
    emoji: PropTypes.array,
    emojiTree: PropTypes.array,
    selectedEmoji: PropTypes.object,
    onSelect: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    maxRadius: PropTypes.number,
    minRadius: PropTypes.number
  }

  static defaultProps = {
    maxRadius: 70,
    minRadius: 20
  }

  render() {
    const {
      emojiTree,
      onSelect,
      selectedEmoji,
      width,
      height
    } = this.props;

    if (!emojiTree) {
      return null;
    }

    const w = this.props.width;
    const h = this.props.height;

    const pack = d3.pack()
      .size([w, h])
      .padding(5);

    const root = d3.stratify()
      .id(d => d.name)
      .parentId(d => d.parent)(emojiTree)
      // use the value to render items
      .sum(d => d.val);

    pack(root);

    const scaler = 1.5;
    const sumValues = d3.sum(root.children, d => d.value);

    // .id in root.children is the emoji itself: This maps back to Ask's
    // answer ID value, from the original emoji tree
    const getEmojiId = (emoji) => {
      const match = emojiTree.find(e => e.name === emoji);
      return match && match.id;
    };

    const chartStyle = {
      width: '100%',
      paddingBottom: `${((height / width) * 100).toFixed(4)}%`
    };

    return (
      <div className="emojis-bubble-chart" style={chartStyle}>
        {root.children.map((d) => {
          const wPct = val => `${(val / width) * 100}%`;
          const hPct = val => `${(val / height) * 100}%`;
          const containerStyle = {
            top: hPct(d.y - ((d.r * scaler) / 2)),
            left: wPct(d.x - ((d.r * scaler) / 2)),
            width: wPct(d.r * scaler),
            height: hPct(d.r * scaler)
          };
          const percent = d3.format('0.0%')(d.value / sumValues);
          const id = getEmojiId(d.id);
          const isSelected = selectedEmoji && (id === selectedEmoji.id);
          const classNames = isSelected ?
            'emoji-container selected' :
            'emoji-container';
          const onClick = () => onSelect(id);

          return (
            <button
              type="button"
              className={classNames}
              key={`bubble${id}`}
              onClick={onClick}
              aria-pressed={isSelected}
              style={containerStyle}
            >
              {inlineEmoji(d.id, {
                className: 'emoji-image'
              })}
              <span className="emoji-label">{percent}</span>
            </button>
          );
        })}
      </div>
    );
  }
}

export default addComputedProps(computeProps, {
  changeInclude: ['emoji', 'minRadius', 'maxRadius']
})(EmojiBubbleChart);
