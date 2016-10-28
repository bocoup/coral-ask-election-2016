import React, { PureComponent, PropTypes } from 'react';
import d3 from '../d3';
import GoogleSheetFieldComponent from '../containers/GoogleSheetFieldComponent';

import { inlineEmoji } from '../utils/emoji';

import './EmojiBubbleChart.scss';

export default class EmojiBubbleChart extends PureComponent {
  static propTypes = {
    emoji: PropTypes.array,
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

  componentDidUpdate() {
    d3.selectAll('.emoji-container').each(function staggeredPopIn(d, i) {
      const container = d3.select(this);
      setTimeout(() => container.classed('visible', true), i * 100);
    });
  }

  render() {
    const {
      emoji,
      onSelect,
      selectedEmoji,
      maxRadius,
      minRadius,
      width,
      height
    } = this.props;

    if (!emoji || !emoji.length) {
      return null;
    }

    const sizeScale = d3.scaleSqrt()
      .range([minRadius, maxRadius])
      .domain(d3.extent(emoji, d => d.count));

    // Create the array of tree nodes to feed into D3 pack layout
    const emojiTree = [{
      parent: '',
      name: 'root'
    }].concat(emoji.map(emojiGroup => ({
      id: emojiGroup.id,
      parent: 'root',
      name: emojiGroup.value,
      val: sizeScale(emojiGroup.count)
    })));

    const root = d3.stratify()
      .id(d => d.name)
      .parentId(d => d.parent)(emojiTree)
      // use the value to render items
      .sum(d => d.val);

    const pack = d3.pack()
      .size([width, height])
      .padding(5);

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
      <div>

        <h3>
          <GoogleSheetFieldComponent
            fieldId={'elc-text-filter-by-feeling-header'}
            defaultValue={'Filter by Feelings'}
          />
        </h3>
        <GoogleSheetFieldComponent
          fieldId={'elc-text-filter-by-feeling-blurb'}
          defaultValue={'<p>Select an emoji to see related responses</p>'}
        />

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
      </div>
    );
  }
}
