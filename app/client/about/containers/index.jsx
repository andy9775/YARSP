import React, { PropTypes } from 'react';

const AboutContainer = props => (
  <div className="about-container">
    {props.children}
  </div>
);

AboutContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AboutContainer;
