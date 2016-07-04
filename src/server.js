import 'babel-polyfill';
import path from 'path';
import express from 'express';
import http from 'http';

import ReactDOM from 'react-dom/server';
import routes from './routes';
import { renderToString } from 'react-dom/server';
import { match } from 'universal-router';
import assets from './assets';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // parse cookie header and populate req.cookies with an object keyed by cookie names
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'pug');

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
    const template = require('index'); // eslint-disable-line global-require
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
    await match(routes, {
      path: req.path,
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
  const template = require('error'); // eslint-disable-line global-require
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
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */