import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import "./style.css";

const Login = () => {
  const [name, setName] = useState();
  const hist = useHistory();

  const onChangeHandleName = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const onClickHandle = () => {
    hist.push(`/chat-room/${name}`);
  };

  return (
    <div className="login_page">
      <h1>Login</h1>
      <form>
        <div className="field">
          <strong>Nickname:</strong>
          <input
            type="text"
            placeholder="Seu nome"
            required
            onChange={(e) => onChangeHandleName(e)}
          />
        </div>
        {(name) ?
          <button type="button" onClick={onClickHandle}>Entrar</button> :
          <button type="button" disabled>Entrar</button>}
      </form>
    </div>
  );
};

export default Login;