import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../data/models';




passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (username, password, cb) => {
    User.findOne({ where: { email: username } })
      .then(user => {
        console.log('user?');
        if (user === null) {
          cb(null, false);
          return null;
        }
        bcrypt.compare(password, user.password, (err, res) => {
          console.log('trying to compare .. . ');
          if (res) {
            cb(null, user);
            return null;
          }
          cb(null, false);
          return null;
        });
      }).catch(err => { console.log(err);});
  }));