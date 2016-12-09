import React, { PropTypes } from 'react';
import RootContainer from 'client/root/containers';
import { NavBar } from 'client/root/components';

const Root = props => (
  <RootContainer>
    <NavBar />
    {/* Display pages: */}
    {props.children}
  </RootContainer>
);

Root.propTypes = { children: PropTypes.element.isRequired };

export default Root;
