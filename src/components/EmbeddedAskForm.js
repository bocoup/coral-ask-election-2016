import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import twemoji from 'twemoji';

import GoogleSheetFieldComponent from '../containers/GoogleSheetFieldComponent';
import { emojiSVGUrl } from '../utils/emoji';
import './EmbeddedAskForm.scss';
import d3 from '../d3';

/**
 * Component that injects the ask-form script tag and renders it with
 * an open/close toggle. Text for the toggle comes from the google sheet.
 */
export default class EmbeddedAskForm extends Component {
  static propTypes = {
    formScript: PropTypes.string
  }

  constructor(props) {
    super(props);

    // start with the form closed.
    this.state = {
      open: false,
      scriptInjected: false
    };

    if (document.getElementById('ask-form-script')) {
      // if this runs we're in trouble since the script seems to rely on #ask-form
      // already being on the page. Simple fix is probably to just include it again.
      this.state.scriptInjected = true;
    }
  }

  /**
   * On mount, inject the script if it isn't already there.
   */
  componentDidMount() {
    if (!this.state.scriptInjected) {
      this.injectScript();
    }
    this.addRerenderTwemojiFix();
  }

  /**
   * On state change, ensure that the answers have their twemoji fix
   */
  componentDidUpdate() {
    this.addRerenderTwemojiFix();
  }

  /**
   * Get the button text based on the state of the form
   */
  getButtonText() {
    const { open } = this.state;
    let fieldId;
    let defaultValue;

    if (open) {
      fieldId = 'elc-text-button-close-form';
      defaultValue = 'Don\'t submit, close form';
    } else {
      fieldId = 'elc-text-button-open-form';
      defaultValue = 'Tell the president-elect what you think';
    }

    return <GoogleSheetFieldComponent fieldId={fieldId} defaultValue={defaultValue} />;
  }

  /**
   * Inject the <script> tag for the ask-form
   */
  injectScript() {
    const { formScript } = this.props;

    // Inspired by Google Analytics' script injection code:
    // Use a pre-existing script tag as the model for the one we will insert
    const firstScriptTag = document.getElementsByTagName('script')[0];

    // Should this be run twice, do nothing
    if (document.getElementById('ask-form-script')) {
      return;
    }

    // create the script tag and set state when it is added
    const scriptTag = document.createElement('script');
    scriptTag.id = 'ask-form-script';
    scriptTag.onload = () => this.setState({ scriptInjected: true });
    scriptTag.src = formScript;
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
  }

  /**
   * Add click handlers to each of the answers to re-render the emojis as twemoji
   * Should be run after the form has been rendered.
   */
  addRerenderTwemojiFix() {
    // bind events to labels
    const allLabels = d3.select(this.formContainer)
      .selectAll('label');

    // re-emojify all nodes
    allLabels.nodes().forEach((node) => {
      twemoji.parse(node, icon => emojiSVGUrl(icon));
    });

    // also re-emojify on click
    allLabels.on('click', () => {
      // re-emojify all nodes
      allLabels.nodes().forEach((node) => {
        twemoji.parse(node, icon => emojiSVGUrl(icon));
      });
    });
  }

  /**
   * Callback to handle toggling the form open or close by setting state
   */
  toggleForm() {
    this.setState({ open: !this.state.open });
  }

  /**
   * Main render function that draws the form
   */
  render() {
    const { open } = this.state;

    // form should be loaded closed.
    // after the script tag has come in, make sure the ask-form has the right
    return (
      <div
        className={classNames('form-container', { open })}
        ref={(node) => { this.formContainer = node; }}
      >
        <div id="ask-form"className="embedded-form" />
        <div className="form-toggle-button-container">
          <button
            className="btn form-toggle-button"
            type="button"
            onClick={() => this.toggleForm()}
          >
            {this.getButtonText()}
          </button>
        </div>
      </div>
    );
  }
}
