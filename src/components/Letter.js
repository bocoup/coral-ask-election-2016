import React, { PropTypes, PureComponent } from 'react';
import twemoji from 'twemoji';
import GoogleSheetFieldComponent from '../containers/GoogleSheetFieldComponent';
import { emojiSVGUrl } from '../utils/emoji';

import './Letter.scss';

class Letter extends PureComponent {
  static propTypes = {
    buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    buttonDisabled: PropTypes.bool,
    showMore: PropTypes.func,
    questionsOrder: PropTypes.array,
    response: PropTypes.object
  };

  static defaultProps = {
    responses: []
  };

  componentDidMount() {
    this.parseEmoji();
  }

  shouldComponentUpdate(nextProps) {
    // Only re-render when a response is available; this prevents the component
    // from emptying out when loading data (causing a flash of missing content)
    return !!nextProps.response;
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
    const {
      response,
      questionsOrder,
      showMore,
      buttonDisabled,
      buttonText
    } = this.props;

    if (!response) {
      return null;
    }

    // Helper method to treat the question ordering like array indexes
    const responseField = idx => response[questionsOrder[idx]] || {};

    return (
      <div className="letter">

        <div className="letter-content" ref={(node) => { this.root = node; }}>
          <GoogleSheetFieldComponent
            fieldId={'elc-text-letter-template'}
            defaultValue={`<p>
                Dear [Secretary Clinton/Mr. Trump],
              </p>
              <p>
                As you prepare to become president I am feeling <span className='emoji'>
                  ${responseField(0)}
                </span>.
                I think your top priority should be <span className='achieve'>
                  {responseField(1)}
                </span>.
              </p>
              <p>
                If you achieve one thing in the next four years, I want it to
                be: <span className='achieve'>
                  ${responseField(2)}
                </span>.
              </p>
              <p>
                Thank you and good luck. <br /> ${responseField(3)}, ${responseField(4)}
              </p>`}
            isTemplate
            templateValues={[responseField(0), responseField(1),
                responseField(2), responseField(3), responseField(4)]}
          />

        </div>

        <button
          type="button"
          className="btn"
          onClick={() => showMore()}
          disabled={buttonDisabled}
        >
          {buttonText}
        </button>

      </div>
    );
  }
}

export default Letter;
