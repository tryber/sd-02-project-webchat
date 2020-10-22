import React, { useContext, useEffect } from 'react';
import WebChatContext from '../Context';
import { ToastContainer, toast } from 'react-toastify';
import getOnlineUsers from '../Services/requestOnlineUsers';
import 'react-toastify/dist/ReactToastify.css';

const OnlineUsers = () => {
  const { onlineUsers, setOnlineUsers, socket } = useContext(WebChatContext);

  useEffect(() => {
    const online = async () => {
      const { data } = await getOnlineUsers();
      setOnlineUsers(data.onlineUsers);
    };
    online();
  }, []);

  socket.on('userOnline', (data) => {
    setOnlineUsers([...onlineUsers, data])
    toast(`${data.nickname} entrou no chat`);
  });

  return (
    <div>
      {onlineUsers.length &&
        onlineUsers.map((user) => (
          <div key={user.id} socket={user.id}>
            <p>{user.nickname}</p>
          </div>
        ))}
      <ToastContainer />
    </div>
  )
};

export default OnlineUsers;
