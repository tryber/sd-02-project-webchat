import React, { useState } from 'react';
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

const ChatRender = ({ sender, socket }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <input
        id="mensagemInput"
        value={inputValue}
        onChange={({ target: { value } }) => setInputValue(value)}
      />
      <button
        type="button"
        onClick={() => setInputValue('') || submitForm(inputValue, sender, socket)}
      >
        Send
    </button>
    </div>
  );
};

export default ChatRender;
