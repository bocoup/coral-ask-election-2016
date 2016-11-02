import React, { PureComponent, PropTypes } from 'react';
import template from 'string-template';
import { connect } from 'react-redux';
import twemoji from 'twemoji';
import { emojiSVGUrl } from '../utils/emoji';
import fieldValue from '../utils/fields';
import DangerousBlock from '../components/DangerousBlock';

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
    fieldId: PropTypes.string,
    isTemplate: PropTypes.bool,
    templateValues: PropTypes.array
  }

  static defaultProps = {
    defaultValue: '',
    isTemplate: false,
    templateValues: []
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
    const { fields, fieldId, defaultValue, isTemplate, templateValues } = this.props;
    let content = fieldValue(fields, fieldId, defaultValue);

    if (isTemplate) {
      content = template(content, templateValues);
    }

    content = twemoji.parse(content, icon => emojiSVGUrl(icon));
    return (
      <DangerousBlock html={content} className="text-component" />
    );
  }
}

export default connect(mapStateToProps)(GoogleSheetFieldComponent);
