import React, { useContext, useEffect } from 'react';
import { getPrivateMessages } from '../Services/requestMessages';
import WebChatContext from '../Context';

const PrivateContainer = () => {
  const { nickname, privateChat, setPrivateChat, privateUser, socket, nicknameToMessage } = useContext(WebChatContext);

  useEffect(() => {
    const saveLastPrivateMessages = async () => {
      const data = await getPrivateMessages(nickname, nicknameToMessage);
    }
  }, []);

  socket.on('receivePrivateMessage', (data) => {
    setPrivateChat([...privateChat, data.messages]);
  });
  console.log(privateChat);
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
