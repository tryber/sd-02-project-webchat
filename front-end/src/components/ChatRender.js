import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import socket from '../services/socket';

const submitForm = async (message, nickname) => {
  await axios({
    baseURL: 'http://localhost:3001/messages',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: { message, nickname },
  });
  socket.emit('mensagem', { message, nickname });
};

const ChatRender = ({ sender }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <input
        placeholder="digite sua mensagem"
        data-testid="chat-render-input"
        id="mensagemInput"
        value={inputValue}
        onChange={({ target: { value } }) => setInputValue(value)}
      />
      <button
        data-testid="chat-render-button"
        type="button"
        onClick={() => setInputValue('') || submitForm(inputValue, sender)}
      >
        Send
    </button>
    </div>
  );
};

export default ChatRender;

ChatRender.propTypes = {
  sender: PropTypes.string.isRequired,
};
