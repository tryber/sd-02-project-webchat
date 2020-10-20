import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WebChatContext from '../Context';

const ChatContainer = () => {
  const { nickname, chatMessages } = useContext(WebChatContext);
  const history = useHistory();

  useEffect(() => {
    if (!nickname) return history.push('/');

  }, [nickname, history]);

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
