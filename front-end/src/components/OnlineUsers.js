import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import socket from '../services/socket';

const OnlineUsers = ({ sender, setRec, setPvt, pvt }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on('online', (userNick) => setOnlineUsers(userNick));
  }, []);

  if (onlineUsers.length === 0) return null;

  return (
    <div>
      <ul>
        <li><h3 data-testid="online-user">Usuários Online: </h3></li>
        {Object.keys(onlineUsers).map((nickname) => (nickname === sender) || (
          <li data-testid={`li-${nickname}`} key={Math.random()}>
            {`${nickname} - `}
            <button
              data-testid="private-chat-button"
              type="button"
              onClick={() => setPvt(!pvt) || setRec(nickname)}
            >
              {(pvt) ? 'Voltar pro chat geral' : 'Enviar mensagem privada'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;

OnlineUsers.propTypes = {
  sender: PropTypes.string.isRequired,
  pvt: PropTypes.bool.isRequired,
  setRec: PropTypes.func.isRequired,
  setPvt: PropTypes.func.isRequired,
};
