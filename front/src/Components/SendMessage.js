import React, { useContext, useState } from 'react';
import io from 'socket.io-client';
import WebChatContext from '../Context';

const socket = io('http://localhost:4555');

const structureMessage = (nick, message) => ({
  nick,
  message,
  time: Date(),
});

const SendMessage = () => {
  const { nickName } = useContext(WebChatContext);
  const [userMessage, setUserMessage] = useState('');

  const sendMessageSocket = () => socket.emit('message', structureMessage(nickName, userMessage));

  return (
    <div>
      <input type="text" onChange={({ target }) => setUserMessage(target.value)} />
      <button type="button" onClick={() => sendMessageSocket(userMessage)}>
        Enviar
      </button>
    </div>
  );
};

export default SendMessage;
