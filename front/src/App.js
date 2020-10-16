import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from './Pages/Welcome';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route>
        <Route to='/' component={Welcome} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
