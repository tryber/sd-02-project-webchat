import React, { useContext } from 'react';
import WebChatContext from '../Context';

const NickName = () => {
  const { nickname, setNickname } = useContext(WebChatContext);

  return (
    <div>
      <div>
        <p>Digite seu NickName</p>
        <input type="text" />
        <button>Entrar</button>
      </div>
    </div>
  );
};

export default NickName;
