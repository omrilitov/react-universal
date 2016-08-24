import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import User from '../../api/user/user.model';
import logger from '../../components/logger';

export default () => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    profileFields: [
      'id',
      'link',
      'picture.type(large)',
      'email',
      'first_name',
      'last_name',
      'gender'
    ],
    scope: [
      'user_friends'
    ]
  },
    (accessToken, refreshToken, profile, done) => {
      const info = profile._json;

      User.findOne({'providers.facebook.id': profile.id})
        .then(user => {
          if (user) {
            return done(null, user);
          }

          return User.findOne({email: info.email})
            .then(user => {
              if (user) {
                // TODO: maybe ask to connect to user
                return done(null, false, {message: 'email already in use'});
              }

              const newUser = new User({
                name: {
                  first: info.first_name,
                  last: info.last_name
                },
                email: info.email,
                gender: info.gender,
                providers: {
                  facebook: {
                    id: profile.id
                  }
                }
              });

              return newUser.save()
                .then(user => {
                  done(null, user);
                })
                .catch(err => {
                  done(err);
                });
            });
        })
        .catch(err => {
          logger.error({err});
          done(err);
        });
    }
  ));
};