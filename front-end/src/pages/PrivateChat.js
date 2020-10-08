import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import './ChatPage.css';

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT);

const timestampToDate = (timestamp = Date.now()) => (new Date(timestamp)).toLocaleString('pt-br');

const emitPrivateMessage = (message, sender, reciever) => (
  socket.emit('privatemessage', { message, sender, reciever })
);

const allMessagesRender = (chatMessages) => (
  <div>
    {(chatMessages.length === 0)
      || (
        <ul className="messagens">
          {chatMessages.map(({ message, timestamp, sender }) => (
            <li key={Math.random()}>
              {`${timestampToDate(timestamp)} - ${sender} - ${message}`}
            </li>
          ))}
        </ul>
      )}
  </div>
);

const PrivateChat = ({ sender, reciever }) => {
  const [inputValue, setInputValue] = useState('');
  const [pvtMessage, setPvtMessage] = useState([]);

  useEffect(() => {
    socket.on('privatechat',
      ({ message, sender: pvtSender }) => setPvtMessage((state) => [
        ...state, { message, timestamp: Date.now(), sender: pvtSender },
      ]));
    socket.emit('joinRoom', { sender, reciever });
  }, []);

  useEffect(() => {
    socket.on('allMessages', ({ allMessages }) => {
      console.log(allMessages);
      setPvtMessage(allMessages);
    });
  }, []);

  return (
    <div>
      {allMessagesRender(pvtMessage)}
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
