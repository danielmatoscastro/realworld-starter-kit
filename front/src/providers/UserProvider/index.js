import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Storage } from 'utils';

export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const initialState = {
      id: 1,
      username: 'username',
      isLogged: false,
    };

    const userStorage = Storage.getItem('user');

    return userStorage ?? initialState;
  });

  const wrappedSetUser = (newUser) => {
    setUser(newUser);
    Storage.setItem('user', newUser);
  };

  if (window.Cypress) {
    window.setUser = wrappedSetUser;
  }

  return (
    <UserContext.Provider value={{ user, setUser: wrappedSetUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
