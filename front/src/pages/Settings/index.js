import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useUser, useAbortOnUnmount } from 'hooks';
import { DefaultPage, ErrorList } from 'components';
import { putRequest, USER_ROUTE } from 'api';
import { HOME, PROFILE_F } from '../../routes';

export const Settings = () => {
  const { user, setUser, clearUser } = useUser();
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [passwordWasSet, setPasswordWasSet] = useState(false);
  const [loading, setLoading] = useState(false);
  const abortController = useAbortOnUnmount();

  if (!user.isLogged) {
    return <Redirect to={HOME} />;
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const payload = Array.from(e.target.elements)
        .filter((el) => {
          if (el.name && el.name === 'password') {
            return passwordWasSet;
          }

          return el.name;
        })
        .reduce((formData, el) => ({ ...formData, [el.name]: el.value }), {});

      setLoading(true);
      const response = await putRequest(USER_ROUTE,
        { user: payload },
        user.token,
        abortController);

      if (response.user) {
        setUser({ ...response.user, isLogged: true });
        history.push(PROFILE_F(response.user.username));
      } else {
        setErrors(response.errors);
      }

      setLoading(false);
    } catch (err) {
      if (err.name !== 'AbortError') {
        throw err;
      }
    }
  };

  const onLogoutHandler = () => {
    clearUser();
    history.push(HOME);
  };

  return (
    <DefaultPage>
      <div className="settings-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              { errors && (
              <ErrorList
                errors={errors}
                possibleErrorFields={[
                  'image',
                  'username',
                  'bio',
                  'email',
                  'password',
                ]}
              />
              )}

              <form onSubmit={onSubmitHandler}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="image"
                      placeholder="URL of profile picture"
                      defaultValue={user.image}
                      disabled={loading}
                      aria-label="URL of profile picture"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="username"
                      placeholder="Your Name"
                      defaultValue={user.username}
                      disabled={loading}
                      aria-label="Your Name"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows="8"
                      name="bio"
                      placeholder="Short bio about you"
                      defaultValue={user.bio}
                      disabled={loading}
                      aria-label="Short bio about you"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="email"
                      placeholder="Email"
                      defaultValue={user.email}
                      disabled={loading}
                      aria-label="Email"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      name="password"
                      placeholder="New Password"
                      disabled={loading}
                      aria-label="New Password"
                      onChange={() => !passwordWasSet && setPasswordWasSet(true)}
                    />
                  </fieldset>
                  <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button type="button" className="btn btn-outline-danger" onClick={onLogoutHandler}>
                Or click here to logout.
              </button>

            </div>
          </div>
        </div>
      </div>
    </DefaultPage>
  );
};

export default Settings;
