import React from "react";
import { Route } from "react-router-dom";
import dotenv from "dotenv";

import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";

import "./App.css";

function App() {
  dotenv.config();
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/chat-room/:name" component={ChatRoom} />
    </div>
  );
}

export default App;
