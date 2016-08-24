import User from './user.model';
import createError from 'http-errors';
import rejectEmpty from 'http-reject-empty';
import {signToken} from '../../auth/auth.service';
import _ from 'lodash';

// Get list of users
export function index () {
  return User.find({});
}

// Get a single user
export function show (req) {
  return User.findById(req.params.id)
    .then(rejectEmpty);
}

// Creates a new user
export function create (req) {
  const data = req.body;

  return new User(data).save()
    .then(rejectEmpty)
    .then(user => {
      return {
        token: signToken(user._id)
      };
    });
}

// Updates an existing user in the DB.
export function update (req) {
  const data = _.pick(req.body, ['name', 'email']);

  return User.findById(req.params.id)
    .then(rejectEmpty)
    .then(user => user.set(data).save())
    .then(_.noop);
}

// Deletes a user
export function destroy (req) {
  return User.findOneAndRemove({_id: req.params.id})
    .then(rejectEmpty)
    .then(_.noop);
}

// Change a users password
export function changePassword (req) {
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  return User.findById(req.user._id)
    .then(rejectEmpty)
    .then(user => {
      return user.authenticate(oldPass)
        .then(isAuth => {
          if (isAuth) {
            return user.setPassword(newPass);
          }

          return Promise.reject(createError(403));
        })
        .then(_.noop);
    });
}

// Get my info
export function me (req) {
  return Promise.resolve(req.user);
}
