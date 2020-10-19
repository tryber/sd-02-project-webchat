import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WebChatContext from './index';

const WebChatProvider = ({ children }) => {
  const [nickname, setNickname] = useState('');

  const providerObj = {
    nickname,
    setNickname,
  }

  return (
    <WebChatContext.Provider value={providerObj}>
      {children}
    </WebChatContext.Provider>
  );
};

export default WebChatProvider;

WebChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
