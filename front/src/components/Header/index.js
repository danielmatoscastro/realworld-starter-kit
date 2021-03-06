import React from 'react';
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
import { HeaderLink } from './HeaderLink';

export const Header = () => {
  const { user } = useUser();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to={HOME} className="navbar-brand">conduit</Link>
        <ul className="nav navbar-nav pull-xs-right">
          {[
            {
              show: true,
              route: HOME,
              icon: '',
              text: 'Home',
            },
            {
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
          ].map((link) => <HeaderLink link={link} key={link.text} />)}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
