import React from 'react';
import { Link } from 'react-router-dom';
import { USERS_ROUTE } from 'api';
import { LoginRegisterInternal } from 'components';
import { LOGIN } from '../../routes';

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

export default Register;
