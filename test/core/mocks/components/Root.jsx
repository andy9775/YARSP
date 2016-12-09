import React, { PropTypes } from 'react';

const Root = props => (
  <div>
    {props.children}
  </div>
);

Root.propTypes = { children: PropTypes.element.isRequired };

export default Root;
