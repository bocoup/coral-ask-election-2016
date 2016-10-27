import React, { PropTypes } from 'react';

/* eslint-disable react/no-danger */
const DangerousInline = ({ html, ...props }) => (
  <span {...props} dangerouslySetInnerHTML={{ __html: html }} />
);
/* eslint-enable react/no-danger */

DangerousInline.propTypes = {
  html: PropTypes.string.isRequired
};

export default DangerousInline;
