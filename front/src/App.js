import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './Pages/Chat';

import Welcome from './Pages/Welcome';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/chat' component={Chat} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
