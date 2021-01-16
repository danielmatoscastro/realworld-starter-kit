import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useUser } from 'hooks';
import {
  HOME,
  EDITOR,
  SETTINGS,
  PROFILE_F,
  LOGIN,
  REGISTER,
} from '../../routes';

const HeaderLink = ({
  linkData: {
    show,
    route,
    icon,
    text,
  },
}) => (
  show && (
    <li className="nav-item">
      <Link to={route} className="nav-link">
        <i className={icon} />
        {` ${text}`}
      </Link>
    </li>
  )
);

HeaderLink.propTypes = {
  linkData: PropTypes.shape().isRequired,
};

export const Header = () => {
  const { user } = useUser();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to={HOME} className="navbar-brand">conduit</Link>
        <ul className="nav navbar-nav pull-xs-right">

          <li className="nav-item">
            <Link to={HOME} className="nav-link active">Home</Link>
          </li>

          {[{
            show: user.isLogged,
            route: EDITOR,
            icon: 'ion-compose',
            text: 'New Post',
          },
          {
            show: user.isLogged,
            route: SETTINGS,
            icon: 'ion-gear-a',
            text: 'Settings',
          },
          {
            show: user.isLogged,
            route: PROFILE_F(user.username),
            icon: '',
            text: user.username,
          },
          {
            show: !user.isLogged,
            route: LOGIN,
            icon: '',
            text: 'Sign in',
          },
          {
            show: !user.isLogged,
            route: REGISTER,
            icon: '',
            text: 'Sign up',
          },
          ].map((props) => <HeaderLink linkData={props} key={props.text} />)}

        </ul>
      </div>
    </nav>
  );
};

export default Header;
