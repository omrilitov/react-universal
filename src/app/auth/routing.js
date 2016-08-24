import {hasToken, loadUser, logout, hasUser, hasRole} from './redux';

const baseRequireLogin = ({getState, dispatch}, role) => {
  return (nextState, replace, cb) => {
    if (!hasToken(getState())) {
      replace('/login');

      return cb();
    }

    const handle = () => {
      if (!role ||
        hasRole(getState().auth.user, role)) {
        return cb();
      }

      replace('/');
      cb();
    };

    if (hasUser(getState())) {
      handle();
    }
    else {
      dispatch(loadUser())
        .then(({response}) => {
          if (response && response.status === 401) {
            dispatch(logout());
            replace('/login');

            return cb();
          }

          handle();
        });
    }
  };
};

export function requireLogin (store) {
  return {
    onEnter: baseRequireLogin(store)
  };
}

export function requireRole (store, role) {
  return {
    onEnter: baseRequireLogin(store, role)
  };
}