import React, { useContext, useEffect } from 'react';
import { getPrivateMessages } from '../Services/requestMessages';
import WebChatContext from '../Context';

const PrivateContainer = () => {
  const { privateChat, setPrivateChat, socket, nickname, nicknameToMessage } = useContext(WebChatContext);

  useEffect(() => {
    socket.emit('privateHistory', { sendUser: nickname, receiveUser: nicknameToMessage });
    socket.on('startPrivate', (data) => {
      console.log('entrei no startPrivate');
      if (!data) return null;
      setPrivateChat([...data.messages]);
    });
  }, []);

  socket.on('receivePrivateMessage', (data) => {
    if (!data) return null;
    setPrivateChat([...data.messages]);
  });


  return (
    <div>
      {privateChat.map(({ sendUser, message, time }) => (
        <div key={`${sendUser} says ${message} message at ${time}`}>
          <span>{`${time.split(' ')[0]} - ${time.split(' ')[4]} ${sendUser}: `}</span>
          <span>{message}</span>
        </div>
      ))}
    </div>
  )
};

export default PrivateContainer;
