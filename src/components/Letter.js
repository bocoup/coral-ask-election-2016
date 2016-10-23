import React, { PropTypes, PureComponent } from 'react';
import twemoji from 'twemoji';
import { emojiSVGUrl } from '../utils/emoji';

import './Letter.scss';

class Letter extends PureComponent {
  static propTypes = {
    response: PropTypes.array,
    width: PropTypes.number
  };

  static defaultProps = {
    response: {}
  };

  componentDidMount() {
    twemoji.parse(this.root, icon => emojiSVGUrl(icon));
  }

  render() {
    let { response } = this.props;
    const { width } = this.props;

    // order significant!
    response = [
      { id: 'abc', answer: '😡' },
      { id: 'wetwet', answer: 'Health Care' },
      { id: '325jkhet', answer: 'Lowering the cost of healthcare for everyone' },
      { id: 'ewtwg', answer: 'Irene' },
      { id: 'wetywy', answer: 'Boston' }
    ];

    return (
      <div className={'letter'}>
        <div
          style={{
            position: 'relative',
            width: `${width}px`
          }}
          ref={(node) => { this.root = node; }}
        >
          <p>
            Dear [Secretary Clinton/Mr. Trump],
          </p>

          <p>
            As you prepare to become president I am feeling <span className="emoji">{response[0].answer}</span>.
            I think your top priority should be <span className="achieve">{response[1].answer}</span>.
          </p>
          <p>
            If you achieve one thing in the next four years, I want it to
            be: <span className="achieve">{response[2].answer}</span>.
          </p>

          <p>
            Thank you and good luck. <br />
            {response[3].answer}, {response[4].answer}
          </p>
        </div>
      </div>
    );
  }
}

export default Letter;
