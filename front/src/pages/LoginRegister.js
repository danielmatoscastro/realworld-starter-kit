import React, { useState } from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { LOGIN, HOME } from '../routes';
import DefaultPage from '../components/DefaultPage';

const BASE_URL = 'https://conduit.productionready.io/api';

const LoginRegister = () => {
  const { user, setUser } = useUser();
  const isLoginPage = useRouteMatch(LOGIN);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  if (user.isLogged) {
    return <Redirect to={HOME} />;
  }

  const onClickHandler = (routeApi, payload) => async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(`${BASE_URL}${routeApi}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await request.json();

      if (request.status === 200) {
        setUser({
          ...user,
          ...data.user,
          isLogged: true,
        });
      } else {
        setError(data.errors);
      }
    } catch (err) {
      setError(err);
    }
  };

  const registerHandler = onClickHandler('/users', {
    user: {
      username,
      password,
      email,
    },
  });

  const loginHandler = onClickHandler('/users/login', {
    user: {
      password,
      email,
    },
  });

  return (
    <DefaultPage>
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            {!isLoginPage && (
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href="/">Have an account?</a>
              </p>

              {error && (
              <ul className="error-messages">
                {
                  ['username', 'email', 'password'].reduce((acc, field) => {
                    const errors = error[field] ? error[field].map((message) => {
                      const messageComplete = `${field} ${message}`;
                      return (
                        <li key={messageComplete}>{messageComplete}</li>
                      );
                    }) : [];
                    return acc.concat(errors);
                  }, [])
                }
              </ul>
              )}

              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  type="button"
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={isLoginPage ? loginHandler : registerHandler}
                >
                  Sign up
                </button>
              </form>

            </div>
            )}
          </div>
        </div>

      </div>
    </DefaultPage>
  );
};

export default LoginRegister;
