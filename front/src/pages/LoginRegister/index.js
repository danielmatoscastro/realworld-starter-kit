import React from 'react';
import { Link } from 'react-router-dom';
import { USERS_ROUTE, USERS_LOGIN_ROUTE } from 'api';
import { LOGIN, REGISTER } from '../../routes';
import LoginRegisterInternal from './LoginRegisterInternal';

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

export const Register = () => (
  <LoginRegisterInternal data={{
    title: 'Sign up',
    link: <Link to={LOGIN}>Have an account?</Link>,
    showUsername: true,
    endpoint: USERS_ROUTE,
    payloadBuilder: (formData) => ({
      user: {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      },
    }),
  }}
  />
);
