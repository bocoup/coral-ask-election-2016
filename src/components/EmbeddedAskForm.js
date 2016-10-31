import React, { Component, PropTypes } from 'react';

import './EmbeddedAskForm.scss';

export default class EmojiBarChart extends Component {
  static propTypes = {
    formScript: PropTypes.string
  }

  componentDidMount() {
    this.injectScript();
  }

  shouldComponentUpdate() {
    // Never re-render, it would clobber the embedded form!
    return false;
  }

  injectScript() {
    const { formScript } = this.props;

    // Inspired by Google Analytics' script injection code:
    // Use a pre-existing script tag as the model for the one we will insert
    const scriptTag = document.getElementsByTagName('script')[0];

    // Should this be run twice, do nothing
    if (document.getElementById('ask-form-script')) {
      return;
    }
    const js = document.createElement('script');
    js.id = 'ask-form-script';
    js.onload = () => this.formLoaded();
    js.src = formScript;
    scriptTag.parentNode.insertBefore(js, scriptTag);
  }

  formLoaded() {
    // Ensure form starts out closed
    this.closeForm();
  }

  closeForm() {
    const formHeader = this.askForm.querySelector('header');
    if (!formHeader) {
      throw new Error('Form has not loaded! Something has gone wrong');
    }
    const boundingRect = formHeader.getBoundingClientRect();

    // Collapse form container to show only the header
    this.askForm.style.maxHeight = `${boundingRect.height}px`;

    // Remove the "open" class, which display: none's form contents SCSS-side
    this.formContainer.classList.remove('open');

    this.button.innerText = 'Tell the president-elect what you think';
  }

  openForm() {
    this.formContainer.classList.add('open');
    this.askForm.style.maxHeight = '10000px';

    this.button.innerText = 'Don\'t submit, close form';
  }

  toggleForm() {
    const isOpen = this.formContainer.classList.contains('open');
    if (isOpen) {
      this.closeForm();
    } else {
      this.openForm();
    }
  }

  render() {
    return (
      <div className="form-container" ref={(node) => { this.formContainer = node; }}>
        <div
          id="ask-form"
          className="embedded-form"
          ref={(node) => { this.askForm = node; }}
        />
        <button
          className="form-toggle-button"
          type="button"
          onClick={() => this.toggleForm()}
          ref={(node) => { this.button = node; }}
        >
          Tell the president-elect what you think
        </button>
      </div>
    );
  }
}
