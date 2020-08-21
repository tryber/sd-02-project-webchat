import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

import Board from "./Board";
import Users from "./Users";
import { getMessages, getUsers, addUser } from '../../services/axios';
import "./style.css";


const ChatRoom = (props) => {
  const { name } = props.match.params;
  const [yourUser] = useState(name);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const socket = io(process.env.REACT_APP_ENDPOINT_SOCKET);

  useEffect(() => {
    getMessages().then(({ data }) => setMessages(data));

    addUser(yourUser)
      .then(() => getUsers())
      .then(({ data }) => setUsers(data.map((item) => item.nickname)));
  }, []);

  useEffect(() => {
    socket.on('receive-message', (message) => {
      setMessages((curr) => [...curr, message]);
    });

    return () => { socket.destroy(); }
  }, [socket]);

  return (
    <div className="chat_room_page">
      <div className="board_container">
        <Board yourUser={yourUser} messages={messages} socket={socket} />
      </div>
      <Users users={users} yourUser={yourUser} />
    </div>
  );
};

export default ChatRoom;
