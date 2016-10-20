import React, { PropTypes } from 'react';

import './EmojiFilter.scss';

function EmojiFilter(props) {
  const { emoji, onSelect } = props;
  const emojiList = emoji && emoji.map(emojiGroup => emojiGroup.emoji);
  return (
    <div className="filter">
      {emojiList.map(emoji => (
        <button key={emoji} type="button" onClick={() => onSelect(emoji)}>{emoji}</button>
      ))}
    </div>
  );
}

EmojiFilter.propTypes = {
  onSelect: PropTypes.func,
  emoji: PropTypes.array
};

export default EmojiFilter;
