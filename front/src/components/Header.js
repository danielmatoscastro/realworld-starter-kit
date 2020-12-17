import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';

const HeaderLink = ({
  linkData: {
    show, route, icon, text,
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

const Header = () => {
  const { user } = useUser();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">conduit</Link>
        <ul className="nav navbar-nav pull-xs-right">

          <li className="nav-item">
            <Link to="/" className="nav-link active">Home</Link>
          </li>

          {[{
            show: user.isLogged,
            route: '/editor',
            icon: 'ion-compose',
            text: 'New Post',
          },
          {
            show: user.isLogged,
            route: '/settings',
            icon: 'ion-gear-a',
            text: 'Settings',
          },
          {
            show: user.isLogged,
            route: `/profile/${user.id}`,
            icon: '',
            text: user.username,
          },
          {
            show: !user.isLogged,
            route: '/login',
            icon: '',
            text: 'Sign in',
          },
          {
            show: !user.isLogged,
            route: '/register',
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
