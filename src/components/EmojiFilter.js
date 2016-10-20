import React, { PropTypes } from 'react';

import './EmojiFilter.scss';

function EmojiFilter(props) {
  const { emoji } = props;
  const emojiList = emoji && emoji.map(emojiGroup => emojiGroup.emoji);
  return (
    <div className="filter">
      {emojiList.map(emoji => (
        <button type="button">{emoji}</button>
      ))}
    </div>
  );
}

EmojiFilter.propTypes = {
  // onClick: PropTypes.func,
  emoji: PropTypes.array
};

export default EmojiFilter;
