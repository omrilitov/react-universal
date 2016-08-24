import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Router} from 'react-router';
import {ReduxAsyncConnect} from 'redux-connect';
import {syncHistoryWithStore} from 'react-router-redux';
import createStore from './app/create-store';
import createRoutes from './app/routes';
import Root from './components/Root';

injectTapEventPlugin();

const store = createStore(browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);
const context = {insertCss: styles => styles._insertCss()};

render(
  <Root store={store} context={context}>
    <Router history={history} render={props => <ReduxAsyncConnect {...props} />}>
      {routes}
    </Router>
  </Root>,
  document.getElementById('content')
);
/*
if (module.hot) {
  module.hot.accept('./app/routes', () => {
    render(
      <Root store={store} context={context}>
        <Router history={history} render={props => <ReduxAsyncConnect {...props} />}>
          {routes}
        </Router>
      </Root>,
      document.getElementById('content')
    );
  });
}*/