import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WebChatContext from '../Context';

const ChatContainer = () => {
  const { nickname, chatMessages, setChatMessages, socket } = useContext(WebChatContext);
  const history = useHistory();

  useEffect(() => {
    if (!nickname) return history.push('/');

  }, [nickname, history]);

  socket.on('serverResponse', (data) => {
    setChatMessages([...chatMessages, data])
  });

  return (
    <div>
      {chatMessages.map(({ nick, message, time }) => (
        <div key={`${nick} message at ${time}`}>
          <span>{`${time.split(' ')[0]} - ${time.split(' ')[4]} ${nick}: `}</span>
          <span>{message}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
