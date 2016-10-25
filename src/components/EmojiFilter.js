import React, { PropTypes } from 'react';

import './EmojiFilter.scss';

function EmojiFilter(props) {
  const { emoji, onSelect } = props;
  if (!emoji) {
    return null;
  }
  const emojiList = emoji;
  return (
    <div className="filter">
      {emojiList.map(emoji => (
        <button key={emoji.id} type="button" onClick={() => onSelect(emoji.id)}>{emoji.answer}</button>
      ))}
    </div>
  );
}

EmojiFilter.propTypes = {
  onSelect: PropTypes.func,
  emoji: PropTypes.array
};

export default EmojiFilter;
