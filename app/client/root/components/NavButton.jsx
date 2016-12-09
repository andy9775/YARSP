import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const NavButton = (props) => {
  if (props.linkUrl.length === '/') {
    return (<IndexLink className="navbutton-container "
                       activeClassName="navbutton-container-active"
                       to={props.linkUrl}>
              <div>
                {props.displayName}
              </div>
            </IndexLink>);
  }

  return (
    <Link className="navbutton-container "
          activeClassName="navbutton-container-active"
          to={props.linkUrl}>
    <div>
      {props.displayName}
    </div>
    </Link>
    );
};

NavButton.propTypes = {
  displayName: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired, // where to link to e.g. /about
};

export default NavButton;
