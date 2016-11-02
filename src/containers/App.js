import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import EmbeddedAskForm from '../components/EmbeddedAskForm';
import FilterByEmojiVis from './FilterByEmojiVis';
import FilterByTopicVis from './FilterByTopicVis';
import Footer from '../components/Footer';

import getConfig from '../config';

// import ShortAnswerList from '../components/ShortAnswerList';

import { fetchFormDigestIfNeeded, showForm, hideForm } from '../state/actions';

// Assign value once config loads
let formScript;
getConfig.then(config => (formScript = config.formScript));

function mapStateToProps(state) {
  return {
    formVisible: state.form.formVisible
  };
}

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    formVisible: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.handleFormVisibilityChange = this.handleFormVisibilityChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchFormDigestIfNeeded());
  }

  handleFormVisibilityChange(visible) {
    const { dispatch } = this.props;
    if (visible) {
      dispatch(showForm());
    } else {
      dispatch(hideForm());
    }
  }

  render() {
    const { formVisible } = this.props;

    return (
      <div className="App" ref={(node) => { this.root = node; }}>

        <EmbeddedAskForm
          formVisible={formVisible}
          onChangeFormVisibility={this.handleFormVisibilityChange}
          formScript={formScript}
        />

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
export default connect(mapStateToProps)(App);
