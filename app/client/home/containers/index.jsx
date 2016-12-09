import React, { PropTypes } from 'react';

const HomeContainer = props => (
  <div className="home-container">
    {props.children}
  </div>
);

HomeContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default HomeContainer;
