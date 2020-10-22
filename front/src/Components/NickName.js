import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLatestMessages } from '../Services/requestMessages';
import WebChatContext from '../Context';

const NickName = () => {
  const { nickname, setNickname, setChatMessages, socket } = useContext(WebChatContext);
  const [isNicknameEmpty, setIsNicknameEmpty] = useState('');

  const history = useHistory();

  const chatRedirect = async () => {
    if (nickname.length && !nickname.split('').includes(' ')) {
      const { data: { messages } } = await getLatestMessages();
      socket.emit('nickSocketId', { nickname });
      setChatMessages(messages);
      return history.push('/chat');
    }

    return setIsNicknameEmpty(true)
  };

  return (
    <div>
      <div>
        <p>Digite seu NickName</p>
        <input type="text" onChange={({ target }) => setNickname(target.value)} />
        <button type="button" onClick={() => chatRedirect()}>
          Entrar
        </button>
        <span>{isNicknameEmpty && "Verifique seu nickname."}</span>
      </div>
    </div>
  );
};

export default NickName;
