import React, { PureComponent, PropTypes } from 'react';
import fieldValue from '../utils/fields';

class TextComponent extends PureComponent {
  static propTypes = {
    fields: PropTypes.object,
    fieldId: PropTypes.string,
    defaultValue: PropTypes.string
  }

  static defaultProps = {
    defaultValue: ''
  }

  render() {
    const { fields, fieldId, defaultValue } = this.props;
    const content = fieldValue(fields, fieldId, defaultValue);

    return (
      <div className={'text-component'}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default TextComponent;
