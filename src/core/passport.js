import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../data/models';

passport.serializeUser(function(user, done) {
  const { id } = user.get({ plain: true });
  done(null, id);
  return null;
});
//
passport.deserializeUser( (id, done) => {
  User.findById(id)
    .then(user => {
      const {username, email, emailConfirmed, id} = user.get({plain:true});
      done(null, {username, email, emailConfirmed, id});
      return null;
    })
    .catch(err => {
      done(err, null);
      return null;
    });
});


passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (username, password, cb) => {
    User.findOne({ where: { email: username } })
      .then(user => {
        if (user === null) {
          cb(null, false);
          return null;
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            cb(null, user);
            return null;
          }
          cb(null, false);
          return null;
        });
      });
  }));