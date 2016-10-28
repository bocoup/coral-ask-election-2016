import React, { PropTypes, PureComponent } from 'react';
import twemoji from 'twemoji';
import { emojiSVGUrl } from '../utils/emoji';

import './Letter.scss';

class Letter extends PureComponent {
  static propTypes = {
    questionsOrder: PropTypes.array,
    responses: PropTypes.array
  };

  static defaultProps = {
    responses: []
  };

  componentDidMount() {
    this.parseEmoji();
  }

  componentDidUpdate() {
    this.parseEmoji();
  }

  parseEmoji() {
    if (this.root) {
      twemoji.parse(this.root, icon => emojiSVGUrl(icon));
    }
  }

  render() {
    const { responses, questionsOrder } = this.props;

    const response = responses[Math.floor(Math.random(responses.length))];

    if (!response) {
      return null;
    }

    // Helper method to treat the question ordering like array indexes
    const responseField = idx => response[questionsOrder[idx]] || {};

    return (
      <div className={'letter'}>
        <div ref={(node) => { this.root = node; }}>
          <p>
            Dear [Secretary Clinton/Mr. Trump],
          </p>

          <p>
            As you prepare to become president I am feeling <span className="emoji">
              {responseField(0)}
            </span>.
            I think your top priority should be <span className="achieve">
              {responseField(1)}
            </span>.
          </p>
          <p>
            If you achieve one thing in the next four years, I want it to
            be: <span className="achieve">
              {responseField(2)}
            </span>.
          </p>

          <p>
            Thank you and good luck. <br /> {responseField(3)}, {responseField(4)}
          </p>
        </div>
      </div>
    );
  }
}

export default Letter;
