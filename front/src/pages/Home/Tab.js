import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { HOME } from '../../routes';

const Tab = ({
  text,
  show,
  isActive,
  onClick,
}) => (
  <li className="nav-item">
    {show && (
      <NavLink
        className="nav-link"
        to={HOME}
        isActive={isActive}
        onClick={onClick}
      >
        {text}
      </NavLink>
    )}
  </li>
);

Tab.defaultProps = {
  show: true,
  isActive: () => true,
};

Tab.propTypes = {
  text: PropTypes.string.isRequired,
  show: PropTypes.bool,
  isActive: PropTypes.func,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
