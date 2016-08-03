import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { User, UserLogin, UserClaim, UserProfile } from '../data/models';
import { auth as config } from '../config';
import bcrypt from 'bcrypt';

passport.use(new localStrategy(
  (username, password, cb) => {
    User.findOne({ where: { username } }).then(user => {
      if (user === null) {
        return cb(null, false);
      }
      bcrypt.compare(password, user.password, function (err, res) {
        if (res) {
          return cb(null, user);
        } else if (err) {
          return cb(null, false);
        }
      });
    });
  }));

export default passport;
