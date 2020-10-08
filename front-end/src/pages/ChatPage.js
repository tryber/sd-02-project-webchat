import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import PrivateChat from './PrivateChat';
import './ChatPage.css';

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT);

const timestampToDate = (timestamp = Date.now()) => (new Date(timestamp)).toLocaleString('pt-br');

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

const getNickname = (setNickname, nickname, setCanRedirect) => (
  <div>
    <input
      type="text"
      placeholder="Digite seu nickname"
      onChange={(e) => setNickname(e.target.value)}
    />
    <button type="button" onClick={() => setCanRedirect(true) || sendNickname(nickname)}>
      Send
    </button>
  </div>
);

const allMessagesRender = (chatMessages) => (
  <div>
    {(chatMessages.length === 0)
      || (
        <ul className="messagens">
          {chatMessages.map(({ message, timestamp, nickname }) => (
            <li key={Math.random()}>
              {`${timestampToDate(timestamp)} - ${nickname} - ${message}`}
            </li>
          ))}
        </ul>
      )}
  </div>
);

const chatRender = (inputValue, setInputValue, nickname) => (
  <div>
    <input id="mensagemInput" value={inputValue} onChange={({ target: { value } }) => setInputValue(value)} />
    <button
      type="button"
      onClick={() => setInputValue('') || submitForm(inputValue, nickname)}
    >
      Send
    </button>
  </div>
);

const onlineChat = (
  onlineUsers, setPvtChatIsOn, pvtChatIsOn, setReciever, myNick,
) => (
  <div>
    <ul>
      <li><h3>Usuários Online: </h3></li>
      {Object.keys(onlineUsers).map((nickname) => (nickname === myNick) || (
        <li key={Math.random()}>
          {`${nickname} - `}
          <button
            type="button"
            onClick={() => setPvtChatIsOn(!pvtChatIsOn) || setReciever(nickname)}
          >
            {(pvtChatIsOn) ? 'Voltar pro chat geral' : 'Enviar mensagem privada'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [nickname, setNickname] = useState('');
  const [canRedirect, setCanRedirect] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [pvtChatIsOn, setPvtChatIsOn] = useState(false);
  const [reciever, setReciever] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      setChatMessages(await getAllMessages());
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on('serverMsg', ({ message, nickname: nicknameIo }) => {
      setChatMessages((state) => [
        ...state, { message, timestamp: Date.now(), nickname: nicknameIo },
      ]);
    });
    socket.on('online', (userNick) => setOnlineUsers(userNick));
  }, []);

  if (!canRedirect) return getNickname(setNickname, nickname, setCanRedirect);

  return (
    <div>
      {(onlineUsers.length === 0)
        || onlineChat(onlineUsers, setPvtChatIsOn, pvtChatIsOn, setReciever, nickname)}
      {(!pvtChatIsOn) || <PrivateChat sender={nickname} reciever={reciever} />}
      {(pvtChatIsOn) || allMessagesRender(chatMessages, nickname)}
      {(pvtChatIsOn) || chatRender(inputValue, setInputValue, nickname)}
    </div>
  );
};

export default ChatPage;
