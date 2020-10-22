import React from 'react';
import ChatContainer from '../Components/ChatContainer';
import OnlineUsers from '../Components/OnlineUsers';
import SendMessage from '../Components/SendMessage';

const Chat = () => (
  <div>
    <ChatContainer />
    <SendMessage />
    <OnlineUsers />
  </div>
);

export default Chat;
