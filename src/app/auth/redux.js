import {resolve, reject} from 'redux-simple-promise';
import {push} from 'react-router-redux';
import cookie from 'react-cookie';

const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const SIGNUP = 'auth/SIGNUP';
const LOAD_USER = 'auth/LOAD_USER';

export default function reducer (state = {}, action = {}) {
  switch (action.type) {
  case LOGOUT:
    cookie.remove('token');

    return Object.assign({}, state, {
      token: null,
      user: null,
      error: null
    });
  case LOGIN:
  case SIGNUP:
    return Object.assign({}, state, {
      token: null,
      user: null,
      error: null
    });
  case resolve(SIGNUP):
  case resolve(LOGIN):
    cookie.save('token', action.payload.data.token);

    return Object.assign({}, state, {
      token: action.payload.data.token,
      user: null,
      error: null
    });
  case reject(LOGIN):
  case reject(SIGNUP):
    return Object.assign({}, state, {
      token: null,
      user: null,
      error: action.payload.data
    });
  case LOAD_USER:
    return Object.assign({}, state, {
      user: null,
      error: null
    });
  case resolve(LOAD_USER):
    return Object.assign({}, state, {
      user: action.payload.data,
      error: null
    });
  case reject(LOAD_USER):
      // TODO: change token to null only if error 401
    return Object.assign({}, state, {
      token: null,
      user: null,
      error: action.payload.data
    });
  default:
    return state;
  }
}

export function getToken (globalState) {
  return globalState.auth.token;
}

export function hasToken (globalState) {
  return globalState.auth && globalState.auth.token;
}

export function hasUser (globalState) {
  return globalState.auth && globalState.auth.user;
}

export function hasRole (user, role) {
  return (role === 'manager' && user.type === 'teacher' && user.manager) ||
    user.type === role;
}

export function loadUser () {
  return {
    type: LOAD_USER,
    payload: {
      promise: client => client.get('/api/users/me')
    }
  };
}

export function login ({email, password}) {
  const action = {
    type: LOGIN,
    payload: {
      promise: client => client.post('/auth/local', {email, password})
    }
  };

  return dispatch => dispatch(action).then(() => dispatch(push('/')));
}

export function signup ({name, email, password}) {
  const action = {
    type: SIGNUP,
    payload: {
      promise: client => client.post('/api/users', {name, email, password})
    }
  };

  return dispatch => dispatch(action).then(() => dispatch(push('/')));
}

export function goToSignup () {
  return push('/signup');
}

export function goToLogin () {
  return push('/login');
}

export function logout () {
  const action = {
    type: LOGOUT
  };

  return dispatch => {
    dispatch(action);
    dispatch(push('/login'));
  };
}
