import React, { PropTypes } from 'react';

const RootContainer = props => (
  <div className="root-container">
    {props.children}
  </div>
);

RootContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default RootContainer;
