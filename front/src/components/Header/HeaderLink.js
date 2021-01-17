import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const HeaderLink = ({
  linkData: {
    show,
    route,
    icon,
    text,
  },
}) => (
  show && (
    <li className="nav-item">
      <NavLink exact to={route} className="nav-link">
        <i className={icon} />
        {` ${text}`}
      </NavLink>
    </li>
  )
);

HeaderLink.propTypes = {
  linkData: PropTypes.shape().isRequired,
};

export default HeaderLink;
