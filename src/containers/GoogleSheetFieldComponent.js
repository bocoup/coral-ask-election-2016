import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import fieldValue from '../utils/fields';

import {
  fetchFieldsIfNeeded
} from '../state/actions';

import {
  getContentFieldsData
} from '../state/selectors';

const mapStateToProps = state => ({
  // google spreadsheet fields
  fields: getContentFieldsData(state)
});

/**
 * Component that renders fields from a Google Sheet
 */
class GoogleSheetFieldComponent extends PureComponent {
  static propTypes = {
    defaultValue: PropTypes.string,
    dispatch: PropTypes.func,
    fields: PropTypes.object,
    fieldId: PropTypes.string
  }

  static defaultProps = {
    defaultValue: ''
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchFieldsIfNeeded());
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    dispatch(fetchFieldsIfNeeded());
  }

  render() {
    const { fields, fieldId, defaultValue } = this.props;
    const content = fieldValue(fields, fieldId, defaultValue);

    /* eslint-disable react/no-danger */
    return (
      <div className={'text-component'}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(GoogleSheetFieldComponent);
