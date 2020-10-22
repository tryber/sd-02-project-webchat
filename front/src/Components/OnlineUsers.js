import React, { useContext, useEffect } from 'react';
import WebChatContext from '../Context';
import getOnlineUsers from '../Services/requestOnlineUsers';
import 'react-toastify/dist/ReactToastify.css';

const OnlineUsers = () => {
  const { onlineUsers, setOnlineUsers, socket, nickname, setIsPrivate, setToPrivateUser, setNicknameToMessage } = useContext(WebChatContext);

  useEffect(() => {
    const online = async () => {
      const { data } = await getOnlineUsers();
      setOnlineUsers(data.onlineUsers);
    };
    online();
  }, []);

  const goChatPrivate = (id, nick) => {
    setToPrivateUser(id);
    setNicknameToMessage(nick);
    setIsPrivate(true);
  };

  socket.on('userOnline', (data) => setOnlineUsers([...onlineUsers, data]));

  socket.on('userOff', (data) => setOnlineUsers(onlineUsers.splice(onlineUsers.indexOf(data))));

  return (
    <div>
      <button type="button" onClick={() => setIsPrivate(false)}>
        Geral
      </button>
      {onlineUsers.length &&
        onlineUsers.map(({id, nickname: nick}) => (
          nickname !== nick
          && <button
            type="button"
            key={id}
            socket={id}
            onClick={() => goChatPrivate(id, nick)}
          >
            {nick}
          </button>
        ))}
    </div>
  )
};

export default OnlineUsers;
