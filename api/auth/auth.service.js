import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import pify from 'pify';
import User from '../api/user/user.model';
import createError from 'http-errors';
const validateJwt = pify(expressJwt({secret: process.env.SESSION_SECRET}));

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 *
 * @returns {Function} middleware
 */
export function isAuthenticated () {
  return (req, res) => {
    // Allow access_token to be passed through query parameter as well
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = `Bearer ${req.query.access_token}`;
    }

    return validateJwt(req, res)
      .then(() => {
        return User.findById(req.user._id);
      })
      .then(user => {
        if (!user) {
          return Promise.reject(createError(401));
        }

        req.user = user;
      });
  };
}

export function hasRole (role) {
  return (req, res) => {
    return isAuthenticated()(req, res)
      .then(() => {
        if (!((role === 'manager' && req.user.type === 'teacher' && req.user.manager) ||
          req.user.type === role)) {
          return Promise.reject(createError(403));
        }
      });
  };
}

export function fillAuthorizationHeaderFromCookie () {
  return req => {
    if (req.cookies && req.cookies.token) {
      // Allow access_token to be passed through the token cookie as well
      let accessToken = req.cookies.token;

      accessToken = accessToken.substring(1, accessToken.length - 1);

      req.headers.authorization = `Bearer ${accessToken}`;
    }
  };
}

/**
 * Returns a jwt token signed by the app secret
 *
 * @param {ObjectId} id the user id to keep in the jwt
 * @returns {String} signed jwt token
 */
export function signToken (id) {
  return jwt.sign({_id: id}, process.env.SESSION_SECRET, {expiresIn: '7d'});
}

/**
 * Set token cookie directly for oAuth strategies
 *
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 */
export function setTokenCookie (req, res) {
  if (!req.user) {
    res.status(404).json({message: 'something went wrong, try again'});
    return;
  }

  const token = signToken(req.user._id.toString());

  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}