import React, { useContext, useState } from 'react';
import WebChatContext from '../Context';

const structureMessage = (nick, message) => ({
  nick,
  message,
  time: Date(),
});

const SendMessage = () => {
  const { nickname, socket } = useContext(WebChatContext);
  const [userMessage, setUserMessage] = useState('');

  const sendMessageSocket = () => socket.emit('message', structureMessage(nickname, userMessage));

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
