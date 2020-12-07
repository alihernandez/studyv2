import React from 'react';

const UserContext = React.createContext({
  userData: {},
  loggedIn: false,
  user: {},
  failureMessage: "",
  post: {},
  handleInputChange: () => {},
  handleLogin: () => {},
  handleSignup: () => {},
  logout: () => {},
});

export default UserContext;
