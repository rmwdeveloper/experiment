import 'babel-polyfill';
import path from 'path';
import express from 'express';

import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import ReactDOM from 'react-dom/server';
import models from './data/models';

import routes from './routes';
import { resolve } from 'universal-router';
import { port, analytics, auth } from './config';
import assets from './assets';
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';

const app = express();

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
// app.use(allowCrossDomain);

app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  getToken: req => req.cookies.id_token,
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
}));
app.use(passport.initialize());

// app.post('/register', (req, res) => {
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(req.body.password, salt, (err, hash) => {
//       if ( err ) {
//         res.status(400);
//         res.send('Error');
//       }
//       else if ( hash ) {
//         res.status(200);
//         User.create({username: req.body.username, password: hash});
//       }
//     });
//   });
// });
// app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
//   res.status(200);
//   res.send();
// });
// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });
//
// passport.deserializeUser(function(id, cb) {
//   db.users.findById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });
// app.set('views', path.join(__dirname, 'views') );
// app.set('view engine', 'jade');

//
// Register API middleware
// -----------------------------------------------------------------------------
// app.use('/graphql', expressGraphQL(req => ({
//   schema,
//   graphiql: true,
//   rootValue: { request: req },
//   pretty: process.env.NODE_ENV !== 'production',
// })));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
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

app.get('/server_time', (req, res) => {
  res.send('server time!!');
});
app.get('/sign_url', (req, res) => {
  res.send('sign url');
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
