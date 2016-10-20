import React, { PropTypes } from 'react';

import log from '../utils/log';

function ShortAnswerList(props) {
  const { selectedEmoji } = props;

  log(selectedEmoji);

  // const emojiList = emoji && emoji.map(emojiGroup => emojiGroup.emoji);
  return (
    <div className="short-answer-list">
      {selectedEmoji.map((emojiGroup, idx) => (
        <div key={`${emojiGroup.emoji}${idx}`}>
          {emojiGroup.text.map(textResponses => textResponses.answers.map(answer => (
            <p key={answer}>{answer}</p>
          )))}
        </div>
      ))}
    </div>
  );
}

ShortAnswerList.propTypes = {
  selectedEmoji: PropTypes.array
};

export default ShortAnswerList;
