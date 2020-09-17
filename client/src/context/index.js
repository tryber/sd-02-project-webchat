import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createContext } from 'react';

const Context = createContext();

const Provider = ({ children }) => {
  const [message, setMessage] = useState({ value: null, type: null });
  const [user, setUser] = useState();

  const context = {
    message,
    setMessage,
    user,
    setUser,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export { Context, Provider };

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
