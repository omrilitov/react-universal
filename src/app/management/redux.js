import {combineReducers} from 'redux';
import users from './Users/redux';
import things from './Things/redux';

export default combineReducers({
  users,
  things
});