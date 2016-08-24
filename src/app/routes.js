import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Shell from './components/Shell';
import Auth from './components/Auth';
import createHomeRoutes from './home';
import createAuthRoutes from './auth';
import {requireLogin} from './auth/routing';
import createManagementRoutes from './management';

export default store => {
  return (
    <Route path='/' component={App}>
      <Route component={Shell} {...requireLogin(store)}>
        {createHomeRoutes(store)}
        {createManagementRoutes(store)}
      </Route>

      <Route component={Auth}>
        {createAuthRoutes(store)}
      </Route>
    </Route>
  );
};