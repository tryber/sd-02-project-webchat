import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import ChatMessagesRender from '../components/ChatMessagesRender';
import './ChatPage.css';

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT);

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
    socket.on('allMessages', ({ allMessages }) => {
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
