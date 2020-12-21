import React, { useState } from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { LOGIN, HOME } from '../routes';
import DefaultPage from '../components/DefaultPage';
import ErrorList from '../components/ErrorList';
import Input from '../components/Input';

const BASE_URL = 'https://conduit.productionready.io/api';

const LoginRegister = () => {
  const { user, setUser } = useUser();
  const isLoginPage = useRouteMatch(LOGIN);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

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
        setErrors(data.errors);
      }
    } catch (err) {
      setErrors(err);
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
