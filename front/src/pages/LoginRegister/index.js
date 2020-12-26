import React, { useState } from 'react';
import { useRouteMatch, Redirect, Link } from 'react-router-dom';
import { DefaultPage, ErrorList, Input } from 'components';
import { postRequest, USERS_ROUTE, USERS_LOGIN_ROUTE } from 'api';
import { useUser } from 'hooks';
import { LOGIN, HOME, REGISTER } from '../../routes';

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

  let internalProps = {};
  if (isLoginPage) {
    internalProps = {
      title: 'Sign in',
      link: <Link to={REGISTER}>Need an account?</Link>,
      messageLink: 'Need an account?',
      onClickHandler: onClickHandler(USERS_LOGIN_ROUTE, {
        user: {
          password,
          email,
        },
      }),
    };
  } else {
    internalProps = {
      title: 'Sign up',
      link: <Link to={LOGIN}>Have an account?</Link>,
      messageLink: 'Have an account?',
      onClickHandler: onClickHandler(USERS_ROUTE, {
        user: {
          username,
          password,
          email,
        },
      }),
    };
  }

  return (
    <DefaultPage>
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{internalProps.title}</h1>
              <p className="text-xs-center">
                {internalProps.link}
              </p>

              {errors && (
              <ErrorList
                errors={errors}
                possibleErrorFields={['username', 'email', 'password']}
              />
              )}

              <form>
                {!isLoginPage && (
                <Input
                  placeholder="Your Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                )}
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
                  onClick={internalProps.onClickHandler}
                >
                  {internalProps.title}
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </DefaultPage>
  );
};

export default LoginRegister;
