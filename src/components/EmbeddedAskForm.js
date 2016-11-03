import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import GoogleSheetFieldComponent from '../containers/GoogleSheetFieldComponent';
import { twemojifySelection } from '../utils/emoji';
import './EmbeddedAskForm.scss';
import d3 from '../d3';

/**
 * Component that injects the ask-form script tag and renders it with
 * an open/close toggle. Text for the toggle comes from the google sheet.
 */
export default class EmbeddedAskForm extends Component {
  static propTypes = {
    formScript: PropTypes.string,
    formVisible: PropTypes.bool,
    onChangeFormVisibility: PropTypes.func
  }

  constructor(props) {
    super(props);

    // start with the form closed, and wait to render the "open" button
    // until we know the form is accepting submissions.
    this.state = {
      scriptInjected: false,
      // Initialize to null so we can identify if we have set it later
      acceptingSubmissions: null,
      submitted: false
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
    this.bindToButtonSubmission();
    this.inferAcceptingSubmissionsState();
  }

  /**
   * Once the button is submitted, change the form status to
   * submitted to remove the "open form" button.
   */
  bindToButtonSubmission() {
    const button = d3.select(this.formContainer)
      .select('.submit-button');

    button.on('click', () => {
      this.setState({ submitted: true });
    });
  }

  /**
   * Once the form loads, validate that it is open for submissions
   * and set the state field as appropriate
   */
  inferAcceptingSubmissionsState() {
    const { acceptingSubmissions } = this.state;
    const formHasLoaded = !!this.formContainer.querySelector('.embedded-form div');

    // If the form has yet to load, or if we've already determined the state of
    // the form, return early so that we don't trigger recursive unnecessary renders
    // by calling setState
    if (!formHasLoaded || acceptingSubmissions !== null) {
      return;
    }

    // The presence of a submit button is a good indicator that the form is open
    const formExists = !!this.formContainer.querySelector('.submit-button');
    this.setState({ acceptingSubmissions: formExists });
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
    scriptTag.onload = () => {
      this.setState({ scriptInjected: true });
    };
    scriptTag.src = formScript;
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
  }

  /**
   * Add click handlers to each of the answers to re-render the emojis as twemoji
   * Should be run after the form has been rendered.
   */
  addRerenderTwemojiFix() {
    const root = d3.select(this.formContainer);
    // bind events to labels
    const allLabels = root.selectAll('label');

    // re-emojify all nodes
    twemojifySelection(allLabels);

    // also re-emojify on click
    allLabels.on('click', () => {
      // re-emojify all nodes
      twemojifySelection(allLabels);
    });

    // listen for blur on inputs since this causes a re-render of
    // the ask form. See https://github.com/bocoup/coral-ask-election-2016/issues/123
    root.selectAll('input').on('blur', () => {
      // re-emojify all nodes
      twemojifySelection(allLabels);
    });
  }

  /**
   * Callback to handle toggling the form open or close by setting state
   */
  toggleForm() {
    this.props.onChangeFormVisibility(!this.props.formVisible);
  }

  /**
   * Get the button text based on the state of the form
   */
  renderToggleButton() {
    const { formVisible } = this.props;
    const { submitted } = this.state;

    let fieldId;
    let defaultValue;

    // show the button only if the form hasn't been submitted yet.
    if (!submitted) {
      if (formVisible) {
        fieldId = 'elc-text-button-close-form';
        defaultValue = 'Don\'t submit, close form';
      } else {
        fieldId = 'elc-text-button-open-form';
        defaultValue = 'Tell the president-elect what you think';
      }
      return (
        <button
          className="btn form-toggle-button"
          type="button"
          onClick={() => this.toggleForm()}
        >
          <GoogleSheetFieldComponent
            fieldId={fieldId}
            defaultValue={defaultValue}
            isTemplate={false}
          />
        </button>
      );
    }
    return null;
  }

  /**
   * Main render function that draws the form
   */
  render() {
    const { formVisible } = this.props;
    const { acceptingSubmissions } = this.state;

    // form should be loaded closed.
    return (
      <div
        className={classNames('form-container', {
          'submissions-closed': !acceptingSubmissions,
          open: formVisible
        })}
        ref={(node) => { this.formContainer = node; }}
      >
        <div id="ask-form" className="embedded-form" />
        <div className="form-toggle-button-container">
          {this.renderToggleButton()}
        </div>
      </div>
    );
  }
}
