import React, { PureComponent, PropTypes } from 'react';
import d3 from '../d3';
import GoogleSheetFieldComponent from '../containers/GoogleSheetFieldComponent';

import { emojiSVGImageTag } from '../utils/emoji';

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

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
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
      name: emojiGroup.answer,
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

    const wPct = val => `${(val / width) * 100}%`;
    const hPct = val => `${(val / height) * 100}%`;

    const parent = d3.select(this.root);

    const binding = parent.selectAll('button.emoji-container')
      .data(root.children, d => getEmojiId(d.id));

    const entering = binding.enter()
      .append('button')

      // attributes
      .attr('type', 'button')

      // starting styles
      .style('top', d => hPct(d.y))
      .style('left', d => wPct(d.x))
      .style('width', '0px')
      .style('height', '0px')

      .html(d => emojiSVGImageTag(d.id))
      .each(function forEachEmoji(d) {
        const id = getEmojiId(d.id);
        const isSelected = selectedEmoji && (id === selectedEmoji.id);
        const classNames = isSelected ?
          'emoji-container selected' :
          'emoji-container';
        const onClick = () => onSelect(id);

        const percent = d3.format('0.0%')(d.value / sumValues);
        const button = d3.select(this)
          .attr('key', `bubble${id}`)
          .attr('aria-pressed', isSelected)
          .classed(classNames, true)
          .on('click', onClick);

        button.append('span')
          .classed('emoji-label', true)
          .text(percent)
          .style('opacity', 0);
      });

      // styles
    entering
      .transition()
      .delay((d, i) => i * 100)
      .duration(500)
      .style('top', d => hPct(d.y - ((d.r * scaler) / 2)))
      .style('left', d => wPct(d.x - ((d.r * scaler) / 2)))
      .style('width', d => wPct(d.r * scaler))
      .style('height', d => hPct(d.r * scaler))
      .on('end', function addButton() {
        d3.select(this)
          .select('.emoji-label')
          .style('opacity', 1);
      });

    return null;
  }

  render() {
    const {
      width,
      height
    } = this.props;

    const chartStyle = {
      width: '100%',
      border: '1px solid red',
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
        <div
          className="emojis-bubble-chart"
          style={chartStyle}
          ref={(node) => { this.root = node; }}
        />
      </div>
    );
  }
}
