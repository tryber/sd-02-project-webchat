import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import ChatMessagesRender from '../components/ChatMessagesRender';
import PrivateChat from './PrivateChat';
import './ChatPage.css';
import OnlineUsers from '../components/OnlineUsers';

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT);

const getAllMessages = async () => {
  const resp = await axios({
    baseURL: 'http://localhost:3001/messages',
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return resp.data.allMessages;
};

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

const sendNickname = async (nickname) => {
  try {
    await axios({
      baseURL: 'http://localhost:3001/users',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: { nickname },
    });
  } catch (err) {
    console.log(err);
  }
  socket.emit('login', { nickname, id: socket.id });
};

const getNickname = (setSender, nickname, setCanRedirect) => (
  <div>
    <input
      type="text"
      placeholder="Digite seu nickname"
      onChange={(e) => setSender(e.target.value)}
    />
    <button type="button" onClick={() => setCanRedirect(true) || sendNickname(nickname)}>
      Send
    </button>
  </div>
);

const chatRender = (inputValue, setInputValue, nickname) => (
  <div>
    <input
      id="mensagemInput"
      value={inputValue}
      onChange={({ target: { value } }) => setInputValue(value)}
    />
    <button
      type="button"
      onClick={() => setInputValue('') || submitForm(inputValue, nickname)}
    >
      Send
    </button>
  </div>
);

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [canRedirect, setCanRedirect] = useState(false);
  const [reciever, setReciever] = useState('');
  const [pvtChat, setPvtChat] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setChatMessages(await getAllMessages());
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on('serverMsg', ({ message, nickname }) => {
      setChatMessages((state) => [
        ...state, { message, timestamp: Date.now(), sender: nickname },
      ]);
    });
  }, []);

  if (!canRedirect) return getNickname(setSender, sender, setCanRedirect);

  return (
    <div>
      <OnlineUsers sender={sender} socket={socket} setPvt={setPvtChat} pvt={pvtChat} setRec={setReciever} />
      {(!pvtChat) || <PrivateChat sender={sender} reciever={reciever} />}
      {(pvtChat) || <ChatMessagesRender chatMessages={chatMessages} />}
      {(pvtChat) || chatRender(inputValue, setInputValue, sender)}
    </div>
  );
};

export default ChatPage;
