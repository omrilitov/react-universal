import {resolve, reject} from 'redux-simple-promise';
const LOAD_USERS = 'management/LOAD_USERS';
const ADD_USER = 'management/ADD_USER';
const REMOVE_USER = 'management/REMOVE_USER';
const UPDATE_USER = 'management/UPDATE_USER';

const initialState = {
  loaded: false
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case LOAD_USERS:
    return Object.assign({}, state, {
      loading: true,
      loaded: false,
      error: null,
      users: null
    });
  case resolve(LOAD_USERS):
    return Object.assign({}, state, {
      loading: false,
      loaded: true,
      error: null,
      users: action.payload.data
    });
  case reject(LOAD_USERS):
    return Object.assign({}, state, {
      loading: false,
      loaded: false,
      error: action.payload.data,
      users: null
    });
  default:
    return state;
  }
}

export function load () {
  return {
    type: LOAD_USERS,
    payload: {
      promise: client => client.get('/api/users')
    }
  };
}

export function create (data) {
  return {
    type: ADD_USER,
    payload: {
      promise: client => client.post('/api/users', data)
    }
  };
}

export function update (id, data) {
  return {
    type: UPDATE_USER,
    payload: {
      promise: client => client.put(`/api/users/${id}`, data)
    }
  };
}

export function remove (id) {
  return {
    type: REMOVE_USER,
    payload: {
      promise: client => client.delete(`/api/users/${id}`)
    }
  };
}
