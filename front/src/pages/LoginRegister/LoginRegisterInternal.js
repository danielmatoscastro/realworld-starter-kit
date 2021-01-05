import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { DefaultPage, ErrorList, Input } from 'components';
import { postRequest } from 'api';
import { useUser, useAbortOnUnmount } from 'hooks';
import { HOME } from '../../routes';

const LoginRegisterInternal = ({ data }) => {
  const {
    title,
    link,
    showUsername,
    endpoint,
    payloadBuilder,
  } = data;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { user, setUser } = useUser();
  const abortController = useAbortOnUnmount();

  if (user.isLogged) {
    return <Redirect to={HOME} />;
  }

  const onClickHandler = (formData) => async (e) => {
    try {
      e.preventDefault();
      const response = await postRequest(endpoint, payloadBuilder(formData), null, abortController);

      if (response.user) {
        setUser({
          ...user,
          ...response.user,
          isLogged: true,
        });
      } else {
        setErrors(response.errors);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        throw err;
      }
    }
  };

  return (
    <DefaultPage>
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{title}</h1>
              <p className="text-xs-center">
                {link}
              </p>

              {errors && (
                <ErrorList
                  errors={errors}
                  possibleErrorFields={['username', 'email', 'password', 'email or password']}
                />
              )}

              <form>
                {showUsername && (
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
                  onClick={onClickHandler({ username, email, password })}
                >
                  {title}
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </DefaultPage>
  );
};

LoginRegisterInternal.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.node.isRequired,
    showUsername: PropTypes.bool.isRequired,
    endpoint: PropTypes.string.isRequired,
    payloadBuilder: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginRegisterInternal;
