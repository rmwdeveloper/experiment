import 'babel-polyfill';
import path from 'path';
import express from 'express';
import expressGraphQL from 'express-graphql';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import ReactDOM from 'react-dom/server';
import routes from './routes';
import { resolve } from 'universal-router';
import { port, analytics } from './config';
import assets from './assets';
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// Allow Cross Domain Requests
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};


//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);


// app.set('views', path.join(__dirname, 'views') );
// app.set('view engine', 'jade');

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

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
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});

/* eslint-disable no-console */
// models.sync().catch(err => console.error(err.stack)).then(() => {
//   app.listen(port, () => {
//     console.log(`The server is running at http://localhost:${port}/`);
//   });
// });
/* eslint-enable no-console */
