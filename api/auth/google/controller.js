import passport from 'passport';
import User from '../../api/user/user.model';
import {setTokenCookie} from '../auth.service';

export function signin (req, res) {
  setTokenCookie(req, res);
}

export function connect (req, res, next) {
  // TODO: already connected ?

  passport.authenticate('google', {callbackURL: '/auth/google/connect/callback'}, (err, user, info) => {
    if (err || !info) {
      // TODO: what?
      return res.redirect('/');
    }

    User.findOne({'providers.google.id': info.id}, (err, user) => {
      if (err) {
        // TODO: what?
        return next(err);
      }

      if (user) {
        // TODO: what?!
        return res.redirect('/');
      }

      // TODO: req user undefined?
      User.update({_id: req.user._id}, {
        'providers.google': {
          id: info.id,
          link: info.link
        }
      }, {multi: false}, err => {
        if (err) {
          // TODO: what?
          return next(err);
        }

        return res.redirect('/');
      });
    });
  })(req, res, next);
}

export function disconnect (req, res, next) {
  User.update({_id: req.user._id}, {$unset: {'providers.google': true}}, {multi: false}, err => {
    if (err) {
      // TODO: what?
      return next(err);
    }

    return res.status(204).end();
  });
}