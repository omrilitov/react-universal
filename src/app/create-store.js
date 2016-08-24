import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-simple-promise';
import {routerMiddleware} from 'react-router-redux';
import cookie from 'react-cookie';
import createClient from '../helpers/client';
import reducer from './reducer';
import {getToken} from './auth/redux';

const clientMiddleware = () => {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const {payload: {promise} = {}} = action;

      if (promise) {
        action.payload.promise = promise(createClient(getToken(getState())));
      }

      return next(action);
    };
  };
};

export default (history, data = {}) => {
  const authData = {auth: {token: cookie.load('token')}};
  const initialState = Object.assign({}, authData, data);
  const middlewares = [clientMiddleware(), promiseMiddleware(), routerMiddleware(history)];
  let finalCreateStore;

  /*
   In development, patch the create store with dev tools middleware (also support the chrome extension)
   Also use persistState to remember states from the url
   https://github.com/gaearon/redux-devtools
   http://rackt.org/redux/docs/api/compose.html
   */
  if (process.env.NODE_ENV !== 'production' && process.env.WEBPACK_ENV === 'client') {
    const persistState = require('redux-devtools').persistState;
    const DevTools = require('./components/DevTools').default;

    finalCreateStore = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      )
    )(_createStore);
  }
  else {
    finalCreateStore = applyMiddleware(...middlewares)(_createStore);
  }

  return finalCreateStore(reducer, initialState);
};
