import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';
import './ChatPage.css';

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT);

const submitForm = (e, inputValue, setInputValue) => {
  e.preventDefault();
  socket.emit('mensagem', inputValue);
  setInputValue('');
};

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  socket.on('serverMsg', (msg) => {
    setMessage(msg);
  });
  return (
    <div>
      <ul id="messagens">
        <li>{message}</li>
      </ul>
      <form action="" onSubmit={(e) => submitForm(e, inputValue, setInputValue)}>
        <input id="mensagemInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatPage;
