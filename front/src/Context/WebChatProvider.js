import React, { useState } from 'react';
import WebChatContext from './index';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const socket = io('http://localhost:4555');

const WebChatProvider = ({ children }) => {
  const [nickname, setNickname] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const providerObj = {
    nickname,
    setNickname,
    chatMessages,
    setChatMessages,
    socket,
  };

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
