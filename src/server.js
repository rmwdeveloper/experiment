import 'babel-polyfill';
import path from 'path';
import express from 'express';
import http from 'http';

import React from 'react';
import routes from './routes';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

const app = express();



app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'pug');

app.get('*', (req, res) => {
  match({routes, location: req.url}, (err, redirectLocation, props) => {
    if (err) {
      res.status.send(err.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      const markup = renderToSTring(<RoutingContext {...props} />);
      res.render('index', { markup })
    } else {
      res.sendStatus(404);
    }
  });
});

const server = http.createServer(app);

server.listen(3003);
server.on('listening', () => {
    console.log('Listening on 3003');
});