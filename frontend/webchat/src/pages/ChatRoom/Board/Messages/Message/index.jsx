import React from "react";
import dateFormat from '../../../../../services/dateFormat';
import "./style.css";

const Message = ({ nickname, message, date, yourUser }) => {
  const yourMessage = (yourUser === nickname);

  return (
    <div
      className="message_comp"
      style={{
        "backgroundColor": (!yourMessage) ? '#e6e5ea' : '#44b5fb',
        "color": (!yourMessage) ? 'black' : 'white',
      }}
    >
      <div className="name">
        <strong>De:</strong>
        {(yourMessage) ? <p>você</p> : <p>{nickname}</p>}
      </div>
      <div className="message">
        <p>{message}</p>
      </div>
      <div className="date">
        <p>{dateFormat(date)}</p>
      </div>
    </div>
  );
};

export default Message;