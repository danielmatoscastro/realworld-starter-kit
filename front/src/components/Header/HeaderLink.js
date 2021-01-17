import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const HeaderLink = ({ link }) => (
  link.show && (
    <li className="nav-item">
      <NavLink exact to={link.route} className="nav-link">
        <i className={link.icon} />
        {` ${link.text}`}
      </NavLink>
    </li>
  )
);

HeaderLink.propTypes = {
  link: PropTypes.shape({
    route: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default HeaderLink;
