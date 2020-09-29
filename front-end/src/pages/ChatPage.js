import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import './ChatPage.css';

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT);

const submitForm = async (e) => {
  e.preventDefault();
  const resp = await axios({
    baseURL: 'http://localhost:3001/users',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: { message: e.target[0].value },
  });
  socket.emit('mensagem', e.target[0].value);
};

const sendNickname = async (e, setUserError) => {
  e.preventDefault();
  try {
    const resp = await axios({
      baseURL: 'http://localhost:3001/users',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: { nickname: e.target[0].value },
    });
    setUserError();
    console.log(resp);
  } catch (err) {
    setUserError('Usuario Duplicado, digite novamente');
  }
};

const getNickname = (setNickname, setUserError) => (
  <div>
    <form onSubmit={(e) => setNickname(e.target[0].value) || sendNickname(e, setUserError)}>
      <input
        type="text"
        placeholder="Digite seu nickname"
      />
      <button type="submit">
        Send
      </button>
    </form>
  </div>
);

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState([]);
  const [nickname, setNickname] = useState('');
  const [userError, setUserError] = useState('');

  useEffect(() => {
    socket.on('serverMsg', (msg) => {
      setMessage((state) => ([...state, msg]));
    });
  }, [message.msg]);

  if (!nickname || userError) return getNickname(setNickname, setUserError);

  return (
    <div>
      <ul id="messagens">
        <li>{JSON.stringify(message)}</li>
      </ul>
      <form action="" onSubmit={(e) => setInputValue('') || submitForm(e)}>
        <input id="mensagemInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
