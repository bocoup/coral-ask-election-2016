import React from 'react';
import twemoji from 'twemoji';

const emojiSVGs = require.context('../assets/twemoji');

export const emojiSVGUrl = (emojiUnicode) => {
  const filename = `${emojiUnicode}.svg`;
  let emojiUrl;
  try {
    emojiUrl = emojiSVGs(`./${filename}`);
  } catch (e) {
    // this really shouldn't happen... we should have all
    // emoji, but if we we don't, we should probably
    // catch that here with some default. TODO.
  }
  return emojiUrl;
};

export const emojiSVGImageTag = emojiUnicode => twemoji
  .parse(emojiUnicode, icon => emojiSVGUrl(icon));

export const inlineEmoji = (emojiUnicode, props) => {
  if (!emojiUnicode) {
    return null;
  }

  const html = {
    __html: emojiSVGImageTag(emojiUnicode)
  };

  /* eslint-disable react/no-danger */
  return (
    <span {...props} dangerouslySetInnerHTML={html} />
  );
  /* eslint-enable react/no-danger */
};
