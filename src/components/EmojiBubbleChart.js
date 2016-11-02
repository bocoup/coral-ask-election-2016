import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
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

  componentDidMount() {
    // Helper dictionary to clunkily use for pop-in transitions
    this.renderedKeys = {};
  }

  componentDidUpdate() {
    const containers = d3.selectAll('.emoji-container.hidden');
    const count = containers.size();

    if (count) {
      // Defer the entire pop-in process 100ms to try to side-step thrash on
      // initial page load & render
      setTimeout(() => {
        // Items come in at 100ms increments
        const delay = 100;

        // The pop-in animation lasts 550ms (Keep synchronized with .pop-in
        // transition timing in CSS)
        const transitionSpeed = 550;

        containers.each(function staggeredPopIn(d, i) {
          const container = this;
          // Remove hidden class to pop-in reveal
          setTimeout(() => container.classList.remove('hidden'), i * delay);
        });

        // Remove .pop-in classes once all elements visible;
        const popInComplete = (count * delay) + transitionSpeed;
        setTimeout(() => d3.selectAll('.pop-in').classed('pop-in', false), popInComplete);
      }, 100);
    }
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
      paddingBottom: `${((height / width) * 100).toFixed(4)}%`
    };

    // Helper methods for calculating percentage positions
    const wPct = val => `${(val / width) * 100}%`;
    const hPct = val => `${(val / height) * 100}%`;

    return (
      <div className={'emojis-bubble-chart'}>

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

        <div className="emojis-group-container" style={chartStyle}>
          {root.children.map((d) => {
            const containerStyle = {
              top: hPct(d.y - ((d.r * scaler) / 2)),
              left: wPct(d.x - ((d.r * scaler) / 2)),
              width: wPct(d.r * scaler),
              height: hPct(d.r * scaler)
            };
            const percent = d3.format('0.0%')(d.value / sumValues);
            const id = getEmojiId(d.id);
            const isSelected = selectedEmoji && (id === selectedEmoji.id);
            const key = `bubble${id}`;

            const classes = classNames('emoji-container', {
              selected: isSelected,
              // Give newly-rendered items the "hidden" and "pop-in" classes
              hidden: !this.renderedKeys[key],
              'pop-in': !this.renderedKeys[key]
            });
            // Set the rendered flag so they don't pop-in again
            if (!this.renderedKeys[key]) {
              this.renderedKeys[key] = true;
            }

            return (
              <button
                type="button"
                className={classes}
                key={key}
                onClick={() => onSelect(id)}
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
