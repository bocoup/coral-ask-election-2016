import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import EmbeddedAskForm from '../components/EmbeddedAskForm';
import FilterByEmojiVis from './FilterByEmojiVis';
import FilterByTopicVis from './FilterByTopicVis';
import Footer from '../components/Footer';

import config from '../config';

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

        <EmbeddedAskForm formScript={config.formScript} />

        <div className="container">
          <FilterByEmojiVis />
          <FilterByTopicVis />
          {/* summary && <ShortAnswerList selectedEmoji={selectedEmojiGroup} /> */}
        </div>

        <Footer />
      </div>
    );
  }
}

// Use connect() with no argument to get props.dispatch()
export default connect()(App);
