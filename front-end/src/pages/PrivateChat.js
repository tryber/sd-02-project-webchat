import React, { useState, useEffect } from 'react';
import ChatMessagesRender from '../components/ChatMessagesRender';
import socket from '../services/socket';
import PropTypes from 'prop-types';
import './ChatPage.css';

const emitPrivateMessage = (message, sender, reciever) => (
  socket.emit('privatemessage', { message, sender, reciever })
);

const PrivateChat = ({ sender, reciever }) => {
  const [inputValue, setInputValue] = useState('');
  const [pvtMessage, setPvtMessage] = useState([]);

  useEffect(() => {
    socket.on('privatechat',
      ({ message, sender: pvtSender }) => setPvtMessage((state) => [
        ...state, { message, timestamp: Date.now(), sender: pvtSender }]));
    socket.emit('joinRoom', { sender, reciever });
  }, []);

  useEffect(() => {
    socket.on(`${sender}${reciever}`, ({ allMessages }) => {
      setPvtMessage(allMessages);
    });
  }, []);

  return (
    <div>
      <ChatMessagesRender chatMessages={pvtMessage} />
      <input
        id="mensagemInput"
        value={inputValue}
        onChange={({ target: { value } }) => setInputValue(value)}
      />
      <button
        type="button"
        onClick={() => emitPrivateMessage(inputValue, sender, reciever)}
      >
        Send
      </button>
    </div>
  );
};

export default PrivateChat;

PrivateChat.propTypes = {
  sender: PropTypes.string.isRequired,
  reciever: PropTypes.string.isRequired,
};
