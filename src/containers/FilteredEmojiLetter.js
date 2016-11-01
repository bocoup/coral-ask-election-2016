import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Letter from '../components/Letter';

import { emojiSVGImageTag } from '../utils/emoji';
import DangerousInline from '../components/DangerousInline';

import { showNextLetter } from '../state/actions';

import {
  getEmojiLetter,
  getQuestionsOrder,
  getResponsesList,
  getSelectedEmoji
} from '../state/selectors';

const mapStateToProps = state => ({
  currentLetter: getEmojiLetter(state),
  responses: getResponsesList(state),
  questionsOrder: getQuestionsOrder(state),
  selectedEmoji: getSelectedEmoji(state)
});

class FilteredEmojiLetter extends Component {
  static propTypes = {
    currentLetter: PropTypes.object,
    questionsOrder: PropTypes.array,
    responses: PropTypes.array,
    selectedEmoji: PropTypes.object,
    dispatch: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    const { selectedEmoji, responses } = nextProps;

    // If we don't have response data yet, or already have a selected emoji,
    // skip this step entirely
    if (!responses.length || selectedEmoji) {
      return;
    }

    // When the component has loaded but we do not yet have a selected emoji
    // for which to show responses, start out by showing a random entry from
    // the most recent responses
    this.setState({
      response: responses[Math.floor(Math.random() * responses.length)]
    });
  }

  // Helper to page through the default responses; only used if an emoji has
  // yet to be selected
  showNextLetter() {
    const { responses } = this.props;
    const { response } = this.state;
    const currentIdx = responses.indexOf(response);
    const nextIdx = currentIdx + 1;
    this.setState({
      response: responses[nextIdx] || responses[0]
    });
  }

  render() {
    const {
      currentLetter,
      questionsOrder,
      selectedEmoji,
      dispatch
    } = this.props;

    const unfilteredResponse = this.state && this.state.response;

    if (!currentLetter && !unfilteredResponse) {
      return null;
    }

    let showMoreButtonText;
    if (selectedEmoji) {
      const emojiImg = emojiSVGImageTag(selectedEmoji.value);
      showMoreButtonText = (
        <DangerousInline html={`Show another ${emojiImg} response`} />
      );
    }

    // Pivot between filtered & most recent responses
    if (selectedEmoji) {
      // If we have an emoji filter, show those letters
      return (
        <Letter
          showMore={() => dispatch(showNextLetter(selectedEmoji.id))}
          buttonText={showMoreButtonText}
          response={currentLetter}
          questionsOrder={questionsOrder}
        />
      );
    }
    // Otherwise, show most recent responses
    return (
      <Letter
        showMore={() => this.showNextLetter()}
        buttonText="Show another recent response"
        response={unfilteredResponse}
        questionsOrder={questionsOrder}
      />
    );
  }
}

export default connect(mapStateToProps)(FilteredEmojiLetter);
