import {Router} from 'express';
import passport from 'passport';
import {isAuthenticated, fillAuthorizationHeaderFromCookie} from '../auth.service';
import * as controller from './controller';

const router = new Router();

router
  .get('/signin', passport.authenticate('facebook', {
    callbackURL: '/auth/facebook/signin/callback',
    session: false
  }))
  .get('/signin/callback', passport.authenticate('facebook', {
    successURL: '/',
    callbackURL: '/auth/facebook/signin/callback',
    session: false
  }), controller.signin)

  .get('/connect', fillAuthorizationHeaderFromCookie(), isAuthenticated(), passport.authenticate('facebook', {callbackURL: '/auth/facebook/connect/callback'}))
  .get('/connect/callback', fillAuthorizationHeaderFromCookie(), isAuthenticated(), controller.connect)

  .post('/disconnect', isAuthenticated(), controller.disconnect);

export default router;