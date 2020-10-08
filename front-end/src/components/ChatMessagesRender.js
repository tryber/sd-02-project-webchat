import React from 'react';

const timestampToDate = (timestamp = Date.now()) => (new Date(timestamp)).toLocaleString('pt-br');

const ChatMessagesRender = ({ chatMessages }) => (
  <div>
    {(chatMessages.length === 0)
      || (
        <ul className="messagens">
          {chatMessages.map(({ message, timestamp, sender }) => (
            <li key={Math.random()}>
              {`${timestampToDate(timestamp)} - ${sender} - ${message}`}
            </li>
          ))}
        </ul>
      )}
  </div>
);

export default ChatMessagesRender;
