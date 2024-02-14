import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './page';
import Info from './Info';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setIsAuthenticated(!!accessToken);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
        <PrivateRoute
          path="/info"
          component={Info}
          isAuthenticated={isAuthenticated}
          redirectTo="/"
        />
        <Redirect from="/" to="/" />
      </Switch>
    </Router>
  );
};

export default App;
