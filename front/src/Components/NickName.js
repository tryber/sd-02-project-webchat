import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import WebChatContext from '../Context';

const NickName = () => {
  const { nickname, setNickname } = useContext(WebChatContext);
  const [isNicknameEmpty, setIsNicknameEmpty] = useState('');

  const history = useHistory();

  const chatRedirect = () => (
    nickname.length
      ? history.push('/chat')
      : setIsNicknameEmpty(true)
  );


  return (
    <div>
      <div>
        <p>Digite seu NickName</p>
        <input type="text"
          onChange={({ target }) => setNickname(target.value)}
        />
        <button
          type="button"
          onClick={() => chatRedirect()}
        >
          Entrar
        </button>
        <span>{isNicknameEmpty && "Nickname não digitado"}</span>
      </div>
    </div>
  );
};

export default NickName;
