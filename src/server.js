import 'babel-polyfill';
import path from 'path';
import express from 'express';
import session from 'express-session';

import multer from 'multer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import PrettyError from 'pretty-error';
import passport from 'passport';

import ReactDOM from 'react-dom/server';
import models, { User } from './data/models';

import routes from './routes';
import { resolve } from 'universal-router';
import { port, analytics, auth, aws_secret_key, session_secret } from './config';
import { Strategy as LocalStrategy } from 'passport-local';


import assets from './assets';
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';

// todo: Make configuration handle both http (local development) and https (production)
const app = express();
const upload = multer();
app.use(compression());
//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// Allow Cross Domain Requests
// const allowCrossDomain = function(req, res, next) { // eslint-disable-line
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };


//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'windows')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ cookie: { secure: false },  secret: 'test secret'})); // todo: figure out how the hell cookies work with SSL
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());

// app.use(allowCrossDomain);

// app.use(expressJwt({
//   secret: auth.jwt.secret,
//   credentialsRequired: false,
//   /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
//   getToken: req => req.cookies.id_token,
//   /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
// }));

passport.serializeUser(function(user, done) {
  done(null, user.dataValues.id);
});
//
passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(user => {
      const {username, email, emailConfirmed} = user.dataValues;
      done(null, {username, email, emailConfirmed});
    })
    .catch(err => {
      done(err, null);
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
        return cb(null, false);
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return cb(null, user);
        }
        return cb(null, false);
      });
    });
}));

app.post('/register', (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if ( err ) {
        res.status(400);
        res.send('Error');
      }
      else if ( hash ) {
        User.create({username: req.body.username, email:req.body.email,  password: hash})
          .then(item => {
            res.status(200);
            res.send('Success');
          })
          .catch(errorObject => {
            res.status(400);
            res.send(errorObject.errors);
          });
      }
    });
  });
});
app.post('/login',
  passport.authenticate('login', { successRedirect: '/success', failureRedirect: '/failure', session: true })
);

//
// Register API middleware
// -----------------------------------------------------------------------------
// app.use('/graphql', expressGraphQL(req => ({
//   schema,
//   graphiql: true,
//   rootValue: { request: req },
//   pretty: process.env.NODE_ENV !== 'production',
// })));

/*
* Return server time, check if user has enough space for upload. If user does have enough space,
* create an Upload model instance for this particular upload.
* */
app.get('/upload_start', (req, res) => {
  const now = new Date(Date.now());
  const date = {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // getMonth is 0 indexed.
    day: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    milliseconds: now.getMilliseconds()
  };
  res.send(date);
});

app.post('/upload_complete', (req, res) => {
  res.send({});
});

app.get('/sign_aws', (req, res) => {
  res.send(crypto
    .createHmac('sha1', aws_secret_key)
    .update(req.query.to_sign)
    .digest('base64')
  );
});
//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('/success', async(req, res) => {
  res.status(200).send(req.user);
});

app.get('/failure', async(req, res) => {

  res.status(403).send('failure');
});
app.get('*', async(req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
    const template = require('./views/index.jade'); // eslint-disable-line global-require
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }
    const store = configureStore({}, {
      cookie: req.headers.cookie,
    });

    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));

    /*
     *
     */
    await resolve(routes, {
      path: req.url,
      query: req.query,
      context: {
        store,
        insertCss: styles => css.push(styles._getCss()), // eslint-disable-line no-underscore-dangle
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.state = JSON.stringify(store.getState());
        data.state = {};
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        return true;
      },
    });
    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});

// Upload route
app.post('/upload', (req, res) => {
  res.send('Got an upload request!');
});



//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.jade'); // eslint-disable-line global-require
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});


//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
// app.listen(port, () => {
//   console.log(`The server is running at http://localhost:${port}/`);
// });

/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */
