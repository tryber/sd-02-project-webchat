import React, { useState } from "react";
import Messages from './Messages';
import "./style.css";


const handleSubmit = (message, yourUser, socket, setMessage) => {
  setMessage('');
  socket.emit('send-message', { message, yourUser });
};

const onChangeHandleMessage = (e, setMessage) => {
  const { value } = e.target;
  setMessage(value);
};

const Board = (props) => {
  const { yourUser, socket } = props;
  const [message, setMessage] = useState();

  return (
    <div className="board_comp">
      <Messages {...props} />
      <div className="send_field">
        <input
          placeholder="Envie sua mensagem..."
          required
          onChange={(e) => onChangeHandleMessage(e, setMessage)}
        />
        <button type="button" onClick={() => handleSubmit(message, yourUser, socket, setMessage)}>Enviar</button>
      </div>
    </div>
  );
};

export default Board;