import {resolve, reject} from 'redux-simple-promise';
const LOAD_THINGS = 'management/LOAD_THINGS';
const ADD_THING = 'management/ADD_THING';
const UPDATE_THING = 'management/UPDATE_THING';
const EDIT_THING = 'management/EDIT_THING';
const DISMISS_EDIT_THING = 'management/DISMISS_EDIT_THING';

const initialState = {
  loaded: false,
  edit: {
    isOpen: false
  }
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case LOAD_THINGS:
    return Object.assign({}, state, {
      loading: true,
      loaded: false,
      error: null,
      things: null
    });
  case resolve(LOAD_THINGS):
    return Object.assign({}, state, {
      loading: false,
      loaded: true,
      error: null,
      things: action.payload.data
    });
  case reject(LOAD_THINGS):
    return Object.assign({}, state, {
      loading: false,
      loaded: false,
      error: action.payload.data,
      things: null
    });
  case EDIT_THING:
    return Object.assign({}, state, {
      edit: {
        isOpen: true,
        thing: action.payload.thing
      }
    });
  case DISMISS_EDIT_THING:
    return Object.assign({}, state, {
      edit: {
        isOpen: false,
        thing: null
      }
    });
  default:
    return state;
  }
}

export function load () {
  return {
    type: LOAD_THINGS,
    payload: {
      promise: client => client.get('/api/things')
    }
  };
}

export function create (data) {
  return {
    type: ADD_THING,
    payload: {
      promise: client => client.post('/api/things', data)
    }
  };
}

export function update (id, thing) {
  return {
    type: UPDATE_THING,
    payload: {
      promise: client => client.put(`/api/things/${id}`, thing)
    }
  };
}

export function editThing (thing) {
  return {
    type: EDIT_THING,
    payload: {
      thing
    }
  };
}

export function dismissEdit () {
  return {
    type: DISMISS_EDIT_THING
  };
}

export function saveEdit (thing) {
  return dispatch => dispatch(update(thing._id, thing)).then(() => dispatch(dismissEdit()));
}
