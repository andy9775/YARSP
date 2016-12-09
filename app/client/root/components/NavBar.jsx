import React from 'react';
import NavButton from 'client/root/components/NavButton';

const NavBar = props => (
  <div className="navbar-container">
    <div className="navbar-wrapper">
      <NavButton displayName="Home"
                 linkUrl="/" />
      <NavButton displayName="Todos"
                 linkUrl="/todos" />
      <NavButton displayName="About"
                 linkUrl="/about" />
    </div>
  </div>
);

export default NavBar;
