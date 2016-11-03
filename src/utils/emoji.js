import twemoji from 'twemoji';
import DangerousInline from '../components/DangerousInline';
import DangerousBlock from '../components/DangerousBlock';

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

  /* eslint-disable new-cap */
  return DangerousInline(Object.assign({
    html: emojiSVGImageTag(emojiUnicode)
  }, props));
  /* eslint-enable new-cap */
};

export const blockEmoji = (emojiUnicode, props) => {
  if (!emojiUnicode) {
    return null;
  }

  /* eslint-disable new-cap */
  return DangerousBlock(Object.assign({
    html: emojiSVGImageTag(emojiUnicode)
  }, props));
  /* eslint-enable new-cap */
};


/**
 * twemojifies selected nodes (typically used on answers in the ask form)
 * Takes a d3 selection (d3.selectAll() output)
 * @return {void}
 */
export function twemojifySelection(selection) {
  selection.nodes().forEach((node) => {
    twemoji.parse(node, icon => emojiSVGUrl(icon));
  });
}
