import React from 'react';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';

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

          {user.isLogged && (
          <li className="nav-item">
            <Link to="/editor" className="nav-link">
              <i className="ion-compose" />
&nbsp;New Post
            </Link>
          </li>
          )}

          {user.isLogged && (
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              <i className="ion-gear-a" />
&nbsp;Settings
            </Link>
          </li>
          )}

          {user.isLogged && (
          <li className="nav-item">
            <Link to={`/profile/${user.id}`} className="nav-link">
              {user.username}
            </Link>
          </li>
          )}

          {!user.isLogged && (
          <li className="nav-item">
            <Link to="/login" className="nav-link">Sign in</Link>
          </li>
          )}

          {!user.isLogged && (
          <li className="nav-item">
            <Link to="/register" className="nav-link">Sign up</Link>
          </li>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Header;
