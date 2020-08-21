import React from "react";
import Message from './Message';
import "./style.css";


const Messages = ({ yourUser, messages }) => {
  return (
    <div className="messages_comp">
      {messages.map((message, index) => (
        <Message key={`message-${index}`} {...message} yourUser={yourUser} />
      ))}
    </div>
  );
};

export default Messages;
