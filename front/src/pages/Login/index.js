import React from 'react';
import { Link } from 'react-router-dom';
import { USERS_LOGIN_ROUTE } from 'api';
import { LoginRegisterInternal } from 'components';
import { REGISTER } from '../../routes';

export const Login = () => (
  <LoginRegisterInternal data={{
    title: 'Sign in',
    link: <Link to={REGISTER}>Need an account?</Link>,
    showUsername: false,
    endpoint: USERS_LOGIN_ROUTE,
    payloadBuilder: (formData) => ({
      user: {
        password: formData.password,
        email: formData.email,
      },
    }),
  }}
  />
);

export default Login;
