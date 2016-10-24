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
