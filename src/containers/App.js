import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GoogleSheetFieldComponent from '../containers/GoogleSheetFieldComponent';
import FilterByEmojiVis from './FilterByEmojiVis';
import FilterByTopicVis from './FilterByTopicVis';
// import ShortAnswerList from '../components/ShortAnswerList';

import { fetchFormDigestIfNeeded } from '../state/actions';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchFormDigestIfNeeded());
  }

  render() {
    return (
      <div className="App" ref={(node) => { this.root = node; }}>

        <div className={'intro-container'}>
          <div>
            <h1 className={'intro-title'}>
              <GoogleSheetFieldComponent
                fieldId={'elc-text-title'}
                defaultValue={'Word to the President'}
              />

            </h1>

            <div className={'intro-blurb'}>
              <GoogleSheetFieldComponent
                fieldId={'elc-text-intro-blurb'}
                defaultValue={'The election is over. It’s time to plan for a new administration.'}
              />
            </div>
            <button className={'btn'}>Tell the president-elect what you think</button>
          </div>
        </div>

        <div className="container">
          <FilterByEmojiVis />
          <FilterByTopicVis />
          {/* summary && <ShortAnswerList selectedEmoji={selectedEmojiGroup} /> */}
        </div>
      </div>
    );
  }
}

export default connect(() => ({}))(App);
