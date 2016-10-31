import React, { PureComponent } from 'react';

import twemoji from 'twemoji';
import { emojiSVGUrl } from '../utils/emoji';

import './Footer.scss';

class Footer extends PureComponent {

  componentDidMount() {
    twemoji.parse(this.root, icon => emojiSVGUrl(icon));
  }

  render() {
    return (
      <div className="footer container" ref={(node) => { this.root = node; }}>
        <div>
          Built with ❤️ by the <a href="http://bocoup.com/datavis">
            Bocoup Datavis Team
          </a> and the <a href="https://coralproject.net/">
            Coral Project
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
