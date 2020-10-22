import React, { useContext } from 'react';
import ChatContainer from '../Components/ChatContainer';
import OnlineUsers from '../Components/OnlineUsers';
import PrivateContainer from '../Components/PrivateContainer';
import SendMessage from '../Components/SendMessage';
import WebChatContext from '../Context';

const Chat = () => {
  const { isPrivate, setIsPrivate } = useContext(WebChatContext);
  return (
    <div>
      {isPrivate ? <PrivateContainer /> : <ChatContainer />}
      <SendMessage />
      <OnlineUsers />
    </div>
  );
};

export default Chat;
