import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { User, UserLogin, UserClaim, UserProfile } from '../data/models';
import { auth as config } from '../config';

passport.use(new localStrategy(
  (username, password, cb) => {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

export default passport;
