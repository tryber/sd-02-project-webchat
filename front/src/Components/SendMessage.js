import React, { useContext, useState } from 'react';
import WebChatContext from '../Context';

const structureMessage = (nick, message) => ({
  nick,
  message,
  time: Date(),
});

const SendMessage = () => {
  const { nickname, socket, isPrivate, toPrivateUser } = useContext(WebChatContext);
  const [userMessage, setUserMessage] = useState('');

  const sendToSocket = () => {
    socket.emit('message', structureMessage(nickname, userMessage));
    setUserMessage('');
  };
  const sendPrivateToSocket = () => {
    socket.emit('privateMessage', {
      sendUser: nickname,
      receiveUser: toPrivateUser,
      message: userMessage,
    });
    setUserMessage('');
  }

  return (
    <div>
      <input type="text" onChange={({ target }) => setUserMessage(target.value)} value={userMessage}/>
      <button type="button" onClick={() => isPrivate
        ? sendPrivateToSocket()
        : sendToSocket()}>
        Enviar
      </button>
    </div>
  );
};

export default SendMessage;
