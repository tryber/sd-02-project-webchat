import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Chat from './pages/Chat';

import Direct from './pages/Direct';

import Login from './pages/Login';

import People from './pages/People';

import Register from './pages/Register';

import User from './pages/User';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/chat/:id" component={Chat} />
        <PrivateRoute exact path="/direct" component={Direct} />
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/people" component={People} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/user" component={User} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
