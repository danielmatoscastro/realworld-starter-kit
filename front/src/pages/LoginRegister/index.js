import React, { useState } from 'react';
import { useRouteMatch, Redirect, Link } from 'react-router-dom';
import { DefaultPage, ErrorList, Input } from 'components';
import { postRequest, USERS_ROUTE, USERS_LOGIN_ROUTE } from 'api';
import { useUser } from 'hooks';
import { LOGIN, HOME } from '../../routes';

export const LoginRegister = () => {
  const { user, setUser } = useUser();
  const isLoginPage = useRouteMatch(LOGIN);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  if (user.isLogged) {
    return <Redirect to={HOME} />;
  }

  const onClickHandler = (endpoint, payload) => async (e) => {
    try {
      e.preventDefault();
      const data = await postRequest(endpoint, payload);
      setUser({
        ...user,
        ...data.user,
        isLogged: true,
      });
    } catch (err) {
      setErrors(err.errors);
    }
  };

  const registerHandler = onClickHandler(USERS_ROUTE, {
    user: {
      username,
      password,
      email,
    },
  });

  const loginHandler = onClickHandler(USERS_LOGIN_ROUTE, {
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
                <Link to={LOGIN}>Have an account?</Link>
              </p>

              {errors && (
              <ErrorList
                errors={errors}
                possibleErrorFields={['username', 'email', 'password']}
              />
              )}

              <form>
                <Input
                  placeholder="Your Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
