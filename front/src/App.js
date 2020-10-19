import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from './Pages/Welcome';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route>
        <Route exact path='/' component={Welcome} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
